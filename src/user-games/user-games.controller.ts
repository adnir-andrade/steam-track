import {
    Controller,
    Post,
    Delete,
    Patch,
    Get,
    Param,
    Body,
    ParseIntPipe,
    UseGuards,
    Req,
    HttpCode,
    ForbiddenException,
} from '@nestjs/common';
import { UserGamesService } from './user-games.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserGameDto } from './dto/create-user-game.dto';
import { UpdateAchievementsDto } from './dto/update-achievements.dto';
import { AuthenticatedRequest } from '../common/types/authenticated-request';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';

@ApiTags('user-games')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({
    path: 'user-games',
    version: '1',
})
export class UserGamesController {
    constructor(private readonly userGamesService: UserGamesService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user-game relationship' })
    @ApiResponse({ status: 201, description: 'User-game created successfully' })
    async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateUserGameDto) {
        return this.userGamesService.create(req.user.id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Remove a user-game relationship' })
    @ApiResponse({ status: 204, description: 'User-game deleted successfully' })
    async remove(@Req() req: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number) {
        return this.userGamesService.remove(req.user.id, id, req.user.role === 'ADMIN');
    }

    @Patch(':id/favorite')
    @ApiOperation({ summary: 'Toggle game favorite status for current user' })
    @ApiResponse({ status: 200, description: 'Favorite status toggled successfully' })
    async toggleFavorite(@Req() req: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number) {
        return this.userGamesService.toggleFavorite(req.user.id, id);
    }

    @Patch(':id/achievements')
    @ApiOperation({ summary: 'Update number of unlocked achievements for current user' })
    @ApiResponse({ status: 200, description: 'Achievements updated successfully' })
    async updateAchievements(
        @Req() req: AuthenticatedRequest,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateAchievementsDto,
    ) {
        return this.userGamesService.updateAchievements(req.user.id, id, dto.unlocked);
    }

    @Get()
    @Roles('ADMIN')
    @ApiOperation({ summary: 'List all user-game relationships (admin only)' })
    @ApiResponse({ status: 200, description: 'List of all user-games returned' })
    async findAll() {
        return this.userGamesService.findAll();
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'List all games of a specific user' })
    @ApiResponse({ status: 200, description: 'List of games returned for user' })
    async findByUserId(
        @Req() req: AuthenticatedRequest,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        const isAdmin = req.user.role === 'ADMIN';
        const isCurrentUser = req.user.id === userId;
        if (!isAdmin && !isCurrentUser) throw new ForbiddenException();
        return this.userGamesService.findByUser(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a user-game by its ID' })
    @ApiResponse({ status: 200, description: 'User-game returned successfully' })
    @ApiResponse({ status: 403, description: 'Access denied' })
    async findOne(
        @Req() req: AuthenticatedRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.userGamesService.findOne(req.user.id, id, req.user.role === 'ADMIN');
    }
}