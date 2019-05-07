import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity("Activitys")
export class Activity extends BaseEntity {
    //关联用户id 发布人
    @Column("int")
    uid: number
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
}