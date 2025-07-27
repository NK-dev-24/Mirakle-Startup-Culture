import { createClient } from '@supabase/supabase-js'
import { SUPABASE_CONFIG } from '@/config/supabase'

export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      startups: {
        Row: {
          id: string
          name: string
          website: string
          industry: string
          type: string
          city: string
          country: string
          founder: string
          email: string
          employees: string
          funding: string
          customers: string
          revenue: string
          launched: string
          paying_customers: string
          revenue_gen: string
          full_time_team: string
          venture_backed: string
          video: string
          pitch_deck: string
          support: string
          contribute: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          website: string
          industry: string
          type: string
          city: string
          country: string
          founder: string
          email: string
          employees: string
          funding: string
          customers: string
          revenue: string
          launched: string
          paying_customers: string
          revenue_gen: string
          full_time_team: string
          venture_backed: string
          video: string
          pitch_deck: string
          support: string
          contribute: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          website?: string
          industry?: string
          type?: string
          city?: string
          country?: string
          founder?: string
          email?: string
          employees?: string
          funding?: string
          customers?: string
          revenue?: string
          launched?: string
          paying_customers?: string
          revenue_gen?: string
          full_time_team?: string
          venture_backed?: string
          video?: string
          pitch_deck?: string
          support?: string
          contribute?: string
          created_at?: string
          updated_at?: string
        }
      }
      challenges: {
        Row: {
          id: string
          title: string
          organizer: string
          description: string | null
          type: string[]
          deadline: string | null
          status: string | null
          reward: number | null
          contact: string | null
          industry: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          organizer: string
          description?: string | null
          type: string[]
          deadline?: string | null
          status?: string | null
          reward?: number | null
          contact?: string | null
          industry?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          organizer?: string
          description?: string | null
          type?: string[]
          deadline?: string | null
          status?: string | null
          reward?: number | null
          contact?: string | null
          industry?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'user'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role?: 'admin' | 'user'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'user'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 