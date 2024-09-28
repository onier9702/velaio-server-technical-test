import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import { Ability } from "./ability.entity";

@Entity('person')
export class Person {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    fullname: string;

    @Column({ nullable: false })
    age: number;

    @ManyToOne(
        () => Task,
        task => task.persons,
        { nullable: false },
    )
    task: Task;

    @OneToMany(
        () => Ability,
        ability => ability.person,
        { eager: true, cascade: ['insert'] },
    )
    abilities: Ability[];

}
