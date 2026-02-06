import { IsDateString, IsEnum, IsIn, IsInt, isNotEmpty, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Priority } from "./priority.dto";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string

  @IsString()
  @IsNotEmpty()
  description?: string

  @IsEnum(Priority)
  @IsNotEmpty()
  priority: Priority
  
  @IsOptional()
  @IsDateString()
  expectedFinishDate?: Date

  @IsInt()
  @IsNotEmpty()
  listId: number
}
