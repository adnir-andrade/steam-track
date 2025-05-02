import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryUserFilterDto {
    @IsOptional()
    @IsString({ message: 'Username filter must be a valid string.' })
    @Transform(({ value }) => value?.trim())
    username?: string;

    @IsOptional()
    @IsString({ message: 'Steam username filter must be a valid string.' })
    @Transform(({ value }) => value?.trim())
    steam_username?: string;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    page?: number;
}