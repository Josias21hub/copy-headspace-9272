'use client'

import { useState } from 'react'
import { 
  User, Bell, Shield, Share2, MessageSquare, BarChart3, 
  ChevronRight, Moon, Sun, Globe, Clock, Heart, Smartphone,
  Lock, Eye, FileText, HelpCircle, LogOut, ArrowLeft, Check
} from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    meditation: true,
    workout: true,
    progress: false,
    social: true,
    marketing: false
  })

  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto')
  const [language, setLanguage] = useState('pt-BR')

  const [reminderTimes, setReminderTimes] = useState({
    morning: '08:00',
    afternoon: '14:00',
    evening: '20:00'
  })

  const [healthSync, setHealthSync] = useState({
    googleFit: false,
    appleHealth: false,
    fitbit: false,
    samsung: false
  })

  const [preferences, setPreferences] = useState({
    meditationDuration: '10',
    workoutIntensity: 'medium',
    musicPreference: 'nature',
    voiceGender: 'female'
  })

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4CB09A] to-[#F7D97E] p-6 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Configurações</h1>
            <p className="text-white/80 mt-1">Personalize sua experiência</p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">Usuário Zenora</h3>
              <p className="text-white/80 text-sm">zenora@exemplo.com</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 -mt-4 space-y-6">
        {/* Notifications Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Notificações e Lembretes</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#4CB09A]" />
                <span className="font-medium text-gray-800">Lembretes de Meditação</span>
              </div>
              <button
                onClick={() => setNotifications({...notifications, meditation: !notifications.meditation})}
                className={`w-12 h-6 rounded-full transition-all ${
                  notifications.meditation ? 'bg-[#4CB09A]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                  notifications.meditation ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-800">Lembretes de Treino</span>
              </div>
              <button
                onClick={() => setNotifications({...notifications, workout: !notifications.workout})}
                className={`w-12 h-6 rounded-full transition-all ${
                  notifications.workout ? 'bg-[#4CB09A]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                  notifications.workout ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-800">Relatórios de Progresso</span>
              </div>
              <button
                onClick={() => setNotifications({...notifications, progress: !notifications.progress})}
                className={`w-12 h-6 rounded-full transition-all ${
                  notifications.progress ? 'bg-[#4CB09A]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                  notifications.progress ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Reminder Times */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#4CB09A]" />
              Horários dos Lembretes
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Manhã</span>
                <input
                  type="time"
                  value={reminderTimes.morning}
                  onChange={(e) => setReminderTimes({...reminderTimes, morning: e.target.value})}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tarde</span>
                <input
                  type="time"
                  value={reminderTimes.afternoon}
                  onChange={(e) => setReminderTimes({...reminderTimes, afternoon: e.target.value})}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Noite</span>
                <input
                  type="time"
                  value={reminderTimes.evening}
                  onChange={(e) => setReminderTimes({...reminderTimes, evening: e.target.value})}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Health Devices Integration */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Dispositivos de Saúde</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🏃</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Google Fit</p>
                  <p className="text-xs text-gray-500">Sincronizar atividades</p>
                </div>
              </div>
              <button
                onClick={() => setHealthSync({...healthSync, googleFit: !healthSync.googleFit})}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  healthSync.googleFit 
                    ? 'bg-[#4CB09A] text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {healthSync.googleFit ? 'Conectado' : 'Conectar'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🍎</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Apple Health</p>
                  <p className="text-xs text-gray-500">Sincronizar dados de saúde</p>
                </div>
              </div>
              <button
                onClick={() => setHealthSync({...healthSync, appleHealth: !healthSync.appleHealth})}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  healthSync.appleHealth 
                    ? 'bg-[#4CB09A] text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {healthSync.appleHealth ? 'Conectado' : 'Conectar'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">⌚</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Fitbit</p>
                  <p className="text-xs text-gray-500">Rastrear exercícios</p>
                </div>
              </div>
              <button
                onClick={() => setHealthSync({...healthSync, fitbit: !healthSync.fitbit})}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  healthSync.fitbit 
                    ? 'bg-[#4CB09A] text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {healthSync.fitbit ? 'Conectado' : 'Conectar'}
              </button>
            </div>
          </div>
        </div>

        {/* Personalization */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Personalização</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duração Padrão de Meditação
              </label>
              <select
                value={preferences.meditationDuration}
                onChange={(e) => setPreferences({...preferences, meditationDuration: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CB09A]"
              >
                <option value="5">5 minutos</option>
                <option value="10">10 minutos</option>
                <option value="15">15 minutos</option>
                <option value="20">20 minutos</option>
                <option value="30">30 minutos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intensidade de Treino
              </label>
              <select
                value={preferences.workoutIntensity}
                onChange={(e) => setPreferences({...preferences, workoutIntensity: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CB09A]"
              >
                <option value="light">Leve</option>
                <option value="medium">Moderado</option>
                <option value="intense">Intenso</option>
                <option value="extreme">Extremo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferência de Sons
              </label>
              <select
                value={preferences.musicPreference}
                onChange={(e) => setPreferences({...preferences, musicPreference: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CB09A]"
              >
                <option value="nature">Sons da Natureza</option>
                <option value="binaural">Frequências Binaurais</option>
                <option value="instrumental">Instrumental</option>
                <option value="silence">Silêncio</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Privacidade e Segurança</h2>
          </div>

          <Link href="/privacy">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Política de Privacidade</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Link>

          <Link href="/terms">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Termos de Uso</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Link>

          <Link href="/data-management">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Gerenciar Meus Dados</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Link>
        </div>

        {/* Social Integration */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Redes Sociais</h2>
          </div>

          <Link href="/social">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <Share2 className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Compartilhar Progresso</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Link>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">f</span>
              </div>
              <span className="font-medium text-gray-800">Conectar Facebook</span>
            </div>
            <span className="text-sm text-[#4CB09A] font-semibold">Conectar</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">📷</span>
              </div>
              <span className="font-medium text-gray-800">Conectar Instagram</span>
            </div>
            <span className="text-sm text-[#4CB09A] font-semibold">Conectar</span>
          </button>
        </div>

        {/* Feedback & Support */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Suporte</h2>
          </div>

          <Link href="/feedback">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Enviar Feedback</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Link>

          <Link href="/help">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Central de Ajuda</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Link>
        </div>

        {/* Logout */}
        <button className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-semibold hover:bg-red-100 transition-all flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </button>
      </div>
    </div>
  )
}
