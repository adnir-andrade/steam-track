import {Injectable, ForbiddenException, NotFoundException, ConflictException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserGameDto } from './dto/create-user-game.dto';
import { UpdateUserGameDto } from './dto/update-user-game.dto';
import { UserGame } from '@prisma/client';

@Injectable()
export class UserGamesService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<UserGame[]> {
        return this.prisma.userGame.findMany();
    }

    async findByUser(userId: number): Promise<UserGame[]> {
        return this.prisma.userGame.findMany({
            where: { userId },
        });
    }

    async findOne(currentUserId: number, userGameId: number, isAdmin: boolean): Promise<UserGame> {
        const userGame = await this.prisma.userGame.findUnique({ where: { id: userGameId } });

        if (!userGame) throw new NotFoundException('UserGame not found');
        if (!isAdmin && userGame.userId !== currentUserId) {
            throw new ForbiddenException('Access denied.');
        }

        return userGame;
    }


    async create(userId: number, dto: CreateUserGameDto): Promise<UserGame> {
        if (userId !== dto.userId) {
            throw new ForbiddenException('You can only create games for yourself.');
        }

        try {
            return await this.prisma.userGame.create({
                data: dto,
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('You have already added this game.');
            }
            throw error;
        }
    }

    async remove(userId: number, userGameId: number, isAdmin: boolean): Promise<void> {
        const userGame = await this.prisma.userGame.findUnique({ where: { id: userGameId } });

        if (!userGame) throw new NotFoundException('UserGame not found');

        if (!isAdmin && userGame.userId !== userId) {
            throw new ForbiddenException('You cannot delete games from other users.');
        }

        await this.prisma.userGame.delete({
            where: { id: userGameId },
        });
    }

    async toggleFavorite(userId: number, userGameId: number): Promise<UserGame> {
        const userGame = await this.prisma.userGame.findUnique({ where: { id: userGameId } });

        if (!userGame) throw new NotFoundException('UserGame not found');
        if (userGame.userId !== userId) {
            throw new ForbiddenException('You can only modify your own favorites.');
        }

        return this.prisma.userGame.update({
            where: { id: userGameId },
            data: { is_favorite: !userGame.is_favorite },
        });
    }

    async updateAchievements(userId: number, userGameId: number, unlocked: number): Promise<UserGame> {
        const userGame = await this.prisma.userGame.findUnique({ where: { id: userGameId } });

        if (!userGame) throw new NotFoundException('UserGame not found');
        if (userGame.userId !== userId) {
            throw new ForbiddenException('You can only update your own achievements.');
        }

        return this.prisma.userGame.update({
            where: { id: userGameId },
            data: { achievements_unlocked: unlocked },
        });
    }
}