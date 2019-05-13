import * as jwt from 'jsonwebtoken'

/**jwt类 */
export class JwtokenTool {
    /**创建token */
    static async createJwtoken(parms): Promise<string> {
        var token = await jwt.sign(parms, "huachaojie123", {
            expiresIn: 60  //* 60 * 24  // 24小时过期
        })
        return token;
    }
    /**验证token */
    static async jwtVerify(token: string): Promise<any> {
        let data = await jwt.verify(token, "huachaojie123");
        console.log(data)
        return data;
    }
}