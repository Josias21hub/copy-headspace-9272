'use client'

import { ArrowLeft, Shield, Lock, Eye, Database, Globe, FileText } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/settings">
            <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Política de Privacidade</h1>
            <p className="text-white/80 mt-1">Atualizada em Janeiro de 2025</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 -mt-4 space-y-6">
        {/* GDPR/LGPD Compliance Badge */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">100% Conforme</h2>
              <p className="text-white/90 text-sm">GDPR, LGPD e CCPA</p>
            </div>
          </div>
          <p className="text-white/90 text-sm">
            Seus dados são protegidos pelos mais rigorosos padrões internacionais de privacidade e segurança.
          </p>
        </div>

        {/* Key Points */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Seus Direitos</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <Eye className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Direito de Acesso</h3>
                <p className="text-sm text-gray-600">
                  Você pode solicitar uma cópia de todos os dados que coletamos sobre você a qualquer momento.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
              <Lock className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Direito de Retificação</h3>
                <p className="text-sm text-gray-600">
                  Corrija ou atualize seus dados pessoais diretamente nas configurações do app.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl">
              <Database className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Direito ao Esquecimento</h3>
                <p className="text-sm text-gray-600">
                  Solicite a exclusão completa de seus dados de nossos servidores a qualquer momento.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
              <Globe className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Portabilidade de Dados</h3>
                <p className="text-sm text-gray-600">
                  Exporte seus dados em formato legível por máquina para usar em outros serviços.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Dados Coletados</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">📊 Dados de Uso</h3>
              <ul className="space-y-1 text-sm text-gray-600 ml-4">
                <li>• Sessões de meditação e treinos realizados</li>
                <li>• Tempo de uso do aplicativo</li>
                <li>• Preferências de conteúdo</li>
                <li>• Progresso e conquistas</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">👤 Dados Pessoais</h3>
              <ul className="space-y-1 text-sm text-gray-600 ml-4">
                <li>• Nome e e-mail (para login)</li>
                <li>• Foto de perfil (opcional)</li>
                <li>• Preferências de idioma e tema</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">💪 Dados de Saúde (Opcional)</h3>
              <ul className="space-y-1 text-sm text-gray-600 ml-4">
                <li>• Dados sincronizados de dispositivos conectados</li>
                <li>• Frequência cardíaca e calorias (se autorizado)</li>
                <li>• Padrões de sono (se autorizado)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Measures */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Medidas de Segurança</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Criptografia End-to-End</h3>
                <p className="text-sm text-gray-600">Todos os dados são criptografados em trânsito e em repouso.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Servidores Seguros</h3>
                <p className="text-sm text-gray-600">Hospedagem em data centers certificados ISO 27001.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Auditorias Regulares</h3>
                <p className="text-sm text-gray-600">Testes de segurança e auditorias trimestrais.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] rounded-3xl p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Dúvidas sobre Privacidade?</h2>
          <p className="text-white/90 mb-4 text-sm">
            Entre em contato com nosso Encarregado de Proteção de Dados (DPO).
          </p>
          <button className="bg-white text-[#4CB09A] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all">
            privacy@zenora.app
          </button>
        </div>

        {/* Last Updated */}
        <div className="text-center text-gray-500 text-sm">
          <p>Última atualização: 15 de Janeiro de 2025</p>
          <p className="mt-1">Versão 2.0 - Conforme LGPD (Lei 13.709/2018)</p>
        </div>
      </div>
    </div>
  )
}
