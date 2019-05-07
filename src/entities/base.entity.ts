import { Column, PrimaryGeneratedColumn } from 'typeorm';
export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column("date", { nullable: true })
    created_at: Date
    @Column("date", { nullable: true })
    updated_at: Date
    @Column("int", { default: 0 })
    is_delete: number
}