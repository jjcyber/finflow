import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useVESRate(userId) {
  const [rate, setRate] = useState(650)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    fetchRate()
  }, [userId])

  async function fetchRate() {
    const { data } = await supabase
      .from('ves_rate')
      .select('rate_bs')
      .eq('user_id', userId)
      .single()
    if (data) setRate(data.rate_bs)
    setLoading(false)
  }

  async function updateRate(newRate) {
    setRate(newRate)
    const { data: existing } = await supabase
      .from('ves_rate')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (existing) {
      await supabase
        .from('ves_rate')
        .update({ rate_bs: newRate, updated_at: new Date().toISOString() })
        .eq('user_id', userId)
    } else {
      await supabase
        .from('ves_rate')
        .insert({ user_id: userId, rate_bs: newRate })
    }
  }

  return { rate, loading, updateRate }
}
