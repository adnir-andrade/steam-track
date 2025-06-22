import { Module } from '@nestjs/common';
import { UserGamesService } from './user-games.service';
import { UserGamesController } from './user-games.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [UserGamesController],
    providers: [UserGamesService],
})
export class UserGamesModule {}