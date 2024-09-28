import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./person.entity";


@Entity('ability')
export class Ability {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    ability: string;

    @ManyToOne(
        () => Person,
        person => person.abilities,
        { nullable: false },
    )
    person: Person;

}
