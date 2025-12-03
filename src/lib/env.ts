/**
 * Configuração de ambiente para produção
 * Valida e exporta variáveis de ambiente de forma segura
 */

// Validação de variáveis obrigatórias
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

// Função para validar variáveis de ambiente
function validateEnv() {
  const missing: string[] = [];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `❌ Variáveis de ambiente faltando:\n${missing.join('\n')}\n\nConfigure-as no arquivo .env.local`
    );
  }
}

// Validar apenas em produção
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}

// Exportar variáveis de ambiente tipadas
export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
  },
  analytics: {
    vercelId: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
  },
} as const;

// Tipo para autocompletar
export type Env = typeof env;
