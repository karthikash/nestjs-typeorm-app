import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto, TaskByIdDto, TasksFilterDto, TaskStatusDto, UpdateTaskDto } from './task.validator';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository: TaskRepository,
    ) { }

    async fetchTasks(
        tasksFilterDto: TasksFilterDto,
        user: UserEntity,
    ): Promise<TaskEntity[]> {
        const tasks = await this.taskRepository.fetchTasks(tasksFilterDto, user);
        if (tasks.length === 0) throw new NotFoundException('No tasks found');
        return tasks;
    }

    async getTaskByID(
        taskByIdDto: TaskByIdDto,
        user: UserEntity
    ): Promise<TaskEntity> {
        const { id } = taskByIdDto;
        const task = await this.taskRepository.findOne({ where: { id, userId: user.id } });
        if (!task) throw new NotFoundException(`Task not found with this id ${id}`);
        return task;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: UserEntity,
    ): Promise<TaskEntity> {
        return await this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(
        taskByIdDto: TaskByIdDto,
        user: UserEntity,
    ): Promise<void> {
        const { id } = taskByIdDto;
        const task = await this.taskRepository.delete({ id, userId: user.id });
        if (task.affected === 0) {
            throw new NotFoundException(`Task not found with this id ${id}`);
        }
    }

    async updateTaskStatus(
        taskByIdDto: TaskByIdDto, taskStatusDto: TaskStatusDto,
        user: UserEntity,
    ): Promise<TaskEntity> {
        const { id } = taskByIdDto;
        const { status } = taskStatusDto;
        const task = await this.getTaskByID({ id }, user);
        task.status = status;
        return await task.save();
    }

    async updateTaskDetails(
        taskByIdDto: TaskByIdDto,
        updateTaskDto: UpdateTaskDto,
        user: UserEntity,
    ): Promise<TaskEntity> {
        const { id } = taskByIdDto;
        const { title, description } = updateTaskDto;
        const task = await this.getTaskByID({ id }, user);
        task.title = title;
        task.description = description;
        return await task.save();
    }
}


