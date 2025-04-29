import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Body,
    HttpCode,
    ParseIntPipe,
} from '@nestjs/common';
import { GamesService } from './games.service';
import {Game} from "./game.interface";

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Post()
    @HttpCode(201)
    create(@Body() createGame: Omit<Game, 'id'>) {
        return this.gamesService.create(createGame);
    }

    @Get()
    findAll() {
        return this.gamesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.gamesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Omit<Game, 'id'>>) {
        return this.gamesService.update(id, updateData);
    }

    @Patch(':id')
    partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() partialUpdateData: Partial<Omit<Game, 'id'>>) {
        return this.gamesService.update(id, partialUpdateData);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number) {
        this.gamesService.remove(id);
    }
}