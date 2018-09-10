import { Application } from "express";
import { before } from "mocha";
import { useContainer } from "routing-controllers";
import * as request from "supertest";
import Container from "typedi";
import { bootstrapExpress } from "../../../application";
describe("TodoController", () => {
    let app: Application;
    before(() => {
        // useContainer(Container);
        app = bootstrapExpress();
    });
    describe("getAll", () => {
        describe("with a populated list", async () => {
            it("respond with json", (done) => {
                request.default(app)
                    .get("/todo")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200, done);
            });
            // let sut: TodoService;
            // let expectedTodos: TodoModel[];
            // let actualTodos: TodoModel[];
            // beforeEach(() => {
            //     sut = new TodoService();
            //     expectedTodos = [
            //         {
            //             completed: false,
            //             name: "Clean bathroom"
            //         } as TodoModel,
            //         {
            //             completed: false,
            //             name: "Clean kitchen"
            //         } as TodoModel,
            //     ];
            //     expectedTodos.forEach((todo) => sut.create(todo));
            //     actualTodos = sut.getAll();
            // });
            // it("should match the length of the expected todos", () => {
            //     expect(expectedTodos.length).to.equal(actualTodos.length);
            // });
            // it("should return todos in the same order as populated", () => {
            //     for (let index = 0; index < expectedTodos.length; index++) {
            //         const expectedTodo = expectedTodos[index];
            //         const actualTodo = actualTodos[index];
            //         expect(expectedTodo).to.equal(actualTodo);
            //     }
            // });
        });
        // describe("with a empty list", () => {
        //     let sut: TodoService;
        //     let actualTodos: TodoModel[];
        //     beforeEach(() => {
        //         sut = new TodoService();
        //         actualTodos = sut.getAll();
        //     });
        //     it("should return an empty list", () => {
        //         expect(actualTodos).to.be.empty;
        //     });
        // });
    });
});
