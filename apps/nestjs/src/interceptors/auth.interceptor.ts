import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly cls: ClsService,
    private readonly authService: AuthService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const session = await this.authService.api.getSession(request);
    if (session) {
      this.cls.set('auth', { ...session.user });
    }
    return next.handle();
  }
}
