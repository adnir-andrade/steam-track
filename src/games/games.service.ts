import { Injectable, NotFoundException } from '@nestjs/common';
import {Game} from "./game.interface";

@Injectable()
export class GamesService {
    private games: Game[] = [];
    private nextId = 1;

    create(gameData: Omit<Game, 'id'>): Game {
        const newGame: Game = { id: this.nextId++, ...gameData };
        this.games.push(newGame);
        return newGame;
    }

    findAll(): Game[] {
        return this.games;
    }

    findOne(id: number): Game {
        const game = this.games.find((game) => game.id === id);
        if (!game) throw new NotFoundException('Game not found');
        return game;
    }

    update(id: number, updateData: Partial<Omit<Game, 'id'>>): Game {
        const game = this.findOne(id);
        Object.assign(game, updateData);
        return game;
    }

    remove(id: number): void {
        const index = this.games.findIndex((game) => game.id === id);
        if (index === -1) throw new NotFoundException('Game not found');
        this.games.splice(index, 1);
    }
}