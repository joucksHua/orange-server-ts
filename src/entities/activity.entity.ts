import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { LikeWorks } from './likeWorks.entity';
@Entity("Activitys")
export class Activity extends BaseEntity {
    /**用户 */
    @ManyToOne(type => User, user => user.activity)
    user: User;
    /**用户 */
    @OneToOne(type => LikeWorks, like_works => like_works.activity)
    like_works: LikeWorks;
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
    /**图片类型 */
    @Column("varchar", { length: 200, default: "" })
    img_type: string
    /**图片宽度 */
    @Column("int", { default: 0 })
    img_width: number
    /**图片高度 */
    @Column("int", { default: 0 })
    img_height: number
    /**图片封禁状态  */
    @Column("int", { default: 0 })
    img_ban: number
    /**类型  0活动类型  1图片类型 2图文*/
    @Column("int", { default: 0 })
    type: number

    img_mainAxisCellCount: number
}