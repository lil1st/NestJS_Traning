import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dtp';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    gatAllTasks(): Task[] {
        return this.tasks
    }

    getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto
        let tasks = this.gatAllTasks()

        if(status) {
            tasks = tasks.filter(tasks => tasks.status === status)
        }
        
        if(search) {
            tasks = tasks.filter(tasks => 
                tasks.title.includes(search) || 
                tasks.description.includes(search)
            )
        }

        return tasks
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id)
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto

        const task : Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id)
        console.log("TasksService -> deleteTask -> this.tasks", this.tasks)
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id)
        task.status = status
        return task
    }
}
