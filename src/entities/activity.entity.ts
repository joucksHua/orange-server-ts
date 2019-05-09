import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
@Entity("Activitys")
export class Activity extends BaseEntity {
    /**用户 */
    @ManyToOne(type => User, user => user.activity)
    user: User;
    //内容
    @Column("varchar")
    content: string
    //点赞数
    @Column("int", { default: 0 })
    like: number
    //评论数
    @Column("int", { default: 0 })
    comment_num: number
    //状态 0正常推荐  1私人可见  2不上推荐   -1封禁
    @Column("int", { default: 0 })
    status: number
    @Column("decimal", { default: 0 })
    lng: number
    @Column("decimal", { default: 0 })
    lat: number
    /**图片地址 */
    @Column("varchar", { length: 500 })
    img_url: string
    /**类型  0活动类型  1图片类型 2图文*/
    @Column("int", { default: 0 })
    type: number
}