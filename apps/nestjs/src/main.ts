import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.enableShutdownHooks();

  app.enableCors({
    origin: ['http://localhost:4200'], // exact frontend origin(s)
    credentials: true, // allow sending cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // + any custom headers
    maxAge: 300, // Cache preflight for 5 minutes (reasonable for production)
  });
  app.setGlobalPrefix('v1/api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
