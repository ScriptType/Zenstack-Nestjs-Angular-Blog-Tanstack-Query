import { Module } from '@nestjs/common';
import { RpcController } from './rpc.controller';
import { ApiHandlerService, ZenStackModule } from '@zenstackhq/server/nestjs';
import { PrismaService } from '../prisma.service';
import { ClsService } from 'nestjs-cls';
import { enhance } from '@zenstackhq/runtime';

@Module({
  controllers: [RpcController],
  imports: [
    ZenStackModule.registerAsync({
      useFactory: (prisma: PrismaService, cls: ClsService) => {
        return {
          getEnhancedPrisma: () => enhance(prisma, { user: cls.get('auth') }),
        };
      },
      inject: [PrismaService, ClsService],
      extraProviders: [PrismaService],
    }),
  ],
  providers: [ApiHandlerService],
})
export class RpcModule {}
