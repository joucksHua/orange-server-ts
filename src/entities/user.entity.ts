import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
// import { Company } from './company.entity'
@Entity("Users")
export class User extends BaseEntity {
    //橘觅id
    @Column("int", { unique: true })
    orange_id: number
    //手机
    @Column("varchar", { length: 25, unique: true })
    phone: string
    //邮箱
    @Column("varchar", { length: 25, unique: true })
    email: string
    //密码
    @Column("varchar", { length: 20 })
    password: string
    //名称
    @Column("varchar", { length: 25 })
    nickname: string
    //头像
    @Column("varchar", { length: 255 })
    avatar: string
    //头像状态  
    @Column("int", { default: 0 })
    avatar_status: number
    //主页背景图
    @Column("varchar", { length: 255 })
    card_background_img: string
    //等级
    @Column("int")
    level: number
    //被点赞或喜欢次数
    @Column("int")
    star: number
    //点赞别人总数
    @Column("int")
    i_like: number
    //被评论次数
    @Column("int")
    bereply_count: number
    //被浏览主页次数
    @Column("int")
    bebrowsed_count: number
    //粉丝数
    @Column("int")
    follower_count: number
    //关注数
    @Column("int")
    following_count: number
    //当前哪个城市
    @Column("varchar")
    current_city_name: string
    //当前在哪个省份
    @Column("varchar")
    current_province: string
    //登录次数
    @Column("int")
    login_count: number
    //登录时间
    @Column("date")
    login_at: Date
    //登出时间
    @Column("date")
    logout_at: Date
    //纬度
    @Column("decimal")
    loc_lat: number
    //经度
    @Column("decimal")
    loc_lng: number
    //年龄
    @Column("int")
    age: number
    //身高
    @Column("int")
    height: number
    //体重
    @Column("int")
    weight: number
    //爱好
    @Column("varchar")
    interest: string
    //热度
    @Column("int")
    hot_num: number
    //用户状态  0正常
    @Column("int", { default: 0 })
    user_status: number
    //签到天数
    @Column("int")
    sign_day: number
    //最后签到时间
    @Column("date")
    sign_day_at: Date
    //用户版本
    @Column("varchar")
    version: string
    // @ManyToOne(type => Company, company => company.employees, { cascade: true })
    // @JoinTable()
    // company: Company
}