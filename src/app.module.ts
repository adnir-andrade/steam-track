import {MiddlewareConsumer, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import {AuthMiddleware} from "./auth/auth.middleware";

@Module({
  imports: [SharedModule, CoreModule, GamesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}