import { Module } from '@nestjs/common';
import { ActivityController } from './controllers/activity.controller';
import { UsersService } from './services/users.service';
import { Activity } from '../entities/activity.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityService } from './services/activity.service';

@Module({
    imports: [TypeOrmModule.forFeature([Activity])],  //注入typeorm
    controllers: [ActivityController],
    providers: [ActivityService],
})
export class activityModule { }