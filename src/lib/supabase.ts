import { createClient } from '@supabase/supabase-js'
import { env } from './env'

// Cliente Supabase com configurações de produção
export const supabase = createClient(env.supabase.url, env.supabase.anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Mais seguro para produção
  },
  global: {
    headers: {
      'x-application-name': 'zenora',
    },
  },
  db: {
    schema: 'public',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Types para o banco de dados
export type User = {
  id: string
  email: string
  name: string
  created_at: string
  avatar_url?: string
}

export type MoodCheckIn = {
  id: string
  user_id: string
  mood: 'happy' | 'neutral' | 'anxious' | 'tired' | 'sad'
  date: string
  created_at: string
}

export type MeditationSession = {
  id: string
  user_id: string
  title: string
  duration: number // em minutos
  category: 'meditation' | 'sleep' | 'breathe' | 'move'
  completed: boolean
  date: string
  created_at: string
}

export type WorkoutSession = {
  id: string
  user_id: string
  workout_name: string
  duration: number // em minutos
  calories: number
  type: 'calistenia' | 'musculacao'
  completed: boolean
  date: string
  created_at: string
}

export type UserProgress = {
  id: string
  user_id: string
  total_sessions: number
  total_minutes: number
  current_streak: number
  longest_streak: number
  total_workouts: number
  total_calories: number
  updated_at: string
}

export type Achievement = {
  id: string
  user_id: string
  title: string
  description: string
  icon: string
  unlocked_at: string
}

export type Reminder = {
  id: string
  user_id: string
  title: string
  time: string
  days: string[] // ['monday', 'tuesday', etc]
  enabled: boolean
  type: 'meditation' | 'workout' | 'custom'
  created_at: string
}

export type Feedback = {
  id: string
  user_id: string
  category: 'bug' | 'feature' | 'improvement' | 'other'
  message: string
  rating?: number
  created_at: string
  status: 'pending' | 'reviewed' | 'resolved'
}

// Helper para verificar se está autenticado
export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

// Helper para obter usuário atual
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper para logout
export async function signOut() {
  await supabase.auth.signOut()
}
