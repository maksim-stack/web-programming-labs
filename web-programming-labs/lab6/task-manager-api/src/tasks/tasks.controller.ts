import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import type { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Buy groceries',
      description: 'Milk, Bread, Eggs',
      status: 'pending',
      priority: 'high',
      createdAt: new Date('2026-04-08T10:00:00.000Z').toISOString(),
    },
    {
      id: '2',
      title: 'Clean the house',
      description: 'Living room and kitchen',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date('2026-04-07T15:30:00.000Z').toISOString(),
    },
    {
      id: '3',
      title: 'Read a book',
      description: 'Finish reading NestJS guide',
      status: 'done',
      priority: 'low',
      createdAt: new Date('2026-04-06T20:00:00.000Z').toISOString(),
    },
  ];

  // GET /tasks
  @Get()
  findAll(): Task[] {
    return this.tasks;
  }

  // GET /tasks/search?status=pending
  @Get("search")
  findByStatus(@Query("status") status?: string): Task[] {
    if (!status) {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.status === status);
  }

  // GET /tasks/:id
  @Get(":id")
  findOne(@Param("id") id: string): Task | { message: string } {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      return { message: `Task with id ${id} not found` };
    }
    return task;
  }

  // POST /tasks
  @Post()
  create(@Body() dto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description || '',
      status: 'pending',
      priority: dto.priority,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  // DELETE /tasks/:id
  @Delete(":id")
  remove(@Param("id") id: string): { message: string } {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      return { message: `Task with id ${id} not found` };
    }
    this.tasks.splice(index, 1);
    return { message: `Task with id ${id} deleted successfully` };
  }
}