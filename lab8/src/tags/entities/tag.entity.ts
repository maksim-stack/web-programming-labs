import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Task } from '../../tasks/entities/task.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => Task, (task) => task.tags, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tasks: Task[];
}