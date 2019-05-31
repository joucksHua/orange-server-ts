import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User as UserModel, User } from '../entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/entities/userInfo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel, UserInfo])],  //注入typeorm
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }