import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ability } from './entities/ability.entity';
import { Person } from './entities/person.entity';
import { Task } from './entities/task.entity';

import { CreateTaskDto, PersonDto } from './dto/create-task.dto';
import { PaginationDto } from './dto/pagination.dto';

import { IMessage } from '../interfaces/message';
import { ICountAndTotalTask } from '../interfaces/task';

import { StatusTask } from '../enum/status-task.enum';

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
        msg: 'Tarea creada correctamente.',
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

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<ICountAndTotalTask> {

    const { 
      limit = 10,
      offset = 0,
      name = null,
      status = null,
      initDate = null,
      endDate = null,
    } = paginationDto;

    try {

      const qb = this.taskRepository.createQueryBuilder('t')
        .leftJoinAndSelect('t.persons', 'p')
        .leftJoinAndSelect('p.abilities', 'a')
        .orderBy('t.status', 'DESC');

      if (name) {
        qb.andWhere('t.name LIKE :name', { name: `%${name}%` });
      }

      if (initDate) {
        qb.andWhere('t.date >= :initDate', { initDate });
      }

      if (endDate) {
          qb.andWhere('t.date <= :endDate', { endDate });
      }

      if (status) {
        qb.andWhere('t.status = :status', { status });
      }

      const [ tasks, total ] = await qb
        .take(limit)
        .skip(offset)
        .getManyAndCount();

      return {
        count: total,
        tasks: tasks,
      };
      
    } catch (error) {
      this.handleErrors(error);
    }
    
  }

  async findOne(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOneBy({id});
      if (!task) {
        throw new NotFoundException(`Tarea con ID: ${id} no encontrada en base datos.`);
      }

      return task;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  // set task as completed
  async update(id: number): Promise<IMessage> {

    try {
      await this.findOne(id);
      await this.taskRepository.update(
        { id },
        { status: StatusTask.COMPLETED },  
      );

      return {
        msg: 'Tarea marcada como completada correctamente',
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

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
