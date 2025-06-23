import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'john_doe@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'bacon123' })
    @IsString()
    password: string;
}