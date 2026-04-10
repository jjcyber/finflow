import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useOpportunities(userId) {
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    fetchOpportunities()
  }, [userId])

  async function fetchOpportunities() {
    const { data } = await supabase
      .from('opportunities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setOpportunities(data)
    setLoading(false)
  }

  async function addOpportunity(item) {
    const { data, error } = await supabase
      .from('opportunities')
      .insert({ ...item, user_id: userId })
      .select().single()
    if (data) setOpportunities(prev => [data, ...prev])
    return { data, error }
  }

  async function deleteOpportunity(id) {
    await supabase.from('opportunities').delete().eq('id', id)
    setOpportunities(prev => prev.filter(o => o.id !== id))
  }

  return { opportunities, loading, fetchOpportunities, addOpportunity, deleteOpportunity }
}
