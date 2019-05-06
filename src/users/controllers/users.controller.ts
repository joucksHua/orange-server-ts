import { Controller, Get, Response, Post, Put, Delete, Param, Res, HttpException, HttpStatus, Body } from '@nestjs/common';
import { User } from '../interfaces/user.interface'
import { UsersService } from '../services/users.service';
import { UserIdPipe } from '../pipes/user-id.pipe';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto'
import { User as UserModel } from '../../entities/user.entity'
import { Repository } from 'typeorm';
import { RedisService } from 'nestjs-redis';
import * as moment from 'moment';
import { RedisTool } from 'src/helper/redis.tool';
import { async } from 'rxjs/internal/scheduler/async';
import { IsPhoneNumber, IsMobilePhone, Validator } from 'class-validator';
import { UserPhonePipe } from '../pipes/user-phone.pipe';
import { MailerTool } from 'src/helper/mail.tool';
import { ORangeEnum } from 'src/common/enums/orange-key.enum';
import { UserEmailPipe } from '../pipes/user-email.pipe';
@Controller('users')
export class UsersController {

    constructor(@InjectRepository(UserModel)
    private readonly UserRepository: Repository<UserModel>,
        private readonly redisService: RedisService,
        private readonly usersService: UsersService) {
    }

    //注册
    @Get('register')
    async register(): Promise<any> {  //@Response() res
        try {
            console.time("t1")
            let redis1 = await this.redisService.getClient();
            let data2 = await redis1.set("test", "123");
            console.timeEnd("t1")
            console.time("t2")
            // console.log("进来了----")
            // let redis = await this.redisService.getClient("123aaa");
            // console.log("11111111111", redis)
            // let data =await redis.set("orange", "---" + moment().format("YYYY-MM-DD HH:mm:ss"))
            console.log("2222222222")
            return "注册成功";
        } catch (error) {
            return "错误---" + error;
        }

    }
    @Get('sendCode/:email')
    async sendCode(@Param('email', new UserEmailPipe()) email): Promise<any> {
        let out = Math.floor(Math.random() * 10000);
        let client = await this.redisService.getClient();
        let Mail = new MailerTool();
        let [redisData, mailData] = await Promise.all([client.set(ORangeEnum.REDIS_EMAIL_KEY + email, out), Mail.sendRegisterMailFunc(out, email)]);
        return "手机号" + redisData + "-mail-" + mailData;
    }

    @Get('getAll')
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }
    @Get('getOne/:id')
    async findOne(@Param('id', new UserIdPipe()) id): Promise<User> {
        return await this.usersService.findOne(id);
    }
    @Post('create')
    async create(@Body() user: CreateUserDto) {
        return await this.usersService.create(user);
    }
    @Get("createTb")
    async createTb() {
        let user = new UserModel();
        // user.name = 'novak';
        // user.age = 20;
        // user.address = 'shanghai';
        let data = await this.UserRepository.save(user);
        console.log("保存结果----", data);
        return data;
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
