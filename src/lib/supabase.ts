import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validação para evitar erros em build
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          subscription_tier: 'free' | 'premium'
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
          subscription_tier?: 'free' | 'premium'
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          subscription_tier?: 'free' | 'premium'
        }
      }
      check_ins: {
        Row: {
          id: string
          user_id: string
          mood: number
          energy: number
          sleep_quality: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mood: number
          energy: number
          sleep_quality: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mood?: number
          energy?: number
          sleep_quality?: number
          notes?: string | null
          created_at?: string
        }
      }
      practices: {
        Row: {
          id: string
          title: string
          description: string
          duration: number
          category: 'meditation' | 'breathing' | 'movement' | 'sleep'
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          premium: boolean
          audio_url: string | null
          image_url: string | null
          created_at: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          practice_id: string
          completed_at: string
          duration_completed: number
        }
        Insert: {
          id?: string
          user_id: string
          practice_id: string
          completed_at?: string
          duration_completed: number
        }
      }
    }
  }
}
