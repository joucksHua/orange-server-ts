import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Activity } from './activity.entity';
@Entity("LikeWorks")
export class LikeWorks extends BaseEntity {
    /**用户 */
    @ManyToOne(type => User, user => user.activity)
    user: User;
    /**喜欢的作品 */
    @OneToOne(type => Activity, activity => activity.like_works)
    activity: Activity
}