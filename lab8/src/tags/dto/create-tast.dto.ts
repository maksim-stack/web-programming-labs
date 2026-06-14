import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  MaxLength,
  IsArray,
  IsInt,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsIn(['low', 'medium', 'high'])
  priority: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}