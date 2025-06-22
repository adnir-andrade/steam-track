import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGameDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    genre?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    main_story_hours?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    completionist_hours?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    total_achievements?: number;
}