import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

let cachedApp: express.Express | null = null;
let initPromise: Promise<express.Express> | null = null;

async function createApp(): Promise<express.Express> {
  if (cachedApp) return cachedApp;

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn'],
    bufferLogs: true,
  });

  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }));

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
  cachedApp = expressApp;
  return expressApp;
}

export default async function handler(req: express.Request, res: express.Response) {
  // Deduplicate concurrent cold-start calls
  if (!initPromise) {
    initPromise = createApp().catch(err => {
      initPromise = null;
      cachedApp = null;
      throw err;
    });
  }

  try {
    const app = await initPromise;
    app(req, res);
  } catch (err) {
    console.error('[lambda] Init failed:', err);
    res.status(500).json({ error: 'Service initialization failed', message: String(err) });
  }
}
