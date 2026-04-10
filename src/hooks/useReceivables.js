import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useReceivables(userId) {
  const [receivables, setReceivables] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    fetchReceivables()
  }, [userId])

  async function fetchReceivables() {
    const { data } = await supabase
      .from('receivables')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setReceivables(data)
    setLoading(false)
  }

  async function addReceivable(item) {
    const { data, error } = await supabase
      .from('receivables')
      .insert({ ...item, user_id: userId })
      .select().single()
    if (data) setReceivables(prev => [data, ...prev])
    return { data, error }
  }

  async function toggleReceivable(id, status) {
    const newStatus = status === 'collected' ? 'pending' : 'collected'
    await supabase.from('receivables').update({ status: newStatus }).eq('id', id)
    setReceivables(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r))
  }

  async function deleteReceivable(id) {
    await supabase.from('receivables').delete().eq('id', id)
    setReceivables(prev => prev.filter(r => r.id !== id))
  }

  return { receivables, loading, fetchReceivables, addReceivable, toggleReceivable, deleteReceivable }
}
