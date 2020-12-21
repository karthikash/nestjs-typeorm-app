import { TaskEntity } from "./task.entity";
import { TaskStatus } from "./task.enumerator";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}