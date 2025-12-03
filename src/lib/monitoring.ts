/**
 * Utilitários para monitoramento e logging em produção
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogData {
  message: string;
  level: LogLevel;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: Error;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLog(data: LogData): string {
    const { timestamp, level, message, context, error } = data;
    let log = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    if (context) {
      log += `\nContext: ${JSON.stringify(context, null, 2)}`;
    }
    
    if (error) {
      log += `\nError: ${error.message}\nStack: ${error.stack}`;
    }
    
    return log;
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
    const logData: LogData = {
      message,
      level,
      timestamp: new Date().toISOString(),
      context,
      error,
    };

    const formattedLog = this.formatLog(logData);

    // Em desenvolvimento, usa console
    if (this.isDevelopment) {
      switch (level) {
        case 'error':
          console.error(formattedLog);
          break;
        case 'warn':
          console.warn(formattedLog);
          break;
        case 'debug':
          console.debug(formattedLog);
          break;
        default:
          console.log(formattedLog);
      }
    } else {
      // Em produção, pode enviar para serviço de logging (Sentry, LogRocket, etc)
      // Por enquanto, apenas console.error para erros críticos
      if (level === 'error') {
        console.error(formattedLog);
      }
    }
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log('error', message, context, error);
  }

  debug(message: string, context?: Record<string, unknown>) {
    if (this.isDevelopment) {
      this.log('debug', message, context);
    }
  }
}

export const logger = new Logger();

/**
 * Wrapper para funções assíncronas com tratamento de erro
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  errorMessage: string
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    logger.error(errorMessage, error as Error);
    return null;
  }
}

/**
 * Métricas de performance
 */
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  start(label: string) {
    this.marks.set(label, performance.now());
  }

  end(label: string) {
    const startTime = this.marks.get(label);
    if (!startTime) {
      logger.warn(`Performance mark "${label}" not found`);
      return;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(label);

    logger.debug(`Performance: ${label}`, { duration: `${duration.toFixed(2)}ms` });

    // Em produção, pode enviar para analytics
    if (process.env.NODE_ENV === 'production' && duration > 1000) {
      logger.warn(`Slow operation detected: ${label}`, { duration: `${duration.toFixed(2)}ms` });
    }
  }
}

export const perfMonitor = new PerformanceMonitor();
