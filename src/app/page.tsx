'use client'

import { useState } from 'react'
import { Sparkles, Moon, Wind, Heart, Library, Crown, ChevronRight, Play, Lock, Globe, Dumbbell, Zap, Target, TrendingUp, Award, Calendar, Settings, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function Zenora() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'checkin' | 'home' | 'library' | 'premium' | 'workout'>('welcome')
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  // Tela 1: Bem-vindo (Design Headspace)
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Card Principal */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
            {/* Logo SVG do Zenora */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] flex items-center justify-center shadow-lg">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Flor de Lótus Estilizada */}
                  <path d="M24 8C24 8 20 12 20 16C20 18.2091 21.7909 20 24 20C26.2091 20 28 18.2091 28 16C28 12 24 8 24 8Z" fill="white"/>
                  <path d="M16 16C16 16 12 20 12 24C12 26.2091 13.7909 28 16 28C18.2091 28 20 26.2091 20 24C20 20 16 16 16 16Z" fill="white"/>
                  <path d="M32 16C32 16 36 20 36 24C36 26.2091 34.2091 28 32 28C29.7909 28 28 26.2091 28 24C28 20 32 16 32 16Z" fill="white"/>
                  <path d="M20 24C20 24 16 28 16 32C16 34.2091 17.7909 36 20 36C22.2091 36 24 34.2091 24 32C24 28 20 24 20 24Z" fill="white"/>
                  <path d="M28 24C28 24 32 28 32 32C32 34.2091 30.2091 36 28 36C25.7909 36 24 34.2091 24 32C24 28 28 24 28 24Z" fill="white"/>
                  <circle cx="24" cy="24" r="4" fill="white"/>
                </svg>
              </div>
            </div>

            {/* Título e Descrição */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">ZENORA</h1>
              <p className="text-gray-600 italic text-sm">Respire. Você está em um lugar de calma.</p>
            </div>

            {/* Botões */}
            <div className="space-y-3 pt-4">
              <button 
                onClick={() => setCurrentScreen('checkin')}
                className="w-full bg-[#4CB09A] text-white py-4 rounded-full font-semibold text-base hover:bg-[#3A9B87] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Entrar
              </button>
              <button 
                onClick={() => setCurrentScreen('checkin')}
                className="w-full bg-white text-[#4CB09A] py-4 rounded-full font-semibold text-base border-2 border-[#4CB09A] hover:bg-[#4CB09A]/5 transition-all duration-300"
              >
                Criar Conta
              </button>
            </div>

            {/* Seletor de Idioma */}
            <div className="flex items-center justify-center gap-2 pt-4 text-gray-600">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">🇧🇷 Português</span>
            </div>
          </div>

          {/* Texto inferior */}
          <p className="text-center text-gray-500 text-xs mt-6">
            Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
          </p>
        </div>
      </div>
    )
  }

  // Tela 2: Check-in Diário
  if (currentScreen === 'checkin') {
    const moods = [
      { emoji: '😊', label: 'Feliz', value: 'happy' },
      { emoji: '😐', label: 'Neutro', value: 'neutral' },
      { emoji: '😰', label: 'Ansioso', value: 'anxious' },
      { emoji: '😴', label: 'Cansado', value: 'tired' },
      { emoji: '😢', label: 'Triste', value: 'sad' },
    ]

    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4CB09A] to-[#F7D97E] p-6 pb-12">
          <h2 className="text-2xl font-bold text-white text-center">Como você se sente hoje?</h2>
        </div>

        {/* Mood Selection */}
        <div className="flex-1 p-6 -mt-6">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                    selectedMood === mood.value
                      ? 'bg-[#4CB09A] scale-110 shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  <span className="text-4xl">{mood.emoji}</span>
                  <span className={`text-sm font-medium ${
                    selectedMood === mood.value ? 'text-white' : 'text-gray-700'
                  }`}>
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>

            {selectedMood && (
              <div className="pt-6 space-y-4 animate-fadeIn">
                <div className="bg-[#4CB09A]/10 border border-[#4CB09A]/20 rounded-2xl p-6">
                  <p className="text-[#4CB09A] font-semibold mb-2">✨ Recomendação da IA Zen</p>
                  <p className="text-gray-700">
                    {selectedMood === 'anxious' && 'Pratique a respiração 4-7-8 por 3 minutos para acalmar sua mente.'}
                    {selectedMood === 'tired' && 'Uma meditação de 5 minutos vai renovar sua energia.'}
                    {selectedMood === 'sad' && 'Sons de cura emocional podem te ajudar agora.'}
                    {selectedMood === 'happy' && 'Que tal uma prática de gratidão para amplificar essa energia?'}
                    {selectedMood === 'neutral' && 'Comece com uma meditação guiada de 2 minutos.'}
                  </p>
                </div>

                <button
                  onClick={() => setCurrentScreen('home')}
                  className="w-full bg-gradient-to-r from-[#4CB09A] to-[#F7D97E] text-white py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Continuar para o App
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Tela 3: Home
  if (currentScreen === 'home') {
    const categories = [
      {
        icon: Sparkles,
        title: 'Meditar',
        color: 'from-[#4CB09A] to-[#3A9B87]',
        items: ['Meditações curtas (1–3 min)', 'Séries de 7 dias', 'Sons para foco e paz']
      },
      {
        icon: Moon,
        title: 'Dormir',
        color: 'from-[#7B68EE] to-[#9370DB]',
        items: ['Sons de chuva', 'Histórias calmantes', 'Frequências binaurais']
      },
      {
        icon: Wind,
        title: 'Respirar',
        color: 'from-[#F7D97E] to-[#F4C542]',
        items: ['Respiração 4–7–8', 'Respiração antifragmentação', 'Respiração rápida para foco']
      },
      {
        icon: Heart,
        title: 'Mover',
        color: 'from-[#FF6B9D] to-[#FF8FAB]',
        items: ['Yoga leve', 'Alongamento rápido', 'Treinos de 5 minutos']
      }
    ]

    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4CB09A] to-[#F7D97E] p-6 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Olá, Zenora</h1>
              <p className="text-white/80 mt-1">Sua jornada de paz começa aqui</p>
            </div>
            <div className="flex gap-2">
              <Link href="/progress">
                <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all">
                  <BarChart3 className="w-6 h-6 text-white" />
                </button>
              </Link>
              <Link href="/settings">
                <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all">
                  <Settings className="w-6 h-6 text-white" />
                </button>
              </Link>
              <button 
                onClick={() => setCurrentScreen('premium')}
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
              >
                <Crown className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 -mt-4 space-y-6 pb-24">
          {/* Daily Practice Card */}
          <div className="bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm font-medium">PRÁTICA DO DIA</p>
                <h3 className="text-2xl font-bold mt-1">Meditação de 1 Minuto</h3>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <Play className="w-6 h-6" />
              </div>
            </div>
            <p className="text-white/90 mb-4">
              "Feche os olhos… Respire fundo… Um minuto é o suficiente para recomeçar."
            </p>
            <button className="bg-white text-[#4CB09A] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105">
              Começar Agora
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-[#4CB09A] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-around max-w-md mx-auto">
            <button className="flex flex-col items-center gap-1 text-[#4CB09A]">
              <Sparkles className="w-6 h-6" />
              <span className="text-xs font-medium">Início</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('workout')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Dumbbell className="w-6 h-6" />
              <span className="text-xs font-medium">Treinos</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('library')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Library className="w-6 h-6" />
              <span className="text-xs font-medium">Biblioteca</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('premium')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Crown className="w-6 h-6" />
              <span className="text-xs font-medium">Premium</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Tela 4: Biblioteca
  if (currentScreen === 'library') {
    const libraryCategories = [
      { name: 'Ansiedade', count: 24, color: 'bg-[#4CB09A]' },
      { name: 'Sono', count: 18, color: 'bg-[#7B68EE]' },
      { name: 'Foco', count: 15, color: 'bg-[#F7D97E]' },
      { name: 'Cura emocional', count: 21, color: 'bg-[#FF6B9D]' },
      { name: 'Energia', count: 12, color: 'bg-[#FF9500]' },
      { name: 'Espiritualidade', count: 16, color: 'bg-[#9370DB]' },
      { name: 'Crianças', count: 10, color: 'bg-[#4CB09A]' },
    ]

    return (
      <div className="min-h-screen bg-[#FAFAFA] pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4CB09A] to-[#F7D97E] p-6 pb-8">
          <h1 className="text-3xl font-bold text-white">Biblioteca</h1>
          <p className="text-white/80 mt-1">Explore práticas por categoria</p>
        </div>

        {/* Categories */}
        <div className="p-6 -mt-4 space-y-3">
          {libraryCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} práticas</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-around max-w-md mx-auto">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Sparkles className="w-6 h-6" />
              <span className="text-xs font-medium">Início</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('workout')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Dumbbell className="w-6 h-6" />
              <span className="text-xs font-medium">Treinos</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-[#4CB09A]">
              <Library className="w-6 h-6" />
              <span className="text-xs font-medium">Biblioteca</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('premium')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Crown className="w-6 h-6" />
              <span className="text-xs font-medium">Premium</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Tela 5: Premium
  if (currentScreen === 'premium') {
    const premiumFeatures = [
      'Todas as séries desbloqueadas',
      'Programas de 21 dias',
      'Sons premium exclusivos',
      'IA Zen - rotinas personalizadas',
      'Download offline',
      'Yoga avançado',
      'Sem anúncios',
      'Acesso antecipado a novos conteúdos'
    ]

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#4CB09A] to-[#F7D97E] pb-24">
        {/* Header */}
        <div className="p-6 pt-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Zenora Premium</h1>
            <p className="text-white/90 text-lg">Desbloqueie todo o potencial da sua jornada</p>
          </div>

          {/* Features */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-white/20">
            <div className="grid grid-cols-1 gap-3">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#4CB09A] text-sm">✓</span>
                  </div>
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="space-y-4">
            {/* Annual Plan */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#F7D97E] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F7D97E] px-4 py-1 rounded-full">
                <span className="text-sm font-bold text-gray-800">MAIS POPULAR</span>
              </div>
              <div className="text-center mb-4 mt-2">
                <p className="text-gray-600 text-sm font-medium">ANUAL</p>
                <div className="flex items-baseline justify-center gap-1 my-2">
                  <span className="text-5xl font-bold text-gray-800">$4.49</span>
                  <span className="text-gray-500">/ano</span>
                </div>
                <p className="text-[#4CB09A] font-semibold">Economize 62%</p>
              </div>
              <button className="w-full bg-gradient-to-r from-[#4CB09A] to-[#F7D97E] text-white py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Começar Agora
              </button>
            </div>

            {/* Monthly Plan */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="text-center mb-4">
                <p className="text-gray-600 text-sm font-medium">MENSAL</p>
                <div className="flex items-baseline justify-center gap-1 my-2">
                  <span className="text-4xl font-bold text-gray-800">$0.99</span>
                  <span className="text-gray-500">/mês</span>
                </div>
              </div>
              <button className="w-full bg-gray-100 text-gray-800 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300">
                Assinar Mensal
              </button>
            </div>
          </div>

          {/* Programs */}
          <div className="mt-8">
            <h3 className="text-white font-bold text-xl mb-4">Programas Especiais</h3>
            <div className="space-y-3">
              {[
                { name: '21 dias para Ansiedade Zero', price: '$2.99' },
                { name: 'Sono Profundo em 14 dias', price: '$1.99' },
                { name: 'Equilíbrio com Mantras', price: '$3.99' },
                { name: 'Reset Mental: 5 min por dia', price: '$1.99' }
              ].map((program, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between border border-white/20">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">{program.name}</span>
                  </div>
                  <span className="text-[#F7D97E] font-bold">{program.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-around max-w-md mx-auto">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Sparkles className="w-6 h-6" />
              <span className="text-xs font-medium">Início</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('workout')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Dumbbell className="w-6 h-6" />
              <span className="text-xs font-medium">Treinos</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('library')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Library className="w-6 h-6" />
              <span className="text-xs font-medium">Biblioteca</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-[#4CB09A]">
              <Crown className="w-6 h-6" />
              <span className="text-xs font-medium">Premium</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Tela 6: Treinos (Musculação e Calistenia)
  if (currentScreen === 'workout') {
    const workoutPrograms = [
      {
        title: 'Corpo Perfeito - 30 Dias',
        type: 'Programa Completo',
        duration: '30 dias',
        level: 'Intermediário',
        color: 'from-orange-500 to-red-600',
        icon: Target,
        description: 'Transforme seu corpo em 30 dias com treinos progressivos'
      },
      {
        title: 'Calistenia Iniciante',
        type: 'Peso Corporal',
        duration: '4 semanas',
        level: 'Iniciante',
        color: 'from-blue-500 to-cyan-600',
        icon: Zap,
        description: 'Domine os fundamentos da calistenia'
      },
      {
        title: 'Hipertrofia Avançada',
        type: 'Musculação',
        duration: '12 semanas',
        level: 'Avançado',
        color: 'from-purple-600 to-pink-600',
        icon: TrendingUp,
        description: 'Maximize seus ganhos de massa muscular'
      }
    ]

    const quickWorkouts = [
      { name: 'Push-ups Challenge', duration: '5 min', calories: '50 kcal', type: 'Calistenia' },
      { name: 'Treino de Peito', duration: '20 min', calories: '180 kcal', type: 'Musculação' },
      { name: 'Core Killer', duration: '10 min', calories: '90 kcal', type: 'Calistenia' },
      { name: 'Pernas Completo', duration: '30 min', calories: '250 kcal', type: 'Musculação' },
      { name: 'Pull-ups Progressão', duration: '15 min', calories: '120 kcal', type: 'Calistenia' },
      { name: 'Braços Definidos', duration: '18 min', calories: '140 kcal', type: 'Musculação' }
    ]

    return (
      <div className="min-h-screen bg-[#FAFAFA] pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Treinos</h1>
              <p className="text-white/90 mt-1">Alcance o corpo perfeito</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-white/80 text-xs font-medium mb-1">SEQUÊNCIA</div>
              <div className="text-white text-2xl font-bold">7 dias</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-white/80 text-xs font-medium mb-1">TREINOS</div>
              <div className="text-white text-2xl font-bold">24</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-white/80 text-xs font-medium mb-1">CALORIAS</div>
              <div className="text-white text-2xl font-bold">3.2k</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 -mt-4 space-y-6">
          {/* Featured Programs */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Programas em Destaque</h2>
            <div className="space-y-4">
              {workoutPrograms.map((program, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className={`bg-gradient-to-r ${program.color} p-6 text-white`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-white/80 text-xs font-semibold mb-1">{program.type.toUpperCase()}</div>
                        <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                        <p className="text-white/90 text-sm">{program.description}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                        <program.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">{program.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <button className={`w-full bg-gradient-to-r ${program.color} text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all`}>
                      Começar Programa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Workouts */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Treinos Rápidos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickWorkouts.map((workout, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-orange-600 mb-1">{workout.type.toUpperCase()}</div>
                      <h3 className="text-lg font-bold text-gray-800">{workout.name}</h3>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold">{workout.calories}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workout Categories */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Categorias</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Peito', color: 'from-red-500 to-orange-600' },
                { name: 'Costas', color: 'from-blue-500 to-cyan-600' },
                { name: 'Pernas', color: 'from-green-500 to-emerald-600' },
                { name: 'Braços', color: 'from-purple-500 to-pink-600' },
                { name: 'Ombros', color: 'from-yellow-500 to-orange-500' },
                { name: 'Core', color: 'from-indigo-500 to-purple-600' }
              ].map((category, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
                >
                  <Dumbbell className="w-8 h-8 mb-3" />
                  <h3 className="text-lg font-bold">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-around max-w-md mx-auto">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Sparkles className="w-6 h-6" />
              <span className="text-xs font-medium">Início</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-orange-600">
              <Dumbbell className="w-6 h-6" />
              <span className="text-xs font-medium">Treinos</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('library')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Library className="w-6 h-6" />
              <span className="text-xs font-medium">Biblioteca</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('premium')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#4CB09A] transition-colors"
            >
              <Crown className="w-6 h-6" />
              <span className="text-xs font-medium">Premium</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
