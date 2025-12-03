/**
 * Validação e sanitização de dados para segurança
 */

import { z } from 'zod';

// Schemas de validação
export const emailSchema = z.string().email('Email inválido');

export const moodSchema = z.enum(['happy', 'neutral', 'anxious', 'tired', 'sad'], {
  errorMap: () => ({ message: 'Humor inválido' }),
});

export const meditationSessionSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título muito longo'),
  duration: z.number().min(1, 'Duração mínima: 1 minuto').max(180, 'Duração máxima: 180 minutos'),
  category: z.enum(['meditation', 'sleep', 'breathe', 'move']),
  completed: z.boolean().default(false),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (formato: YYYY-MM-DD)'),
});

export const workoutSessionSchema = z.object({
  workout_name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  duration: z.number().min(1, 'Duração mínima: 1 minuto').max(300, 'Duração máxima: 300 minutos'),
  calories: z.number().min(0, 'Calorias não podem ser negativas').max(5000, 'Valor muito alto'),
  type: z.enum(['calistenia', 'musculacao']),
  completed: z.boolean().default(false),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (formato: YYYY-MM-DD)'),
});

export const reminderSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título muito longo'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Horário inválido (formato: HH:MM)'),
  days: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])),
  enabled: z.boolean().default(true),
  type: z.enum(['meditation', 'workout', 'custom']),
});

export const feedbackSchema = z.object({
  category: z.enum(['bug', 'feature', 'improvement', 'other']),
  message: z.string().min(10, 'Mensagem muito curta').max(1000, 'Mensagem muito longa'),
  rating: z.number().min(1).max(5).optional(),
});

/**
 * Sanitização de strings para prevenir XSS
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Validação de UUID
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validação de data
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Rate limiting simples (client-side)
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 10, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  check(key: string): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    
    // Remover timestamps antigos
    const validTimestamps = timestamps.filter(t => now - t < this.windowMs);
    
    if (validTimestamps.length >= this.limit) {
      return false;
    }
    
    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);
    return true;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

export const rateLimiter = new RateLimiter(20, 60000); // 20 requisições por minuto

/**
 * Validação de entrada com Zod
 */
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { success: false, error: firstError.message };
    }
    return { success: false, error: 'Erro de validação desconhecido' };
  }
}
