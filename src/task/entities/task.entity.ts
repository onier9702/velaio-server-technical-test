import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { StatusTask } from '../../enum/status-task.enum';
import { Person } from "./person.entity";

@Entity('task')
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({
        nullable: false,
        transformer: {
            to: (value: string) => new Date(value),
            from: (value: Date) => value,
        },
    })
    date: Date;

    @Column({ nullable: false, default: StatusTask.PENDING })
    status: StatusTask;

    @OneToMany(
        () => Person,
        person => person.task,
        { eager: true, cascade: ['insert'] },
    )
    persons: Person[];

}
