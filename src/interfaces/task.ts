import { StatusTask } from "../enum/status-task.enum";
import { IPerson } from "./person.interface";

export interface ITask {
    id: number;
    name: string;
    date: Date;
    status: StatusTask;
    persons: IPerson[];
}

export interface ICountAndTotalTask {
    count: number;
    tasks: ITask[];
}
