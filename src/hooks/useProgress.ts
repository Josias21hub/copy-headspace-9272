'use client'

import { useState, useEffect } from 'react'
import { 
  getUserProgress, 
  getWeeklyStats, 
  getMoodCheckIns,
  type UserProgress 
} from '@/lib/supabase-hooks'

export function useProgress(userId: string | null) {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [weeklyStats, setWeeklyStats] = useState<any>(null)
  const [recentMoods, setRecentMoods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    async function fetchData() {
      try {
        const [progressData, statsData, moodsData] = await Promise.all([
          getUserProgress(userId),
          getWeeklyStats(userId),
          getMoodCheckIns(userId, 7)
        ])

        setProgress(progressData)
        setWeeklyStats(statsData)
        setRecentMoods(moodsData)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return { progress, weeklyStats, recentMoods, loading }
}
