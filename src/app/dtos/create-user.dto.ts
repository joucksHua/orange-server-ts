import { User as UserModel } from '../../entities/user.entity'
import { IsString, IsInt, IsNotEmpty, Min, Max, IsMobilePhone, IsEmail, MinLength } from 'class-validator';
import { ApiErrorCode } from "../../common/enums/api-error-code.enum";

export class CreateUserDto implements UserModel {
    login_token: string;
    created_at: Date;
    updated_at: Date;
    is_delete: number;
    devInfo: string;
    // @IsInt({ message: '用户ID必须是整数', context: { errorCode: ApiErrorCode.USER_ID_INVALID } })
    // @Min(1, { message: '用户ID必须大于等于1', context: { errorCode: ApiErrorCode.USER_ID_INVALID } })
    readonly id: number;
    readonly age: number;
    // @IsInt({ message: '橘觅ID必须是整数', context: { errorCode: ApiErrorCode.USER_ID_INVALID } })
    // @Min(5, { message: '橘觅ID必须大于等于1', context: { errorCode: ApiErrorCode.USER_ID_INVALID } })
     orange_id: number;
    // @IsMobilePhone('zh-CN', { message: '手机号无效', context: { errorCode: ApiErrorCode.USER_PHONE_INVALID } })
    readonly phone: string;
    readonly email: string;
    @MinLength(6, { message: '密码长度最少6位', context: { errorCode: ApiErrorCode.USER_ERR_INVALID } })
    readonly password: string;
    // @Min(1, { message: '用户名必须大于1位', context: { errorCode: ApiErrorCode.USER_ERR_INVALID } })
    readonly nickname: string;
    readonly avatar: string;
    readonly avatar_status: number;
    readonly card_background_img: string;
    readonly level: number;
    readonly star: number;
    readonly i_like: number;
    readonly bereply_count: number;
    readonly bebrowsed_count: number;
    readonly follower_count: number;
    readonly following_count: number;
    readonly current_city_name: string;
    readonly current_province: string;
    readonly login_count: number;
    readonly login_at: Date;
    readonly logout_at: Date;
    readonly loc_lat: number;
    readonly loc_lng: number;
    readonly height: number;
    readonly weight: number;
    readonly interest: string;
    readonly hot_num: number;
    readonly user_status: number;
    readonly sign_day: number;
    readonly sign_day_at: Date;
    readonly version: string;
    readonly code: number;
    /**
     * 1注册 2 登录
     */
    readonly type: number;
}