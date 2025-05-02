import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserFilterDto } from './dto/query-user-filter.dto';
import {User} from "./user.interface";

@Injectable()
export class UsersService {
    private users: User[] = [];

    create(createUserDto: CreateUserDto): User {
        const newUser: User = {
            ...createUserDto,
            id: this.users.length + 1,
        };
        this.users.push(newUser);
        return newUser;
    }

    findAll(query: QueryUserFilterDto): User[] {
        const { username, steam_username, page } = query;
        let results = this.users;

        if (username) {
            results = results.filter((user) =>
                user.username.toLowerCase().includes(username.toLowerCase()),
            );
        }

        if (steam_username) {
            results = results.filter((user) =>
                user.steam_username
                    .toLowerCase()
                    .includes(steam_username.toLowerCase()),
            );
        }

        const pageSize = 5;
        const start = ((page || 1) - 1) * pageSize;

        return results.slice(start, start + pageSize);
    }

    findOne(id: number): User {
        const user = this.users.find((u) => u.id === id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto): User {
        const index = this.users.findIndex((u) => u.id === id);
        if (index === -1) throw new NotFoundException('User not found');

        this.users[index] = { ...this.users[index], ...updateUserDto };
        return this.users[index];
    }

    remove(id: number): void {
        const index = this.users.findIndex((u) => u.id === id);
        if (index === -1) throw new NotFoundException('User not found');

        this.users.splice(index, 1);
    }
}