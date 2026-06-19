import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

const expressApp = express();
let nestInitialized = false;
let initPromise: Promise<void> | null = null;

// Respond to health checks immediately without waiting for NestJS init
expressApp.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function initNest(): Promise<void> {
  if (nestInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter, {
      logger: ['error', 'warn'],
    });

    app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

    app.enableCors({
      origin: process.env.FRONTEND_URL || '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
    );

    app.setGlobalPrefix('api/v1');
    await app.init();
    nestInitialized = true;
  })().catch(err => {
    initPromise = null;
    console.error('[lambda] NestJS init failed:', err);
    throw err;
  });

  return initPromise;
}

// Kick off init on module load (warm-up)
void initNest();

export default async function handler(req: express.Request, res: express.Response) {
  // Health check already handled above — NestJS not needed
  if (req.url === '/api/v1/health' || req.url === '/api/v1/') {
    return expressApp(req, res);
  }

  try {
    await initNest();
    expressApp(req, res);
  } catch (err) {
    console.error('[lambda] handler error:', err);
    res.status(503).json({ error: 'Service unavailable', message: 'API is initializing, retry in a few seconds' });
  }
}
