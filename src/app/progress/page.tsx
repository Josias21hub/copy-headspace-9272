'use client'

import { useState } from 'react'
import { 
  ArrowLeft, TrendingUp, Calendar, Award, Target, 
  Flame, Heart, Moon, Zap, BarChart3, Clock, Trophy
} from 'lucide-react'
import Link from 'next/link'

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week')

  const stats = {
    week: {
      meditation: { sessions: 5, minutes: 47, streak: 5 },
      workout: { sessions: 3, calories: 890, streak: 3 },
      sleep: { hours: 49, quality: 85 },
      overall: { score: 92, improvement: 12 }
    },
    month: {
      meditation: { sessions: 22, minutes: 203, streak: 12 },
      workout: { sessions: 15, calories: 4250, streak: 8 },
      sleep: { hours: 217, quality: 82 },
      overall: { score: 88, improvement: 8 }
    },
    year: {
      meditation: { sessions: 248, minutes: 2340, streak: 45 },
      workout: { sessions: 156, calories: 42800, streak: 21 },
      sleep: { hours: 2628, quality: 80 },
      overall: { score: 85, improvement: 15 }
    }
  }

  const currentStats = stats[timeRange]

  const achievements = [
    { 
      icon: Flame, 
      title: 'Sequência de Fogo', 
      description: '7 dias consecutivos', 
      color: 'from-orange-500 to-red-600',
      unlocked: true 
    },
    { 
      icon: Trophy, 
      title: 'Mestre Zen', 
      description: '100 meditações completas', 
      color: 'from-yellow-500 to-orange-600',
      unlocked: true 
    },
    { 
      icon: Zap, 
      title: 'Guerreiro', 
      description: '50 treinos concluídos', 
      color: 'from-blue-500 to-cyan-600',
      unlocked: true 
    },
    { 
      icon: Moon, 
      title: 'Dorminhoco', 
      description: '30 noites de sono qualidade', 
      color: 'from-purple-500 to-pink-600',
      unlocked: false 
    },
    { 
      icon: Heart, 
      title: 'Coração Forte', 
      description: '10.000 calorias queimadas', 
      color: 'from-red-500 to-pink-600',
      unlocked: false 
    },
    { 
      icon: Target, 
      title: 'Foco Total', 
      description: '1000 minutos de meditação', 
      color: 'from-green-500 to-emerald-600',
      unlocked: false 
    }
  ]

  const weeklyActivity = [
    { day: 'Seg', meditation: 10, workout: 25 },
    { day: 'Ter', meditation: 15, workout: 30 },
    { day: 'Qua', meditation: 5, workout: 0 },
    { day: 'Qui', meditation: 10, workout: 20 },
    { day: 'Sex', meditation: 12, workout: 35 },
    { day: 'Sáb', meditation: 20, workout: 40 },
    { day: 'Dom', meditation: 15, workout: 0 }
  ]

  const maxActivity = Math.max(...weeklyActivity.flatMap(d => [d.meditation, d.workout]))

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Seu Progresso</h1>
            <p className="text-white/80 mt-1">Acompanhe sua jornada</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1">
          <button
            onClick={() => setTimeRange('week')}
            className={`flex-1 py-2 px-4 rounded-full font-semibold text-sm transition-all ${
              timeRange === 'week' 
                ? 'bg-white text-purple-600' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`flex-1 py-2 px-4 rounded-full font-semibold text-sm transition-all ${
              timeRange === 'month' 
                ? 'bg-white text-purple-600' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            Mês
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`flex-1 py-2 px-4 rounded-full font-semibold text-sm transition-all ${
              timeRange === 'year' 
                ? 'bg-white text-purple-600' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            Ano
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 -mt-4 space-y-6">
        {/* Overall Score */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm font-medium">PONTUAÇÃO GERAL</p>
              <h2 className="text-5xl font-bold mt-1">{currentStats.overall.score}</h2>
            </div>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <TrendingUp className="w-10 h-10" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${currentStats.overall.score}%` }}
              />
            </div>
            <span className="text-sm font-semibold">+{currentStats.overall.improvement}%</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Meditation Stats */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] rounded-xl flex items-center justify-center mb-3">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">MEDITAÇÃO</p>
            <p className="text-2xl font-bold text-gray-800">{currentStats.meditation.sessions}</p>
            <p className="text-sm text-gray-600 mt-1">{currentStats.meditation.minutes} minutos</p>
            <div className="flex items-center gap-1 mt-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-semibold text-orange-500">{currentStats.meditation.streak} dias</span>
            </div>
          </div>

          {/* Workout Stats */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">TREINOS</p>
            <p className="text-2xl font-bold text-gray-800">{currentStats.workout.sessions}</p>
            <p className="text-sm text-gray-600 mt-1">{currentStats.workout.calories} kcal</p>
            <div className="flex items-center gap-1 mt-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-semibold text-orange-500">{currentStats.workout.streak} dias</span>
            </div>
          </div>

          {/* Sleep Stats */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-3">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">SONO</p>
            <p className="text-2xl font-bold text-gray-800">{currentStats.sleep.hours}h</p>
            <p className="text-sm text-gray-600 mt-1">Qualidade: {currentStats.sleep.quality}%</p>
          </div>

          {/* Heart Rate */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-3">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">FREQUÊNCIA</p>
            <p className="text-2xl font-bold text-gray-800">72</p>
            <p className="text-sm text-gray-600 mt-1">bpm médio</p>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Atividade Semanal</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  {/* Meditation Bar */}
                  <div 
                    className="w-full bg-gradient-to-t from-[#4CB09A] to-[#F7D97E] rounded-t-lg transition-all duration-500"
                    style={{ 
                      height: `${(day.meditation / maxActivity) * 100}px`,
                      minHeight: day.meditation > 0 ? '8px' : '0px'
                    }}
                  />
                  {/* Workout Bar */}
                  <div 
                    className="w-full bg-gradient-to-t from-orange-500 to-red-600 rounded-t-lg transition-all duration-500"
                    style={{ 
                      height: `${(day.workout / maxActivity) * 100}px`,
                      minHeight: day.workout > 0 ? '8px' : '0px'
                    }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{day.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] rounded-full" />
              <span className="text-xs text-gray-600">Meditação</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-full" />
              <span className="text-xs text-gray-600">Treinos</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Conquistas</h2>
            <Award className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 transition-all ${
                  achievement.unlocked
                    ? `bg-gradient-to-br ${achievement.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  achievement.unlocked ? 'bg-white/20' : 'bg-white/50'
                }`}>
                  <achievement.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm mb-1">{achievement.title}</h3>
                <p className={`text-xs ${achievement.unlocked ? 'text-white/80' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-6 text-white">
          <h2 className="text-xl font-bold mb-3">💡 Insights da Semana</h2>
          <ul className="space-y-2 text-sm text-white/90">
            <li>• Você meditou 23% mais que na semana passada</li>
            <li>• Sua melhor hora para treinar é às 18h</li>
            <li>• Qualidade do sono melhorou 12%</li>
            <li>• Você está no top 10% dos usuários ativos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
