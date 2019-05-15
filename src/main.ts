import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import express = require("express");
// import mongoose = require('mongoose');
// const Sequelize = require('sequelize');
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiParamsValidationPipe } from './common/pipes/api-params-validation.pipe';
import { RolesGuard } from './common/filters/roles.guard';
// const nconf = require('../config/nconf')

// async function bootstrap() {
// const app = await NestFactory.create(AppModule);
// await app.listen(3000);
// }
// bootstrap();
async function main() {
  const server = express();
  // let err, _ = await mongoose.connect(nconf.db, { useNewUrlParser: true })
  // if (err) {
  //   console.log('Connection Mongodb Error:' + err)
  // } else {
  //   console.log("数据库连接成功：" + nconf.db);
  // }
  const app = await NestFactory.create(AppModule, server);
  app.useGlobalFilters(new HttpExceptionFilter())  //添加过滤器
  app.useGlobalPipes(new ApiParamsValidationPipe()); //参数类验证
  app.useGlobalGuards(new RolesGuard(new Reflector())); //token 权限验证
  app.listen(3333, "192.168.31.187")
}
main()