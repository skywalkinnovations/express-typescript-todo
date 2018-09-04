import { Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put } from "routing-controllers";
import { TodoModel } from "../models";
import { TodoService } from "../services";

@JsonController()
export class TodoController {

    constructor(private _todoService: TodoService) {

    }

    @Get("/todo")
    public getAll(): TodoModel[] {
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
