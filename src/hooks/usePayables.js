import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function usePayables(userId) {
  const [payables, setPayables] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    fetchPayables()
  }, [userId])

  async function fetchPayables() {
    const { data } = await supabase
      .from('payables')
      .select('*')
      .eq('user_id', userId)
      .order('due_date')
    if (data) setPayables(data)
    setLoading(false)
  }

  async function addPayable(item) {
    const { data, error } = await supabase
      .from('payables')
      .insert({ ...item, user_id: userId })
      .select().single()
    if (data) setPayables(prev => [...prev, data])
    return { data, error }
  }

  async function togglePayable(id, status) {
    const newStatus = status === 'paid' ? 'pending' : 'paid'
    await supabase.from('payables').update({ status: newStatus }).eq('id', id)
    setPayables(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
  }

  async function deletePayable(id) {
    await supabase.from('payables').delete().eq('id', id)
    setPayables(prev => prev.filter(p => p.id !== id))
  }

  return { payables, loading, fetchPayables, addPayable, togglePayable, deletePayable }
}
