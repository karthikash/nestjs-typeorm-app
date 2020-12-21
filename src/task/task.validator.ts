import { IsEnum, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, ValidateIf } from "class-validator";
import { TaskStatus } from "./task.enumerator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    description: string;
}

export class TaskByIdDto {
    @IsUUID()
    id: string;
}

export class TaskStatusDto {
    @IsEnum(TaskStatus)
    status: string;
}

export class TasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    @IsIn([TaskStatus.OPEN, TaskStatus.PROGRESS, TaskStatus.CLOSED])
    status: string;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}


export class UpdateTaskDto extends CreateTaskDto {
    @ValidateIf(o => !o.description || o.title)
    @IsString()
    @MaxLength(50)
    title: string;

    @ValidateIf(o => !o.title || o.description)
    @IsString()
    @MaxLength(255)
    description: string;
}