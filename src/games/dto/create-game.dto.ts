import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGameDto {
    @ApiProperty({ example: 'Ni no Kuni II: Revenant Kingdom' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: 'JRPG' })
    @IsOptional()
    @IsString()
    genre?: string;

    @ApiPropertyOptional({ example: 57 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    main_story_hours?: number;

    @ApiPropertyOptional({ example: 94 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    completionist_hours?: number;

    @ApiPropertyOptional({ example: 63 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    total_achievements?: number;
}