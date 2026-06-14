import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { Task } from './entities/task.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      Tag,
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
