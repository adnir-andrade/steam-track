import {
    IsBoolean,
    IsInt,
    IsOptional,
    Min,
} from 'class-validator';

export class CreateUserGameDto {
    @IsInt()
    userId: number;

    @IsInt()
    gameId: number;

    @IsInt()
    statusId: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    achievements_unlocked?: number = 0;

    @IsBoolean()
    @IsOptional()
    is_favorite?: boolean = false;
}