import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { ErrorsModule } from './errors/errors.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import { UserGamesModule } from './user-games/user-games.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    CoreModule,
    GamesModule,
    UsersModule,
    ErrorsModule,
    PrismaModule,
    AuthModule,
    UserGamesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}