import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAccounts(userId) {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    fetchAccounts()
  }, [userId])

  async function fetchAccounts() {
    const { data } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('active', true)
      .order('sort_order')
    if (data) setAccounts(data)
    setLoading(false)
  }

  async function addAccount(account) {
    const { data, error } = await supabase
      .from('accounts')
      .insert({ ...account, user_id: userId })
      .select()
      .single()
    if (data) setAccounts(prev => [...prev, data])
    return { data, error }
  }

  async function updateAccount(id, updates) {
    const { data } = await supabase
      .from('accounts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (data) setAccounts(prev => prev.map(a => a.id === id ? data : a))
  }

  async function deleteAccount(id) {
    await supabase
      .from('accounts')
      .update({ active: false })
      .eq('id', id)
    setAccounts(prev => prev.filter(a => a.id !== id))
  }

  return { accounts, loading, fetchAccounts, addAccount, updateAccount, deleteAccount }
}
