import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useExpenses(userId) {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    fetchExpenses()
  }, [userId])

  async function fetchExpenses() {
    const { data } = await supabase
      .from('fixed_expenses')
      .select('*')
      .eq('user_id', userId)
      .order('due_day')
    if (data) setExpenses(data)
    setLoading(false)
  }

  async function addExpense(expense) {
    const { data, error } = await supabase
      .from('fixed_expenses')
      .insert({ ...expense, user_id: userId })
      .select().single()
    if (data) setExpenses(prev => [...prev, data])
    return { data, error }
  }

  async function toggleExpense(id, status) {
    const newStatus = status === 'paid' ? 'pending' : 'paid'
    await supabase.from('fixed_expenses').update({ status: newStatus }).eq('id', id)
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e))
  }

  async function deleteExpense(id) {
    await supabase.from('fixed_expenses').delete().eq('id', id)
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  return { expenses, loading, fetchExpenses, addExpense, toggleExpense, deleteExpense }
}
