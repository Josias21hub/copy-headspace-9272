'use client'

import { useState } from 'react'
import { ArrowLeft, MessageSquare, Star, Send, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const categories = [
    { value: 'bug', label: '🐛 Reportar Bug', color: 'bg-red-100 text-red-700' },
    { value: 'feature', label: '💡 Sugerir Funcionalidade', color: 'bg-blue-100 text-blue-700' },
    { value: 'improvement', label: '✨ Melhoria', color: 'bg-purple-100 text-purple-700' },
    { value: 'compliment', label: '❤️ Elogio', color: 'bg-green-100 text-green-700' },
    { value: 'other', label: '💬 Outro', color: 'bg-gray-100 text-gray-700' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria o envio real do feedback
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setRating(0)
      setCategory('')
      setMessage('')
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Feedback Enviado!</h2>
          <p className="text-gray-600 mb-6">
            Obrigado por nos ajudar a melhorar o Zenora. Sua opinião é muito importante para nós!
          </p>
          <Link href="/settings">
            <button className="bg-gradient-to-r from-[#4CB09A] to-[#F7D97E] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              Voltar para Configurações
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/settings">
            <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Enviar Feedback</h1>
            <p className="text-white/80 mt-1">Sua opinião nos ajuda a melhorar</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 -mt-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Como você avalia o Zenora?
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-all hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Categoria do Feedback
            </label>
            <div className="grid grid-cols-1 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`p-4 rounded-xl font-medium transition-all ${
                    category === cat.value
                      ? cat.color + ' ring-2 ring-offset-2 ring-current'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Conte-nos mais
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Descreva sua experiência, sugestão ou problema..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CB09A] resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!rating || !category || !message}
            className="w-full bg-gradient-to-r from-[#4CB09A] to-[#F7D97E] text-white py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar Feedback
          </button>
        </form>

        {/* Quick Feedback */}
        <div className="mt-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-6 text-white">
          <h3 className="text-lg font-bold mb-3">💬 Feedback Rápido</h3>
          <p className="text-white/90 text-sm mb-4">
            Responda em segundos e nos ajude a melhorar:
          </p>
          <div className="space-y-2">
            <button className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-xl font-medium hover:bg-white/30 transition-all">
              O app está funcionando bem? 👍
            </button>
            <button className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-xl font-medium hover:bg-white/30 transition-all">
              Você recomendaria o Zenora? ⭐
            </button>
            <button className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-xl font-medium hover:bg-white/30 transition-all">
              O conteúdo é útil? 📚
            </button>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-6 h-6 text-[#4CB09A] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Precisa de ajuda imediata?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Nossa equipe de suporte responde em até 24 horas.
              </p>
              <a 
                href="mailto:suporte@zenora.app"
                className="text-[#4CB09A] font-semibold text-sm hover:underline"
              >
                suporte@zenora.app
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
