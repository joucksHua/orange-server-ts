import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Activity } from './activity.entity';
import { LikeWorks } from './likeWorks.entity';
// import { Company } from './company.entity'
@Entity("Users")
export class User extends BaseEntity {
    //橘觅id
    @Column("int", { unique: true })
    orange_id: number
    /**活动 */
    @OneToMany(type => Activity, activity => activity.user)
    activity: Activity[];
    /**喜欢的作品 */
    @OneToMany(type => LikeWorks, like_works => like_works.user)
    like_works: LikeWorks[];
    //手机
    @Column("varchar", { length: 25, nullable: true })
    phone: string
    //邮箱
    @Column("varchar", { length: 25, nullable: true })
    email: string
    //密码
    @Column("varchar", { length: 20, nullable: true })
    password: string
    //名称
    @Column("varchar", { length: 25, nullable: true })
    nickname: string
    //头像
    @Column("varchar", { length: 255, nullable: true })
    avatar: string
    //头像状态  
    @Column("int", { default: 0 })
    avatar_status: number
    //主页背景图
    @Column("varchar", { length: 255, nullable: true })
    card_background_img: string
    //等级
    @Column("int", { default: 0 })
    level: number
    //被点赞或喜欢次数
    @Column("int", { default: 0 })
    star: number
    //点赞别人总数
    @Column("int", { default: 0 })
    i_like: number
    //被评论次数
    @Column("int", { default: 0 })
    bereply_count: number
    //被浏览主页次数
    @Column("int", { default: 0 })
    bebrowsed_count: number
    //粉丝数
    @Column("int", { default: 0 })
    follower_count: number
    //关注数
    @Column("int", { default: 0 })
    following_count: number
    //当前哪个城市
    @Column("varchar", { nullable: true })
    current_city_name: string
    //当前在哪个省份
    @Column("varchar", { nullable: true })
    current_province: string
    /**当前地址 */
    @Column("varchar", { nullable: true })
    current_address: string
    /**登录次数 */
    @Column("int", { default: 0 })
    login_count: number
    //登录时间
    @Column("date", { nullable: true })
    login_at: Date
    //登出时间
    @Column("date", { nullable: true })
    logout_at: Date
    //纬度
    @Column("decimal", { default: 0 })
    loc_lat: number
    //经度
    @Column("decimal", { default: 0 })
    loc_lng: number
    //年龄
    @Column("int", { default: 0 })
    age: number
    //身高
    @Column("int", { default: 0 })
    height: number
    //体重
    @Column("int", { default: 0 })
    weight: number
    //爱好
    @Column("varchar", { nullable: true })
    interest: string
    //热度
    @Column("int", { default: 0 })
    hot_num: number
    //用户状态  0正常
    @Column("int", { default: 0 })
    user_status: number
    //签到天数
    @Column("int", { default: 0 })
    sign_day: number
    //最后签到时间
    @Column("date", { nullable: true })
    sign_day_at: Date
    //用户版本
    @Column("varchar", { nullable: true })
    version: string
    @Column("varchar", { length: 2000 })
    devInfo: string
    /**登录token */
    @Column("varchar", { length: 255 })
    login_token: string

    // @ManyToOne(type => Company, company => company.employees, { cascade: true })
    // @JoinTable()
    // company: Company
}