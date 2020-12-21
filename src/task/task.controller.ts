import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/auth.decorator';
import { UserEntity } from 'src/user/user.entity';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';
import { CreateTaskDto, TaskByIdDto, TasksFilterDto, TaskStatusDto, UpdateTaskDto } from './task.validator';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    private readonly logger = new Logger('TasksController')

    constructor(private readonly taskService: TaskService) { }

    @Get('/list')
    @UsePipes(ValidationPipe)
    fetchTasks(
        @Query() filter: TasksFilterDto,
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity[]> {
        this.logger.verbose(`User "${user.name}" retreiving all the tasks. Filters: ${JSON.stringify(filter)}`);
        return this.taskService.fetchTasks(filter, user);
    }

    @Get('/get/:id')
    @UsePipes(ValidationPipe)
    getTasksById(
        @Param() id: TaskByIdDto,
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity> {
        return this.taskService.getTaskByID(id, user);
    }

    @Post('/add')
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity> {
        this.logger.verbose(`User "${user.name}" creating a new task. Task: ${JSON.stringify(createTaskDto)}`);
        return this.taskService.createTask(createTaskDto, user);
    }

    @Delete('/delete/:id')
    @UsePipes(ValidationPipe)
    deleteTask(
        @Param() id: TaskByIdDto,
        @GetUser() user: UserEntity,
    ): Promise<void> {
        return this.taskService.deleteTask(id, user);
    }

    @Patch('/status/:id')
    @UsePipes(ValidationPipe)
    updateTask(
        @Param() id: TaskByIdDto,
        @Body() status: TaskStatusDto,
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity> {
        return this.taskService.updateTaskStatus(id, status, user);
    }

    @Patch('/update/:id')
    @UsePipes(ValidationPipe)
    updateTaskDetails(
        @Param() id: TaskByIdDto,
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity> {
        return this.taskService.updateTaskDetails(id, updateTaskDto, user);
    }
}
