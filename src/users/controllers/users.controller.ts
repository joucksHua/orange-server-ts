import { Controller, Get, Post, Put, Delete, Param, Res, HttpException, HttpStatus, Body } from '@nestjs/common';
import { User } from '../interfaces/user.interface'
import { UsersService } from '../services/users.service';
import { UserIdPipe } from '../pipes/user-id.pipe';
import { CreateUserDto } from '../dtos/create-user.dto'
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @Get('getAll')
    async findAll(): Promise<User[]> {

        return await this.usersService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id', new UserIdPipe()) id): Promise<User> {

        return await this.usersService.findOne(id);
    }
    @Post('create')
    async create(@Body() user: CreateUserDto) {
        return await this.usersService.create(user);
    }

    // @Put()
    // async edit() {
    //     return await this.usersService.edit();
    // }

    // @Delete()
    // async remove() {
    //     return await this.usersService.remove();
    // }
}
