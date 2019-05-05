import { Injectable } from '@nestjs/common';
import { MysqlDB } from './helper/mysql_db'
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!111';
  }
  getComments() {
    return "111111111111";
  }
}
