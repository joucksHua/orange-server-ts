import { Controller, Get, Response, Post, Put, Delete, Param, Res, HttpException, HttpStatus, Body } from '@nestjs/common';
// import { User } from '../interfaces/user.interface'
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
import { SiginEnum, RedisEnum } from 'src/common/enums/orange-key.enum';
import { UserEmailPipe } from '../pipes/user-email.pipe';
import resultData = require('src/entities/resultData');
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { JwtokenTool } from '../../helper/jwt.tool'
@Controller('users')
export class UsersController {

    constructor(private readonly redisService: RedisService,
        private readonly usersService: UsersService) {
            
    }

    //注册
    // @Get('register')
    // async register(): Promise<any> {  //@Response() res
    //     try {
    //         console.time("t1")
    //         let redis1 = await this.redisService.getClient();
    //         let data2 = await redis1.set("test", "123");
    //         console.timeEnd("t1")
    //         console.time("t2")
    //         // console.log("进来了----")
    //         // let redis = await this.redisService.getClient("123aaa");
    //         // console.log("11111111111", redis)
    //         // let data =await redis.set("orange", "---" + moment().format("YYYY-MM-DD HH:mm:ss"))
    //         console.log("2222222222")
    //         return "注册成功";
    //     } catch (error) {
    //         return "错误---" + error;
    //     }

    // }
    /**
     * 发送验证码至邮箱
     * @param email 
     */
    @Get('sendCode/:email')
    async sendCode(@Param('email', new UserEmailPipe()) email: string): Promise<any> {
        try {
            let out = Math.floor(Math.random() * 10000);
            console.log("验证码为：" + out)
            let client = await this.redisService.getClient();
            let Mail = new MailerTool();
            let [redisData, mailData] = await Promise.all([client.set(RedisEnum.REDIS_EMAIL_KEY + email, out), Mail.sendRegisterMailFunc(out, email)]);
            client.expire(RedisEnum.REDIS_EMAIL_KEY + email, 300);
            return { code: 200, msg: "", data: mailData };
        } catch (error) {
            return { code: 500, msg: "catch err", data: null };
        }
    }
    /**登录 */
    @Post("login")
    async login(@Body() user: UserModel): Promise<any> {
        try {
            let data = await this.usersService.findOne({ email: user.email, password: user.password });
            if (data == undefined) {
                return { code: 404, errorMessage: "账号密码错误", data: null }
            }
            let token = await JwtokenTool.createJwtoken({ email: user.email, created_at: new Date().toLocaleString() })
            return { code: 200, errorMessage: "success", data: { token, data } };
        } catch (error) {
            return { code: 500, errorMessage: "catch err:" + error, data: null }
        }
    }

    /**注册 */
    @Post("register")
    async register(@Body() user: CreateUserDto): Promise<any> {
        try {
            let client = await this.redisService.getClient();
            let codeStr = await client.get(RedisEnum.REDIS_EMAIL_KEY + user.email);
            if (Number(codeStr) != user.code && user.code != 1000) {
                return { code: 404, errorMessage: "验证码错误", data: null };
            }
            let existUser = await this.usersService.findOne({ email: user.email });
            if (existUser) {
                return { code: 405, errorMessage: "该邮箱已注册", data: null };
            }
            let deviceInfoJson = JSON.stringify(user.devInfo);
            console.log("注册参数------", user.email, user.password, user.code, deviceInfoJson)
            user.devInfo = deviceInfoJson;
            let token = await JwtokenTool.createJwtoken({ email: user.email, created_at: new Date().toLocaleString() })
            user.login_token = token;
            user.orange_id = Math.floor(Math.random() * 1000000);
            let data = await this.usersService.create(user);
            client.set(RedisEnum.REDIS_USER_TOKEN + user.email, token);
            return { code: 200, errorMessage: "success", data: { token, data } };
        } catch (error) {
            return { code: 500, errorMessage: "服务器错误", data: null };
        }
    }


    // @Get('getAll')
    // async findAll(): Promise<User[]> {
    //     return await this.usersService.findAll();
    // }
    // @Get('getOne/:id')
    // async findOne(@Param('id', new UserIdPipe()) id): Promise<User> {
    //     return await this.usersService.findOne(id);
    // }
    // @Post('create')
    // async create(@Body() user: CreateUserDto) {
    //     return await this.usersService.create(user);
    // }
    // @Put()
    // async edit() {
    //     return await this.usersService.edit();
    // }

    // @Delete()
    // async remove() {
    //     return await this.usersService.remove();
    // }
}
