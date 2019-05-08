import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from 'nestjs-redis'
import { UsersModule } from './app/users.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import * as Path from 'path';
import { activityModule } from './app/activity.module';

const Orm = (): DynamicModule => {
  const config = new ConfigService(`env/${process.env.NODE_ENV}.env`);
  // console.log("------",process.env.NODE_ENV)
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: config.databaseHost,
    port: config.databasePort,
    username: config.databaseUserName,
    password: config.databasePassword,
    database: config.databaseName,
    cache: config.databaseCache,
    entities: [Path.resolve(__dirname, `../${config.ormLoadingPath}/**/*.entity{.ts,.js}`)],
    subscribers: [Path.resolve(__dirname, `../${config.ormLoadingPath}/**/*.entity{.ts,.js}`)],
    synchronize: config.databaseSynchronize,
    dropSchema: config.databaseDropSchema
  });
}
const RedisConfModule = (): DynamicModule => {
  const config = new ConfigService(`env/${process.env.NODE_ENV}.env`);
  return RedisModule.register({
    host: config.redisHost,
    port: config.redisPort,
    // db: config.redisDb,
    // password: config.redisPwd,
    // name: config.redisName
    // keyPrefix: process.env.REDIS_PRIFIX,  //目录
  });
}
@Module({
  imports: [
    RedisConfModule(),
    Orm(),
    UsersModule,
    activityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
