import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Вивчити Nest.js',
      description: 'Пройти базовий курс',
      status: 'todo',
      priority: 'high',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Зробити ЛР',
      description: 'CRUD API',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Відпочити',
      status: 'done',
      priority: 'low',
      createdAt: new Date(),
    },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((t) => t.status === status)
  }

  findOne(id: string): Task | null {
    return this.tasks.find((t) => t.id === id) ?? null;
  }

  create(dto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.descripyion,
      status: 'todo',
      priority: dto.priority,
      createdAt: new Date(),
    };

    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, dto: UpdateTaskDto): Task | null {
    const task = this.findOne(id);
    if (!task) return null;

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.priority !== undefined) task.priority = dto.priority;
    if (dto.status !== undefined) task.status = dto.status;

    return task;
  }

  remove(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }
}
