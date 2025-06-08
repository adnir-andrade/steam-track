import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import {AuthMiddleware} from "./auth/auth.middleware";
import { ErrorsModule } from './errors/errors.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SharedModule, CoreModule, GamesModule, UsersModule, ErrorsModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}