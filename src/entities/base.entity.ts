import { Column, PrimaryGeneratedColumn } from 'typeorm';
export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column("date")
    created_at: Date
    @Column("date")
    updated_at: Date
    @Column("int", { default: 0 })
    is_delete: number
}