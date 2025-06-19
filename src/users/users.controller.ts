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
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserFilterDto } from './dto/query-user-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseInterceptor } from '../response/response.interceptor';
import { CustomExceptionFilter } from '../custom-exception/custom-exception.filter';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@UseFilters(CustomExceptionFilter)
@UseInterceptors(ResponseInterceptor)
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Creates a new user manually' })
    @ApiResponse({ status: 201, description: 'User successfully created' })
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Returns a list of all users (Admin only)' })
    @ApiResponse({ status: 200, description: 'List of users returned' })
    @ApiResponse({ status: 403, description: 'Forbidden: only admins can access this route' })
    findAllUsers(@Query() queryFilter: QueryUserFilterDto): Promise<User[]> {
        return this.usersService.findAll(queryFilter);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Returns a specific user by ID (Admin only)' })
    @ApiResponse({ status: 200, description: 'User data returned' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 403, description: 'Forbidden: only admins can access this route' })
    async findOneUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.usersService.findOne(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Updates a user by ID' })
    @ApiResponse({ status: 200, description: 'User successfully updated' })
    @ApiResponse({ status: 404, description: 'User not found' })
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletes a user by ID' })
    @ApiResponse({ status: 200, description: 'User successfully deleted' })
    @ApiResponse({ status: 404, description: 'User not found' })
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.usersService.remove(id);
    }
}