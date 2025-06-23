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
    UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.interface';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {CreateGameDto} from "./dto/create-game.dto";
import {UpdateGameDto} from "./dto/update-game.dto";

@ApiTags('games')
@Controller({
    path: 'games',
    version: '1',
})
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Creates a new game (Admin only)' })
    @ApiResponse({ status: 201, description: 'Game successfully created' })
    create(@Body() createGame: CreateGameDto) {
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'Replaces all data of a game by its ID (Admin only)' })
    @ApiResponse({ status: 200, description: 'Game successfully updated' })
    @ApiResponse({ status: 404, description: 'Game not found' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateData: UpdateGameDto
    ) {
        return this.gamesService.update(id, updateData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @Patch(':id')
    @ApiOperation({ summary: 'Partially updates a game by its ID (Admin only)' })
    @ApiResponse({ status: 200, description: 'Game successfully updated' })
    @ApiResponse({ status: 404, description: 'Game not found' })
    partialUpdate(
        @Param('id', ParseIntPipe) id: number,
        @Body() partialUpdateData: UpdateGameDto
    ) {
        return this.gamesService.update(id, partialUpdateData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Deletes a game by its ID (Admin only)' })
    @ApiResponse({ status: 204, description: 'Game successfully deleted' })
    @ApiResponse({ status: 404, description: 'Game not found' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.gamesService.remove(id);
    }
}