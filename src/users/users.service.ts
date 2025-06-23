import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserFilterDto } from './dto/query-user-filter.dto';
import {PrismaService} from "../prisma/prisma.service";
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: createUserDto as Prisma.UserCreateInput,
        });
    }

    async findAll(query: QueryUserFilterDto) {
        const { username, steam_username, page = 1 } = query;

        const filters: Prisma.UserWhereInput = {
            ...(username && {
                name: {
                    contains: username,
                    mode: 'insensitive',
                } as Prisma.StringFilter,
            }),
            ...(steam_username && {
                steam_username: {
                    contains: steam_username,
                    mode: 'insensitive',
                } as Prisma.StringFilter,
            }),
        };

        return this.prisma.user.findMany({
            where: filters,
            skip: (page - 1) * 5,
            take: 5,
        });
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.findOne(id);

        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        await this.prisma.user.delete({
            where: { id },
        });
    }
}