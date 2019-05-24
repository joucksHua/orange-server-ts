import { Module } from '@nestjs/common';
import { ActivityController } from './controllers/activity.controller';
import { UsersService } from './services/users.service';
import { Activity } from '../entities/activity.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityService } from './services/activity.service';
import { User } from 'src/entities/user.entity';
import { LikeWorks } from 'src/entities/likeWorks.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Activity, User,LikeWorks])],  //注入typeorm
    controllers: [ActivityController],
    providers: [ActivityService, UsersService],
})
export class activityModule { }