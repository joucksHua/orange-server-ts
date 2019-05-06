import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User as UserModel } from '../entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],  //注入typeorm
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }