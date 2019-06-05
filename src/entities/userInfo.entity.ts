import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity("UserInfo")
export class UserInfo extends BaseEntity {
    //橘觅id
    @Column("varchar")
    phone: string
    @Column("varchar")
    wechat: string
    @Column("varchar")
    faces: string
    @Column("varchar")
    avatar: string
    @Column("int", { default: 0 })
    age: number
    @Column("int", { default: 0 })
    height: number
    @Column("int", { default: 0 })
    weight: number
    @Column("varchar")
    bio: string
    nickname: string
    @Column("varchar")
    code: string
    @Column("varchar")
    name: string
    @Column("varchar")
    a_photo: string
    @Column("varchar")
    b_photo: string
    @Column("varchar")
    city: string
    @Column("varchar")
    province: string
    @Column("int", { default: 1 })
    sex:number
}