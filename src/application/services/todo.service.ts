import { Service } from "typedi";
import { TodoModel } from "../models";

@Service("TodoService")
export class TodoService {
    private _idCounter: number;
    private _todos: TodoModel[];
    constructor() {
        this._todos = [];
        this._idCounter = 0;
    }

    public getAll(): TodoModel[] {
        return this._todos;
    }

    public getOne(id: number): TodoModel {
        return this._todos.find((todo) => todo.id === id);
    }

    public create(todo: TodoModel): TodoModel {
        todo.id = this.generateId();
        this._todos.push(todo);
        return todo;
    }

    public update(id: number, todo: TodoModel): void {
        const previousVersion = this.getOne(id);
        previousVersion.completed = todo.completed;
        previousVersion.name = todo.name;
    }

    public delete(id: number): void {
        const index = this._todos.findIndex((todo) => todo.id === id);
        this._todos.splice(index, 1);
    }

    private generateId(): number {
        this._idCounter++;
        return this._idCounter;
    }
}
