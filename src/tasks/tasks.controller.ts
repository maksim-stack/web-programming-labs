import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task, TaskStatus } from './entities/task.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('search')
  findByStatus(@Query('status') status: TaskStatus): Task[] {
    return this.tasksService.findByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    const task = this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Завдання #${id} не знайдено`);
    }
    return task;
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Task {
    const update = this.tasksService.update(id, dto);
    if (!update) {
      throw new NotFoundException(`Завдання #${id} не знайдено`);
    }
    return update;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    const removed = this.tasksService.remove(id);
    if (!removed) {
      throw new NotFoundException(`Завдання #${id} не знайдено`);
    }
  }
}
