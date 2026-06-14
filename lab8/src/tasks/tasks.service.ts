import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: 
      Repository<Task>,

    @InjectRepository(Tag)
    private readonly tagsRepository:
      Repository<Tag>,
  ){}

  findAll(){
    return this.tasksRepository.find({
      relations:{
        tags:true
      }
    });
  }

  findOne(id:number){
    return this.tasksRepository.findOne({
      where:{id},
      relations:{
        tags:true
      }
    });
  }

  async findByStatus(
    status: TaskStatus,
  ): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { status },
      relations: {
        tags: true,
      },
    });
  }
  

  async create(
    dto: CreateTaskDto,
  ): Promise<Task> {
    let tags: Tag[] = [];

    if (dto.tagIds?.length) {
      tags = 
        await this.tagsRepository.findBy({
          id: In(dto.tagIds),
        });
    }

    const task = 
      this.tasksRepository.create({
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        status: "todo",
        tags,
      });

    return this.tasksRepository.save(task);
  }

  async remove(
    id: number,
  ): Promise<boolean> {

    const result =
      await this.tasksRepository.delete(id);

    return result.affected! > 0;
  }

  async update(
    id: number,
    dto: UpdateTaskDto,
  ): Promise<Task | null> {
    const task =
      await this.findOne(id);

    if (!task) {
      return null;
    }
    Object.assign(task, dto);
    return this.tasksRepository.save(task);
  }
}