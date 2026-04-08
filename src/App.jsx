import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { useVESRate } from './hooks/useVESRate'
import { useAccounts } from './hooks/useAccounts'
import Cuentas from './pages/Cuentas'

const styles = {
  wrapper: { display: 'flex', minHeight: '100vh', background: '#0d0f14', color: '#eef0f5', fontFamily: 'DM Sans, sans-serif' },
  sidebar: { width: 220, background: '#13161e', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '28px 0', position: 'fixed', left: 0, top: 0, bottom: 0 },
  logoMark: { fontWeight: 800, fontSize: 22, color: '#4dffc3', letterSpacing: '-0.5px', padding: '0 24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logoSub: { fontSize: 11, color: '#5a5f74', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  nav: { padding: '20px 12px 0', flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer', color: '#8a90a8', fontSize: 14, fontWeight: 500, marginBottom: 2, transition: 'all 0.15s' },
  navItemActive: { background: 'rgba(77,255,195,0.1)', color: '#4dffc3' },
  main: { marginLeft: 220, flex: 1 },
  topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: 'rgba(13,15,20,0.92)', backdropFilter: 'blur(12px)', zIndex: 50 },
  topbarTitle: { fontWeight: 700, fontSize: 20 },
  topbarDate: { fontSize: 12, color: '#8a90a8', marginTop: 1 },
  tasaWidget: { display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 10, padding: '6px 12px', cursor: 'pointer' },
  tasaLabel: { fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#f97316', opacity: 0.7 },
  tasaValue: { fontWeight: 700, fontSize: 14, color: '#f97316' },
  monthChip: { fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: '#1a1e29', border: '1px solid rgba(255,255,255,0.06)', color: '#8a90a8' },
  modal: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  modalBox: { background: '#13161e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 360 },
  modalTitle: { fontWeight: 700, fontSize: 18, marginBottom: 6, color: '#eef0f5' },
  modalSub: { fontSize: 13, color: '#8a90a8', marginBottom: 24 },
  label: { display: 'block', fontSize: 12, color: '#8a90a8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.6px' },
  input: { width: '100%', background: '#1a1e29', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', color: '#eef0f5', fontSize: 16, fontWeight: 600, outline: 'none', boxSizing: 'border-box' },
  preview: { background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#8a90a8', marginBottom: 20 },
  btnPrimary: { width: '100%', padding: 12, background: '#4dffc3', border: 'none', borderRadius: 10, color: '#0d0f14', fontWeight: 700, fontSize: 14, cursor: 'pointer' },
  btnSecondary: { width: '100%', padding: 11, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#8a90a8', fontSize: 14, cursor: 'pointer', marginTop: 8 },
  placeholder: { padding: 40, textAlign: 'center', color: '#5a5f74', fontSize: 14 },
}

const navItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'cuentas', icon: '🏦', label: 'Mis Cuentas' },
  { id: 'gastos', icon: '📋', label: 'Gastos Fijos' },
  { id: 'pagar', icon: '💳', label: 'Por Pagar' },
  { id: 'cobrar', icon: '💰', label: 'Por Cobrar' },
  { id: 'oportunidades', icon: '🎯', label: 'Oportunidades' },
  { id: 'proyeccion', icon: '📈', label: 'Proyección' },
  { id: 'historial', icon: '🕐', label: 'Historial' },
]

export default function App() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('cuentas')
  const [tasaModal, setTasaModal] = useState(false)
  const [tasaInput, setTasaInput] = useState('')

  const userId = session?.user?.id
  const { rate, updateRate } = useVESRate(userId)
  const { accounts, addAccount, updateAccount, deleteAccount } = useAccounts(userId)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    await supabase.auth.signInWithOtp({ email })
    setSent(true)
  }

  const handleApplyTasa = async () => {
    const t = parseFloat(tasaInput)
    if (!t || t < 1) return
    await updateRate(t)
    setTasaModal(false)
  }

  const today = new Date().toLocaleDateString('es-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  if (loading) return (
    <div style={{ background: '#0d0f14', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4dffc3', fontFamily: 'sans-serif' }}>
      Cargando...
    </div>
  )

  if (!session) return (
    <div style={{ background: '#0d0f14', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#13161e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 32, width: 320, fontFamily: 'sans-serif', color: '#eef0f5' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#4dffc3', marginBottom: 4 }}>FinFlow</div>
        <div style={{ fontSize: 12, color: '#5a5f74', marginBottom: 24 }}>Control Financiero Personal</div>
        {!sent ? (
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: '100%', background: '#1a1e29', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', color: '#eef0f5', fontSize: 14, marginBottom: 12, boxSizing: 'border-box', outline: 'none' }} />
            <button type="submit" style={{ width: '100%', background: '#4dffc3', border: 'none', borderRadius: 10, padding: 12, color: '#0d0f14', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Entrar con Magic Link
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', color: '#8a90a8', fontSize: 14 }}>✉️ Revisa tu correo — te enviamos el link de acceso</div>
        )}
      </div>
    </div>
  )

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoMark}>
          FinFlow
          <div style={styles.logoSub}>Control Financiero</div>
        </div>
        <nav style={styles.nav}>
          {navItems.map(item => (
            <div key={item.id} style={{ ...styles.navItem, ...(page === item.id ? styles.navItemActive : {}) }} onClick={() => setPage(item.id)}>
              <span>{item.icon}</span> {item.label}
            </div>
          ))}
        </nav>
        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#7b8eff,#4dffc3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#0d0f14' }}>JF</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Jaime F.</div>
              <div style={{ fontSize: 11, color: '#5a5f74', cursor: 'pointer' }} onClick={() => supabase.auth.signOut()}>Cerrar sesión</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>

        {/* TOPBAR */}
        <div style={styles.topbar}>
          <div>
            <div style={styles.topbarTitle}>{navItems.find(n => n.id === page)?.label}</div>
            <div style={styles.topbarDate}>{today.charAt(0).toUpperCase() + today.slice(1)}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={styles.tasaWidget} onClick={() => { setTasaInput(rate); setTasaModal(true) }}>
              <span>🇻🇪</span>
              <div>
                <div style={styles.tasaLabel}>Tasa hoy</div>
                <div style={styles.tasaValue}>Bs. {rate}</div>
              </div>
              <span style={{ fontSize: 12, color: '#f97316', opacity: 0.6 }}>✏️</span>
            </div>
            <div style={styles.monthChip}>Abril 2026</div>
          </div>
        </div>

        {/* PAGES */}
        {page === 'cuentas' && (
          <Cuentas accounts={accounts} addAccount={addAccount} updateAccount={updateAccount} deleteAccount={deleteAccount} rate={rate} />
        )}
        {page !== 'cuentas' && (
          <div style={styles.placeholder}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{navItems.find(n => n.id === page)?.icon}</div>
            <div>Sección <strong style={{ color: '#eef0f5' }}>{navItems.find(n => n.id === page)?.label}</strong> — próximamente</div>
          </div>
        )}

      </main>

      {/* TASA MODAL */}
      {tasaModal && (
        <div style={styles.modal} onClick={e => e.target === e.currentTarget && setTasaModal(false)}>
          <div style={styles.modalBox}>
            <div style={styles.modalTitle}>🇻🇪 Tasa del Día</div>
            <div style={styles.modalSub}>Bs. por cada $1 USD</div>
            <div style={{ marginBottom: 14 }}>
              <label style={styles.label}>Tasa</label>
              <input style={styles.input} type="number" value={tasaInput} onChange={e => setTasaInput(e.target.value)} />
            </div>
            {tasaInput && (
              <div style={styles.preview}>
                $100 USD = <strong style={{ color: '#f97316' }}>Bs. {Math.round(100 * tasaInput).toLocaleString('es-VE')}</strong> · $90 = <strong style={{ color: '#f97316' }}>Bs. {Math.round(90 * tasaInput).toLocaleString('es-VE')}</strong>
              </div>
            )}
            <button style={styles.btnPrimary} onClick={handleApplyTasa}>✓ Aplicar tasa</button>
            <button style={styles.btnSecondary} onClick={() => setTasaModal(false)}>Cancelar</button>
          </div>
        </div>
      )}

    </div>
  )
}
