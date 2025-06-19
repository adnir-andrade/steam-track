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
import { Game } from './game.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('games')
@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Creates a new game' })
    @ApiResponse({ status: 201, description: 'Game successfully created' })
    create(@Body() createGame: Omit<Game, 'id'>) {
        return this.gamesService.create(createGame);
    }

    @Get()
    @ApiOperation({ summary: 'Returns a list of all games' })
    @ApiResponse({ status: 200, description: 'List of games returned' })
    findAll() {
        return this.gamesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Returns a game by its ID' })
    @ApiResponse({ status: 200, description: 'Game data returned' })
    @ApiResponse({ status: 404, description: 'Game not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.gamesService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Replaces all data of a game by its ID' })
    @ApiResponse({ status: 200, description: 'Game successfully updated' })
    @ApiResponse({ status: 404, description: 'Game not found' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Omit<Game, 'id'>>) {
        return this.gamesService.update(id, updateData);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Partially updates a game by its ID' })
    @ApiResponse({ status: 200, description: 'Game successfully updated' })
    @ApiResponse({ status: 404, description: 'Game not found' })
    partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() partialUpdateData: Partial<Omit<Game, 'id'>>) {
        return this.gamesService.update(id, partialUpdateData);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Deletes a game by its ID' })
    @ApiResponse({ status: 204, description: 'Game successfully deleted' })
    @ApiResponse({ status: 404, description: 'Game not found' })
    remove(@Param('id', ParseIntPipe) id: number) {
        this.gamesService.remove(id);
    }
}