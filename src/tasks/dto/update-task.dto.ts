import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString, IsOptional, MaxLength, IsIn } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsOptional()
    @IsIn(['low', 'medium', 'high'])
    priority?: 'low' | 'medium' | 'high';

    @IsOptional()
    @IsIn(['todo', 'in-progress', 'done'])
    status?: 'todo' | 'in-progress' | 'done';
}
