
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { JwtokenTool } from 'src/helper/jwt.tool';
/**权限过滤 */
@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const verifyToken = this.reflector.get<Boolean>('verifyToken', context.getHandler());
        console.log('verifyToken:', verifyToken)
        if(verifyToken){
            let hedaers = request.headers
            console.log(hedaers)
            // JwtokenTool.jwtVerify()
        }
        
        // console.log("验证方法-----", request.headers)
        // if (roles && roles.length > 0) {
        //     // await JwtokenTool.jwtVerify()
        //     // 需要校验用户权限
        //     if (roles.some(item => 'user' == item)) {
        //         return true;
        //     }
        // }
        return true;
    }
}