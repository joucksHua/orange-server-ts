import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { IUserService } from '../interfaces/user-service.interface';

@Injectable()
export class UsersService implements IUserService {
    private static users: User[] = [
        { id: 1, name: '小明', age: 18 },
        { id: 2, name: '小红', age: 16 },
        { id: 3, name: '小壮', age: 20 },
    ];
    async findAll(): Promise<User[]> {
        return UsersService.users;
    }
    async findOne(id: number): Promise<User> {
        return UsersService.users.find(user => user.id == id)
    }
    async create(user: User): Promise<User> {
        UsersService.users.push(user);
        return user;
    }

    async edit(user: User): Promise<User> {
        let index = UsersService.users.findIndex(item => item.id == user.id)

        if (index >= 0) {
            UsersService.users[index] = user;
        }

        return UsersService.users[index];
    }

    async remove(id: number): Promise<boolean> {
        let index = UsersService.users.findIndex(item => item.id == id)

        if (index >= 0) {
            UsersService.users.splice(index, 1);
        }

        return index >= 0;
    }
}