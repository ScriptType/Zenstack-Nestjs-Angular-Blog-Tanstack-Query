import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RpcModule } from './rpc/rpc.module';
import { ClsModule } from 'nestjs-cls';
import { auth } from '../auth'; // Your Better Auth instance
import { AuthGuard, AuthModule } from '@thallesp/nestjs-better-auth';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Module({
  imports: [
    AuthModule.forRoot(auth),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    RpcModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
