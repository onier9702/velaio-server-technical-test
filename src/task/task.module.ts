import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';

import { Task } from './entities/task.entity';
import { Person } from './entities/person.entity';
import { Ability } from './entities/ability.entity';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [

    TypeOrmModule.forFeature([ Task, Person, Ability ]),

  ],
})
export class TaskModule {}
