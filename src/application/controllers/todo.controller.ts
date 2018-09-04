import {Body, Controller, Delete, Get, Param, Post, Put} from "routing-controllers";

@Controller()
export class TodoController {

    @Get("/todo")
    public getAll() {
       return "This action returns all todos";
    }

    @Get("/todo/:id")
    public getOne(@Param("id") id: number) {
       return "This action returns todo #" + id;
    }

    @Post("/todo")
    public post(@Body() user: any) {
       return "Saving todo...";
    }

    @Put("/todo/:id")
    public put(@Param("id") id: number, @Body() user: any) {
       return "Updating a todo...";
    }

    @Delete("/todo/:id")
    public remove(@Param("id") id: number) {
       return "Removing todo...";
    }

}
