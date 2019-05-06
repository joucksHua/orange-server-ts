
import * as nodemailer from "nodemailer";
import { ConfigService } from 'src/config/config.service';

let transporter: any = null;

export class MailerTool {
    constructor() {
        if (transporter == null) {
            const config = new ConfigService(`env/${process.env.NODE_ENV}.env`);
            console.log("初始----", config.emailHost, config.emailService, config.emailPort, config.emailAuth)
            transporter = nodemailer.createTransport({
                host: config.emailHost,
                service: config.emailService,
                port: config.emailPort,
                auth: config.emailAuth
            });
        }
    }
    async sendRegisterMailFunc(code: number, to: string): Promise<any> {
        let mailOptions = {
            from: "邮箱 <jieggi@126.com>", // sender address
            to: to, // list of receivers
            subject: "橘觅app注册验证码", // Subject line
            html: '橘觅验证码:' + code // html body
        };
        let data = await this._sendEmail(mailOptions, transporter);
        return data;
    }
    private _sendEmail(mailOptions: Object, transporter): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(mailOptions)
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error)
                }
                console.log('Message sent: ', info.response);
                resolve(info.response)
            });
        })
    }
}
