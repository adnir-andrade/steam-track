import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserGameDto {
    @ApiProperty({ example: 4, description: 'ID of the user creating the game relation' })
    @IsInt()
    userId: number;

    @ApiProperty({ example: 10, description: 'ID of the game to relate to the user' })
    @IsInt()
    gameId: number;

    @ApiProperty({ example: 2, description: 'ID representing the current status of the game for the user' })
    @IsInt()
    statusId: number;

    @ApiPropertyOptional({ example: 5, description: 'Number of achievements already unlocked' })
    @IsInt()
    @Min(0)
    @IsOptional()
    achievements_unlocked?: number = 0;

    @ApiPropertyOptional({ example: false, description: 'Whether this game is marked as favorite by the user' })
    @IsBoolean()
    @IsOptional()
    is_favorite?: boolean = false;
}