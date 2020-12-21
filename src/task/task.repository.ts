import { InternalServerErrorException, Logger } from "@nestjs/common";
import { use } from "passport";
import { UserEntity } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { TaskEntity } from "./task.entity";
import { TaskStatus } from "./task.enumerator";
import { CreateTaskDto, TasksFilterDto } from "./task.validator";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    private readonly logger = new Logger('TaskRepository');

    async fetchTasks(
        tasksFilterDto: TasksFilterDto,
        user: UserEntity,
    ): Promise<TaskEntity[]> {
        const { status, search } = tasksFilterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`Failed to fetch tasks for user "${user.name}". Filters: ${JSON.stringify(tasksFilterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
       
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: UserEntity,
    ): Promise<TaskEntity> {
        const { title, description } = createTaskDto;
        const task = new TaskEntity();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }

}