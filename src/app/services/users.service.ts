import { Injectable } from '@nestjs/common';
// import { User } from '../interfaces/user.interface';
import { IUserService } from '../interfaces/user-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserModel } from '../../entities/user.entity'
import { Repository } from 'typeorm';
import moment = require('moment');
import { UserInfo } from 'src/entities/userInfo.entity';

@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectRepository(UserModel)
        private readonly UserRepository: Repository<UserModel>,
        @InjectRepository(UserInfo)
        private readonly UserInfoRepository: Repository<UserInfo>) {

    }
    private static users: UserModel[] = [
        // { id: 1, name: '小明', age: 18 },
        // { id: 2, name: '小红', age: 16 },
        // { id: 3, name: '小壮', age: 20 },
    ];
    async findAll(): Promise<UserModel[]> {
        return UsersService.users;
    }
    /**
     * 获取一个用户
     * @param parms 
     */
    async findOne(parms: any): Promise<UserModel> {
        let user = await this.UserRepository.findOne(parms);
        return user;
    }
    /**
     * 创建一个用户
     * @param user 
     */
    async create(user: UserModel): Promise<UserModel> {
        let time = new Date();
        user.created_at = time;
        user.login_count = 0;
        user.login_at = time;
        user.updated_at = time;
        return await this.UserRepository.save(user);
    }
    /**批量添加用户信息 */
    async addUserInfos(user: Array<UserInfo>): Promise<any> {
        return await this.UserInfoRepository.insert(user);
    }

    async edit(user: UserModel): Promise<UserModel> {
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