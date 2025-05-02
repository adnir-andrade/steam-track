import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Delete,
    Query,
    ParseIntPipe, UseInterceptors, UseFilters, HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserFilterDto } from './dto/query-user-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./user.interface";
import {ResponseInterceptor} from "../response/response.interceptor";
import {CustomExceptionFilter} from "../custom-exception/custom-exception.filter";

@UseFilters(CustomExceptionFilter)
@UseInterceptors(ResponseInterceptor)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): User {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAllUsers(@Query() queryFilter: QueryUserFilterDto): User[] {
        return this.usersService.findAll(queryFilter);
    }

    @Get(':id')
    findOneUser(@Param('id', ParseIntPipe) id: number): User {
        if (id !== 1) throw new HttpException('Usuário não encontrado', 404);
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): User {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number): void {
        return this.usersService.remove(id);
    }
}