"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Sparkles, Heart, Moon, Wind, TrendingUp, Award, Lock } from 'lucide-react'

type Practice = {
  id: string
  title: string
  description: string
  duration: number
  category: 'meditation' | 'breathing' | 'movement' | 'sleep'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  premium: boolean
  image_url: string | null
}

type CheckIn = {
  mood: number
  energy: number
  sleep_quality: number
  notes: string
}

export default function ZenoraApp() {
  const [currentView, setCurrentView] = useState<'welcome' | 'checkin' | 'home' | 'library' | 'practice' | 'premium'>('welcome')
  const [practices, setPractices] = useState<Practice[]>([])
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null)
  const [checkInData, setCheckInData] = useState<CheckIn>({
    mood: 3,
    energy: 3,
    sleep_quality: 3,
    notes: ''
  })
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [supabaseConnected, setSupabaseConnected] = useState(false)

  useEffect(() => {
    checkSupabaseConnection()
    loadPractices()
  }, [])

  const checkSupabaseConnection = () => {
    try {
      // Verificar se as variáveis de ambiente estão disponíveis
      const hasUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      setSupabaseConnected(hasUrl)
    } catch (error) {
      console.error('Erro ao verificar conexão Supabase:', error)
      setSupabaseConnected(false)
    }
  }

  const loadPractices = async () => {
    // Práticas de exemplo (fallback)
    const examplePractices: Practice[] = [
      {
        id: '1',
        title: 'Respiração Consciente',
        description: 'Uma prática simples de respiração para acalmar a mente',
        duration: 5,
        category: 'breathing',
        difficulty: 'beginner',
        premium: false,
        image_url: null
      },
      {
        id: '2',
        title: 'Meditação Guiada',
        description: 'Meditação para iniciantes com foco na atenção plena',
        duration: 10,
        category: 'meditation',
        difficulty: 'beginner',
        premium: false,
        image_url: null
      },
      {
        id: '3',
        title: 'Yoga Matinal',
        description: 'Sequência de yoga para começar o dia com energia',
        duration: 15,
        category: 'movement',
        difficulty: 'intermediate',
        premium: true,
        image_url: null
      }
    ]

    if (!supabaseConnected) {
      setPractices(examplePractices)
      return
    }

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('practices')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setPractices(data && data.length > 0 ? data : examplePractices)
    } catch (error) {
      console.error('Erro ao carregar práticas:', error)
      setPractices(examplePractices)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWelcomeSubmit = async () => {
    if (!userName || !userEmail) return
    
    if (!supabaseConnected) {
      setCurrentView('checkin')
      return
    }

    try {
      const { error } = await supabase
        .from('users')
        .insert([{ name: userName, email: userEmail }])
      
      if (error) throw error
      setCurrentView('checkin')
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      setCurrentView('checkin')
    }
  }

  const handleCheckInSubmit = async () => {
    if (!supabaseConnected) {
      setCurrentView('home')
      return
    }

    try {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single()

      if (userData) {
        await supabase
          .from('check_ins')
          .insert([{
            user_id: userData.id,
            ...checkInData
          }])
      }
      
      setCurrentView('home')
    } catch (error) {
      console.error('Erro ao salvar check-in:', error)
      setCurrentView('home')
    }
  }

  const handlePracticeComplete = async (practiceId: string, duration: number) => {
    if (!supabaseConnected) {
      setCurrentView('home')
      return
    }

    try {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single()

      if (userData) {
        await supabase
          .from('user_progress')
          .insert([{
            user_id: userData.id,
            practice_id: practiceId,
            duration_completed: duration
          }])
      }
      
      setCurrentView('home')
    } catch (error) {
      console.error('Erro ao salvar progresso:', error)
      setCurrentView('home')
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meditation': return <Sparkles className="w-5 h-5" />
      case 'breathing': return <Wind className="w-5 h-5" />
      case 'movement': return <TrendingUp className="w-5 h-5" />
      case 'sleep': return <Moon className="w-5 h-5" />
      default: return <Heart className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500'
      case 'intermediate': return 'bg-yellow-500'
      case 'advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full mx-auto flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Zenora
            </h1>
            <p className="text-gray-600 text-lg">Luz Interior, Essência Tranquila</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seu Nome</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-400 focus:outline-none transition-all"
                placeholder="Como você gostaria de ser chamado?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seu Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-400 focus:outline-none transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <button
              onClick={handleWelcomeSubmit}
              disabled={!userName || !userEmail}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Começar Jornada
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'checkin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4">
        <div className="max-w-2xl mx-auto pt-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Check-in Diário</h2>
            <p className="text-gray-600">Como você está se sentindo hoje, {userName}?</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Humor (1-5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setCheckInData({ ...checkInData, mood: value })}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                        checkInData.mood === value
                          ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Energia (1-5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setCheckInData({ ...checkInData, energy: value })}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                        checkInData.energy === value
                          ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Qualidade do Sono (1-5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setCheckInData({ ...checkInData, sleep_quality: value })}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                        checkInData.sleep_quality === value
                          ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas (opcional)</label>
                <textarea
                  value={checkInData.notes}
                  onChange={(e) => setCheckInData({ ...checkInData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-400 focus:outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Como você está se sentindo? O que está em sua mente?"
                />
              </div>
            </div>

            <button
              onClick={handleCheckInSubmit}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Salvar Check-in
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'practice' && selectedPractice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4">
        <div className="max-w-2xl mx-auto pt-8 space-y-6">
          <button
            onClick={() => setCurrentView('library')}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            ← Voltar
          </button>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {selectedPractice.image_url && (
              <img
                src={selectedPractice.image_url}
                alt={selectedPractice.title}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl text-white">
                    {getCategoryIcon(selectedPractice.category)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">{selectedPractice.title}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getDifficultyColor(selectedPractice.difficulty)}`}>
                        {selectedPractice.difficulty}
                      </span>
                      <span className="text-gray-600">{selectedPractice.duration} min</span>
                      {selectedPractice.premium && (
                        <span className="flex items-center gap-1 text-yellow-600">
                          <Lock className="w-3 h-3" />
                          <span className="text-xs font-semibold">Premium</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">{selectedPractice.description}</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handlePracticeComplete(selectedPractice.id, selectedPractice.duration)}
                  disabled={selectedPractice.premium}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedPractice.premium ? 'Upgrade para Premium' : 'Iniciar Prática'}
                </button>

                {selectedPractice.premium && (
                  <button
                    onClick={() => setCurrentView('premium')}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Ver Planos Premium
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'library') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4">
        <div className="max-w-6xl mx-auto pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Biblioteca de Práticas</h2>
            <button
              onClick={() => setCurrentView('home')}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Voltar
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-600 mt-4">Carregando práticas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practices.map((practice) => (
                <div
                  key={practice.id}
                  onClick={() => {
                    setSelectedPractice(practice)
                    setCurrentView('practice')
                  }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all hover:scale-105"
                >
                  {practice.image_url && (
                    <img
                      src={practice.image_url}
                      alt={practice.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg text-white">
                          {getCategoryIcon(practice.category)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{practice.title}</h3>
                          <p className="text-sm text-gray-600">{practice.duration} min</p>
                        </div>
                      </div>
                      {practice.premium && (
                        <Lock className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2">{practice.description}</p>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getDifficultyColor(practice.difficulty)}`}>
                        {practice.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {practice.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (currentView === 'premium') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-4">
        <div className="max-w-4xl mx-auto pt-8 space-y-8">
          <button
            onClick={() => setCurrentView('home')}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            ← Voltar
          </button>

          <div className="text-center space-y-3">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Zenora Premium
            </h2>
            <p className="text-gray-600 text-lg">Desbloqueie todo o potencial da sua jornada</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">Plano Gratuito</h3>
                <p className="text-4xl font-bold text-gray-800">R$ 0<span className="text-lg text-gray-600">/mês</span></p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 text-xs">✓</span>
                  </div>
                  Check-in diário ilimitado
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 text-xs">✓</span>
                  </div>
                  Práticas básicas de meditação
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 text-xs">✓</span>
                  </div>
                  Exercícios de respiração
                </li>
              </ul>

              <button className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold">
                Plano Atual
              </button>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl p-8 space-y-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

              <div className="space-y-2 relative z-10">
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
                <h3 className="text-2xl font-bold">Plano Premium</h3>
                <p className="text-4xl font-bold">R$ 29,90<span className="text-lg opacity-90">/mês</span></p>
              </div>

              <ul className="space-y-3 relative z-10">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-orange-500 text-xs">✓</span>
                  </div>
                  Tudo do plano gratuito
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-orange-500 text-xs">✓</span>
                  </div>
                  Meditações guiadas avançadas
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-orange-500 text-xs">✓</span>
                  </div>
                  Sons para sono profundo
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-orange-500 text-xs">✓</span>
                  </div>
                  Práticas exclusivas de yoga
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-orange-500 text-xs">✓</span>
                  </div>
                  Relatórios de progresso detalhados
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-orange-500 text-xs">✓</span>
                  </div>
                  Suporte prioritário
                </li>
              </ul>

              <button className="w-full bg-white text-orange-600 py-4 rounded-xl font-semibold hover:shadow-lg transition-all relative z-10">
                Começar Teste Grátis de 7 Dias
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto p-4 pt-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Olá, {userName}!
          </h1>
          <p className="text-gray-600">Bem-vindo de volta à sua jornada de bem-estar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-bold text-gray-800">{checkInData.mood}/5</span>
            </div>
            <p className="text-gray-600 font-medium">Humor Atual</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-800">{checkInData.energy}/5</span>
            </div>
            <p className="text-gray-600 font-medium">Nível de Energia</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Moon className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-800">{checkInData.sleep_quality}/5</span>
            </div>
            <p className="text-gray-600 font-medium">Qualidade do Sono</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 space-y-3 text-white cursor-pointer hover:shadow-xl transition-all" onClick={() => setCurrentView('premium')}>
            <div className="flex items-center justify-between">
              <Award className="w-8 h-8" />
              <Lock className="w-6 h-6" />
            </div>
            <p className="font-bold">Upgrade Premium</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setCurrentView('checkin')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all group"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-800">Check-in Diário</h3>
                <p className="text-gray-600 mt-2">Registre como você está se sentindo hoje</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('library')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all group"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-800">Biblioteca</h3>
                <p className="text-gray-600 mt-2">Explore práticas de meditação e bem-estar</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('premium')}
            className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all group text-white"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold">Premium</h3>
                <p className="opacity-90 mt-2">Desbloqueie conteúdo exclusivo</p>
              </div>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Práticas Recomendadas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practices.slice(0, 3).map((practice) => (
              <div
                key={practice.id}
                onClick={() => {
                  setSelectedPractice(practice)
                  setCurrentView('practice')
                }}
                className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl text-white">
                    {getCategoryIcon(practice.category)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{practice.title}</h3>
                    <p className="text-sm text-gray-600">{practice.duration} min</p>
                  </div>
                  {practice.premium && <Lock className="w-5 h-5 text-yellow-600" />}
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
