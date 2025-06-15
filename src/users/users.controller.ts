import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Delete,
    Query,
    ParseIntPipe,
    UseInterceptors,
    UseFilters,
    NotFoundException, UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserFilterDto } from './dto/query-user-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseInterceptor } from '../response/response.interceptor';
import { CustomExceptionFilter } from '../custom-exception/custom-exception.filter';
import { User } from '@prisma/client';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles.decorator";

@UseFilters(CustomExceptionFilter)
@UseInterceptors(ResponseInterceptor)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get()
    findAllUsers(@Query() queryFilter: QueryUserFilterDto): Promise<User[]> {
        return this.usersService.findAll(queryFilter);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get(':id')
    async findOneUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.usersService.findOne(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    @Patch(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.usersService.remove(id);
    }
}