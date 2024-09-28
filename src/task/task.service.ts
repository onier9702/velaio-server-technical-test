import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ability } from './entities/ability.entity';
import { Person } from './entities/person.entity';
import { Task } from './entities/task.entity';

import { CreateTaskDto, PersonDto } from './dto/create-task.dto';
import { IMessage } from '../interfaces/message';

@Injectable()
export class TaskService {

  constructor(

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,

    @InjectRepository(Ability)
    private readonly abilityRepository: Repository<Ability>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<IMessage> {
    
    const { name, date, persons = [] } = createTaskDto;

    try {

      // validate person name not duplicated
      this.validatePersonNameDuplicity(persons);

      // validate task name
      const existTaskName = await this.taskRepository.findOneBy({name});
      if (existTaskName) {
        throw new BadRequestException(`Tarea con nombre: ${name} ya existe en la base datos`);
      }
      
      const listPersons = []; // to create persons
      for (const person of persons) {
        const { fullname, age, abilities = [] } = person;
        
        const listAbilities = []; // to create abilities
        for (const ability of abilities) {
          listAbilities.push(this.abilityRepository.create({
            ability: ability.ability,
          }));
        }

        const newPerson = this.personRepository.create({
          fullname,
          age,
          abilities: listAbilities,
        });

        listPersons.push(newPerson);
      }

      // create task
      const newTask = this.taskRepository.create({
        name,
        date,
        persons: listPersons,
      });

      await this.taskRepository.save(newTask);

      return {
        msg: 'Tarea creada correctamente',
      }
      
    } catch (error) {
      this.handleErrors(error);
    }

  }

  private validatePersonNameDuplicity(persons: PersonDto[]): void {
    const listPersonNames: string[] = [];

    try {

      for (const person of persons) {
        const { fullname } = person;
        if (listPersonNames.includes(fullname)) {
          throw new BadRequestException(`Duplicidad en nombre de persona: ${fullname}.`);
        }
  
        listPersonNames.push(fullname);
      }
      
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    try {
      
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findOne(id: number) {
    try {
      
    } catch (error) {
      this.handleErrors(error);
    }
  }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} task`;
  // }

  private handleErrors( err: any ) {
    if (err.response.statusCode === 400) {
      throw new BadRequestException(err.response.message);
    }

    console.log('Customize-Error-Task: ', err);
    throw new InternalServerErrorException('Error not handled yet - contact ADMIN');
  }
}
