import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.enumerator";

@Entity('Tasks')
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar" })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', enum: TaskStatus })
    status: string;

    @ManyToOne(type => UserEntity, user => user.tasks, { eager: false, onDelete: 'CASCADE' })
    user: UserEntity;

    @Column('uuid')
    userId: string;
}