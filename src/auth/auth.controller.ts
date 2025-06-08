import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    Get,
    Req,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from 'src/users/dto/create-user.dto';
import {LoginDto} from './dto/login.dto';
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.authService.register(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto.email, loginDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() request) {
        const currentUser = request.user;
        return {
            message: 'This is a protected route!',
            user: currentUser,
        };
    }
}