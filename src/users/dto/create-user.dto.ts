import {
    IsEmail,
    IsString,
    MinLength,
    Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsEmail({}, { message: 'Email must be a valid email address.' })
    email: string;

    @IsString({ message: 'Password must be a string.' })
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    password: string;

    @IsString({ message: 'Username must be a string.' })
    @Matches(/^\S+$/, { message: 'Username must not contain spaces.' })
    username: string;

    @IsString({ message: 'Steam username must be a string.' })
    @Matches(/^\S+$/, { message: 'Steam username must not contain spaces.' })
    steam_username: string;

    @IsString({ message: 'Name must be a string.' })
    name: string;
}