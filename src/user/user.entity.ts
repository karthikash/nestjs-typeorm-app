import { TaskEntity } from "src/task/task.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./user.enumerator";

@Entity('Users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 26 })
    name: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @Column({ type: "varchar", nullable: false })
    salt: string;

    @Column({ type: "date" })
    dob: Date;

    @Column({ type: "enum", enum: Gender })
    gender: string;

    @Column({ type: "text" })
    mobile: number;

    @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", nullable: true, default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToMany(type => TaskEntity, task => task.user, { eager: true, onDelete: 'CASCADE' })
    tasks: TaskEntity[];
}