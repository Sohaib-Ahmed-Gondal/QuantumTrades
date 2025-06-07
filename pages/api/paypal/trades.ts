// pages/api/trades.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { symbol, entry, exit, result } = req.body

    const { data, error } = await supabase
      .from('trades')
      .insert([{ symbol, entry, exit, result }])

    if (error) return res.status(500).json({ error: error.message })

    return res.status(200).json({ message: 'Trade logged', data })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
