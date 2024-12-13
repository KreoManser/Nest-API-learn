import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);

  const server = app.getHttpAdapter().getInstance();
  const routes = server._router.stack.filter((layer) => layer.route).map((layer) => layer.route);
  console.log('Registered Routes:', routes);
}
bootstrap();
