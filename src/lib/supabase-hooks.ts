import { supabase } from './supabase'

// Definir tipos localmente
export type MoodCheckIn = {
  id: string
  user_id: string
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible'
  date: string
  created_at?: string
}

export type MeditationSession = {
  id: string
  user_id: string
  duration: number
  type: string
  completed: boolean
  date: string
  created_at?: string
}

export type WorkoutSession = {
  id: string
  user_id: string
  type: string
  duration: number
  calories: number
  completed: boolean
  date: string
  created_at?: string
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
  updated_at?: string
  created_at?: string
}

export type Achievement = {
  id: string
  user_id: string
  title: string
  description: string
  icon: string
  unlocked_at?: string
}

export type Reminder = {
  id: string
  user_id: string
  title: string
  time: string
  enabled: boolean
  days: string[]
  created_at?: string
}

export type Feedback = {
  id: string
  user_id: string
  type: 'bug' | 'feature' | 'improvement' | 'other'
  message: string
  status: 'pending' | 'reviewed' | 'resolved'
  created_at?: string
}

// ==================== MOOD CHECK-INS ====================

export async function createMoodCheckIn(userId: string, mood: MoodCheckIn['mood']) {
  const { data, error } = await supabase
    .from('mood_checkins')
    .insert({
      user_id: userId,
      mood,
      date: new Date().toISOString().split('T')[0]
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getMoodCheckIns(userId: string, limit = 30) {
  const { data, error } = await supabase
    .from('mood_checkins')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function getTodayMoodCheckIn(userId: string) {
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('mood_checkins')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

// ==================== MEDITATION SESSIONS ====================

export async function createMeditationSession(
  userId: string,
  session: Omit<MeditationSession, 'id' | 'user_id' | 'created_at'>
) {
  const { data, error } = await supabase
    .from('meditation_sessions')
    .insert({
      user_id: userId,
      ...session,
      date: new Date().toISOString().split('T')[0]
    })
    .select()
    .single()

  if (error) throw error
  
  // Atualizar progresso do usuário
  await updateUserProgress(userId, session.duration, 0)
  
  return data
}

export async function getMeditationSessions(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('meditation_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function completeMeditationSession(sessionId: string) {
  const { data, error } = await supabase
    .from('meditation_sessions')
    .update({ completed: true })
    .eq('id', sessionId)
    .select()
    .single()

  if (error) throw error
  return data
}

// ==================== WORKOUT SESSIONS ====================

export async function createWorkoutSession(
  userId: string,
  workout: Omit<WorkoutSession, 'id' | 'user_id' | 'created_at'>
) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .insert({
      user_id: userId,
      ...workout,
      date: new Date().toISOString().split('T')[0]
    })
    .select()
    .single()

  if (error) throw error
  
  // Atualizar progresso do usuário
  await updateUserProgress(userId, 0, workout.calories)
  
  return data
}

export async function getWorkoutSessions(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function completeWorkoutSession(sessionId: string) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .update({ completed: true })
    .eq('id', sessionId)
    .select()
    .single()

  if (error) throw error
  return data
}

// ==================== USER PROGRESS ====================

export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code === 'PGRST116') {
    // Se não existe, criar um novo registro
    return await createUserProgress(userId)
  }
  
  if (error) throw error
  return data
}

async function createUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .insert({
      user_id: userId,
      total_sessions: 0,
      total_minutes: 0,
      current_streak: 0,
      longest_streak: 0,
      total_workouts: 0,
      total_calories: 0
    })
    .select()
    .single()

  if (error) throw error
  return data
}

async function updateUserProgress(userId: string, minutes: number, calories: number) {
  const progress = await getUserProgress(userId)
  
  const { data, error } = await supabase
    .from('user_progress')
    .update({
      total_sessions: progress.total_sessions + (minutes > 0 ? 1 : 0),
      total_minutes: progress.total_minutes + minutes,
      total_workouts: progress.total_workouts + (calories > 0 ? 1 : 0),
      total_calories: progress.total_calories + calories,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateStreak(userId: string, currentStreak: number) {
  const progress = await getUserProgress(userId)
  const longestStreak = Math.max(progress.longest_streak, currentStreak)
  
  const { data, error } = await supabase
    .from('user_progress')
    .update({
      current_streak: currentStreak,
      longest_streak: longestStreak,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

// ==================== ACHIEVEMENTS ====================

export async function getAchievements(userId: string) {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId)
    .order('unlocked_at', { ascending: false })

  if (error) throw error
  return data
}

export async function unlockAchievement(
  userId: string,
  achievement: Omit<Achievement, 'id' | 'user_id' | 'unlocked_at'>
) {
  const { data, error } = await supabase
    .from('achievements')
    .insert({
      user_id: userId,
      ...achievement
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// ==================== REMINDERS ====================

export async function getReminders(userId: string) {
  const { data, error } = await supabase
    .from('reminders')
    .select('*')
    .eq('user_id', userId)
    .order('time', { ascending: true })

  if (error) throw error
  return data
}

export async function createReminder(
  userId: string,
  reminder: Omit<Reminder, 'id' | 'user_id' | 'created_at'>
) {
  const { data, error } = await supabase
    .from('reminders')
    .insert({
      user_id: userId,
      ...reminder
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateReminder(
  reminderId: string,
  updates: Partial<Omit<Reminder, 'id' | 'user_id' | 'created_at'>>
) {
  const { data, error } = await supabase
    .from('reminders')
    .update(updates)
    .eq('id', reminderId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteReminder(reminderId: string) {
  const { error } = await supabase
    .from('reminders')
    .delete()
    .eq('id', reminderId)

  if (error) throw error
}

// ==================== FEEDBACK ====================

export async function createFeedback(
  userId: string,
  feedback: Omit<Feedback, 'id' | 'user_id' | 'created_at' | 'status'>
) {
  const { data, error } = await supabase
    .from('feedback')
    .insert({
      user_id: userId,
      ...feedback,
      status: 'pending'
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserFeedback(userId: string) {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// ==================== STATISTICS ====================

export async function getWeeklyStats(userId: string) {
  const today = new Date()
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const weekAgoStr = weekAgo.toISOString().split('T')[0]

  // Meditações da semana
  const { data: meditations, error: medError } = await supabase
    .from('meditation_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('date', weekAgoStr)

  if (medError) throw medError

  // Treinos da semana
  const { data: workouts, error: workError } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('date', weekAgoStr)

  if (workError) throw workError

  // Check-ins da semana
  const { data: moods, error: moodError } = await supabase
    .from('mood_checkins')
    .select('*')
    .eq('user_id', userId)
    .gte('date', weekAgoStr)

  if (moodError) throw moodError

  return {
    meditations: meditations || [],
    workouts: workouts || [],
    moods: moods || [],
    totalMinutes: (meditations || []).reduce((sum, m) => sum + m.duration, 0),
    totalCalories: (workouts || []).reduce((sum, w) => sum + w.calories, 0),
    totalSessions: (meditations || []).length + (workouts || []).length
  }
}

export async function getMonthlyStats(userId: string) {
  const today = new Date()
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
  const monthAgoStr = monthAgo.toISOString().split('T')[0]

  // Meditações do mês
  const { data: meditations, error: medError } = await supabase
    .from('meditation_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('date', monthAgoStr)

  if (medError) throw medError

  // Treinos do mês
  const { data: workouts, error: workError } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('date', monthAgoStr)

  if (workError) throw workError

  return {
    meditations: meditations || [],
    workouts: workouts || [],
    totalMinutes: (meditations || []).reduce((sum, m) => sum + m.duration, 0),
    totalCalories: (workouts || []).reduce((sum, w) => sum + w.calories, 0),
    totalSessions: (meditations || []).length + (workouts || []).length
  }
}
