import { ReflectMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);
/**是否验证token 默认true，验证 */
export const VerifyToken = (off: boolean = true) => ReflectMetadata('verifyToken', off);