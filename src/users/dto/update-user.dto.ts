import {
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail({}, { message: 'Email must be valid.' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Password must be a string.' })
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    password?: string;

    @IsOptional()
    @IsString({ message: 'Username must be a string.' })
    @Matches(/^\S+$/, { message: 'Username must not contain spaces.' })
    username?: string;

    @IsOptional()
    @IsString({ message: 'Steam username must be a string.' })
    @Matches(/^\S+$/, { message: 'Steam username must not contain spaces.' })
    steam_username?: string;

    @IsOptional()
    @IsString({ message: 'Name must be a string.' })
    name?: string;
}