import { Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put } from "routing-controllers";
import Container, { Inject } from "typedi";
import { TodoModel } from "../models";
import { TodoService } from "../services";

@JsonController()
export class TodoController {
    private _todoService: TodoService;
    // constructor(@Inject("TodoService") private _todoService: TodoService) {
    constructor() {
        this._todoService = Container.get<TodoService>("TodoService");
    }

    @Get("/todo")
    public getAll(): TodoModel[] {
        console.log("Service: ", this._todoService);
        return this._todoService.getAll();
    }

    @Get("/todo/:id")
    public getOne(@Param("id") id: number): TodoModel {
        return this._todoService.getOne(id);
    }

    @OnUndefined(201)
    @Post("/todo")
    public post(@Body() todo: TodoModel) {
        this._todoService.create(todo);
    }

    @OnUndefined(200)
    @Put("/todo/:id")
    public put(@Param("id") id: number, @Body() todo: TodoModel) {
        this._todoService.update(id, todo);
    }

    @OnUndefined(204)
    @Delete("/todo/:id")
    public remove(@Param("id") id: number): void {
        this._todoService.delete(id);
    }

}
