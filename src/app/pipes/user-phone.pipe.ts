import { ArgumentMetadata, Injectable, PipeTransform, HttpStatus } from '@nestjs/common';
import { ApiException } from 'src/common/exceptions/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { Validator } from 'class-validator';

@Injectable()
export class UserPhonePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const validator = new Validator();
        let flag = validator.isMobilePhone(value, "zh-CN")
        if (typeof value !== 'string' || !flag) {
            throw new ApiException('用户Phone无效', ApiErrorCode.USER_PHONE_INVALID, HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}
