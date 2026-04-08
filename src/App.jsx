import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    await supabase.auth.signInWithOtp({ email })
    setSent(true)
  }

  if (loading) return (
    <div style={{background:'#0d0f14',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#4dffc3',fontFamily:'sans-serif'}}>
      Cargando...
    </div>
  )

  if (!session) return (
    <div style={{background:'#0d0f14',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#13161e',border:'1px solid rgba(255,255,255,0.06)',borderRadius:20,padding:32,width:320,fontFamily:'sans-serif',color:'#eef0f5'}}>
        <div style={{fontSize:22,fontWeight:800,color:'#4dffc3',marginBottom:4}}>FinFlow</div>
        <div style={{fontSize:12,color:'#5a5f74',marginBottom:24}}>Control Financiero Personal</div>
        {!sent ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{width:'100%',background:'#1a1e29',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'10px 14px',color:'#eef0f5',fontSize:14,marginBottom:12,boxSizing:'border-box',outline:'none'}}
            />
            <button type="submit"
              style={{width:'100%',background:'#4dffc3',border:'none',borderRadius:10,padding:12,color:'#0d0f14',fontWeight:700,fontSize:14,cursor:'pointer'}}>
              Entrar con Magic Link
            </button>
          </form>
        ) : (
          <div style={{textAlign:'center',color:'#8a90a8',fontSize:14}}>
            ✉️ Revisa tu correo — te enviamos el link de acceso
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div style={{background:'#0d0f14',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#eef0f5',fontFamily:'sans-serif',flexDirection:'column',gap:12}}>
      <div style={{fontSize:22,fontWeight:800,color:'#4dffc3'}}>FinFlow ✓</div>
      <div style={{fontSize:14,color:'#8a90a8'}}>Sesión activa: {session.user.email}</div>
      <button onClick={() => supabase.auth.signOut()}
        style={{marginTop:8,background:'transparent',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'8px 16px',color:'#8a90a8',cursor:'pointer',fontSize:13}}>
        Cerrar sesión
      </button>
    </div>
  )
}
