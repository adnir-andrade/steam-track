import {
    IsEmail,
    IsString,
    MinLength,
    Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'user2@gmail.com',
        description: 'Valid email address of the user',
    })
    @IsEmail({}, { message: 'Email must be a valid email address.' })
    email: string;

    @ApiProperty({
        example: '123321123321',
        description: 'Password with at least 8 characters',
    })
    @IsString({ message: 'Password must be a string.' })
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    password: string;

    @ApiProperty({
        example: 'another_user',
        description: 'Unique username without spaces',
    })
    @IsString({ message: 'Username must be a string.' })
    @Matches(/^\S+$/, { message: 'Username must not contain spaces.' })
    username: string;

    @ApiProperty({
        example: 'some_other',
        description: 'Steam username of the user, no spaces allowed',
    })
    @IsString({ message: 'Steam username must be a string.' })
    @Matches(/^\S+$/, { message: 'Steam username must not contain spaces.' })
    steam_username: string;

    @ApiProperty({
        example: 'User Doe Clone',
        description: 'Full name of the user',
    })
    @IsString({ message: 'Name must be a string.' })
    name: string;
}