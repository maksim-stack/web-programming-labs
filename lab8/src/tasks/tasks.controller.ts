import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task, TaskStatus } from './entities/task.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
    async findAll(): Promise<Task[]>
    {
      return this.tasksService.findAll();
    }

  @Get('search')
  async findByStatus(@Query('status') status: TaskStatus) {
    return this.tasksService.findByStatus(status);
  }

  @Get(':id')
  async findOne(
  @Param('id') id:string
  ): Promise<Task | null>
  {
    return this.tasksService.findOne(+id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const update = this.tasksService.update(+id, dto);
    if (!update) {
      throw new NotFoundException(`Завдання #${id} не знайдено`);
    }
    return update;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const removed = this.tasksService.remove(+id);
    if (!removed) {
      throw new NotFoundException(`Завдання #${id} не знайдено`);
    }
  }
}
