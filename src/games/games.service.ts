import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Game } from '@prisma/client';

@Injectable()
export class GamesService {
    constructor(private prisma: PrismaService) {}

    async create(gameData: Prisma.GameCreateInput): Promise<Game> {
        return this.prisma.game.create({
            data: gameData,
        });
    }

    async findAll(): Promise<Game[]> {
        return this.prisma.game.findMany();
    }

    async findOne(id: number): Promise<Game> {
        const game = await this.prisma.game.findUnique({ where: { id } });
        if (!game) throw new NotFoundException('Game not found');
        return game;
    }

    async update(id: number, updateData: Prisma.GameUpdateInput): Promise<Game> {
        await this.findOne(id);
        return this.prisma.game.update({
            where: { id },
            data: updateData,
        });
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.prisma.game.delete({
            where: { id },
        });
    }
}