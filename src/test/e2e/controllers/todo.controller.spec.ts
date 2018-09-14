import {expect} from "chai";
import {before, describe} from "mocha";
import {agent} from "supertest";
import {TodoModel} from "../../../application";
import {bootstrapApp, IBootstrapSettings} from "../utils";

describe("TodoController", async () => {
    let settings: IBootstrapSettings;
    before(async () => {
        settings = await bootstrapApp();
    });
    after((done) => {
        settings.server.close(done);
    });
    describe("getAll", async () => {
        describe("with a populated list", async () => {
            const expectedTodos: TodoModel[] = [];
            let actualTodos: TodoModel[];
            before(async () => {
                const todos = [
                    {
                        completed: false,
                        name: "Clean bathroom"
                    } as TodoModel,
                    {
                        completed: false,
                        name: "Clean kitchen"
                    } as TodoModel,
                ];
                todos.forEach(async (todo) => {
                    const response = await agent(settings.application)
                        .post("/todo")
                        .send(todo)
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200);
                    expectedTodos.push(response.body as TodoModel);
                });
            });
            after(async () => {
                expectedTodos.forEach(async (todo) => {
                    await agent(settings.application)
                        .delete("/todo/" + todo.id)
                        .set("Accept", "application/json")
                        .expect(204);
                });
            });
            it("responds with the expected records", async () => {
                const response = await agent(settings.application)
                    .get("/todo")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200);
                actualTodos = response.body as TodoModel[];
                for (let index = 0; index < expectedTodos.length; index++) {
                    const expectedTodo = expectedTodos[index];
                    const actualTodo = actualTodos[index];
                    expect(expectedTodo.id).to.equal(actualTodo.id);
                    expect(expectedTodo.name).to.equal(actualTodo.name);
                    expect(expectedTodo.completed).to.equal(actualTodo.completed);
                }
            });
        });
        describe("with a empty list", () => {
            it("should return an empty list", async () => {
                const response = await agent(settings.application)
                    .get("/todo")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200);
                const actualTodos = response.body as TodoModel[];
                expect(actualTodos).to.be.empty;
            });
        });
    });
    describe("getOne", () => {
        describe("with a populated list", () => {
            let expectedTodo: TodoModel;
            let actualTodo: TodoModel;
            before(async () => {
                const todo = {
                    completed: false,
                    name: "Clean bathroom"
                } as TodoModel;
                const response = await agent(settings.application)
                    .post("/todo")
                    .send(todo)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200);
                expectedTodo = response.body as TodoModel;
            });
            after(async () => {
                await agent(settings.application)
                    .delete("/todo/" + expectedTodo.id)
                    .set("Accept", "application/json")
                    .expect(204);
            });
            it("should return a matching todo", async () => {
                const response = await agent(settings.application)
                    .get("/todo/" + expectedTodo.id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200);
                actualTodo = response.body as TodoModel;
                expect(expectedTodo.id).to.equal(actualTodo.id);
                expect(expectedTodo.name).to.equal(actualTodo.name);
                expect(expectedTodo.completed).to.equal(actualTodo.completed);
            });
        });

        describe("with a empty list", () => {
            it("should return 404", async () => {
                await agent(settings.application)
                    .get("/todo/" + 1)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(404);
            });
        });
    });
    describe("create", () => {
        let expectedTodo: TodoModel;
        let actualTodo: TodoModel;
        after(async () => {
            await agent(settings.application)
                .delete("/todo/" + actualTodo.id)
                .set("Accept", "application/json")
                .expect(204);
        });
        it("should create a matching todo", async () => {
            expectedTodo = {
                completed: false,
                name: "Clean bathroom"
            } as TodoModel;
            const response = await agent(settings.application)
                .post("/todo")
                .send(expectedTodo)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200);
            actualTodo = response.body as TodoModel;
            expect(expectedTodo.name).to.equal(actualTodo.name);
            expect(expectedTodo.completed).to.equal(actualTodo.completed);
            expect(actualTodo.id).to.not.be.null;
        });
        it("should return 400 when todo model is invalid", async () => {
            expectedTodo = {
                completed: false
            } as TodoModel;
            await agent(settings.application)
                .post("/todo")
                .send(expectedTodo)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(400);
        });
    });
    describe("update", () => {
        describe("with a populated list", () => {
            let expectedTodo: TodoModel;
            let actualTodo: TodoModel;
            before(async () => {
                const todo = {
                    completed: false,
                    name: "Clean bathroom"
                } as TodoModel;
                const response = await agent(settings.application)
                    .post("/todo")
                    .send(todo)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200);
                expectedTodo = response.body as TodoModel;
            });
            after(async () => {
                await agent(settings.application)
                    .delete("/todo/" + expectedTodo.id)
                    .set("Accept", "application/json")
                    .expect(204);
            });
            it("should update todo in list", async () => {
                expectedTodo.completed = true;
                expectedTodo.name = "Clean kitchen";
                await agent(settings.application)
                    .put("/todo/" + expectedTodo.id)
                    .send(expectedTodo)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200);
                const response = await agent(settings.application)
                    .get("/todo/" + expectedTodo.id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200);
                actualTodo = response.body as TodoModel;
                expect(expectedTodo.id).to.equal(actualTodo.id);
                expect(expectedTodo.name).to.equal(actualTodo.name);
                expect(expectedTodo.completed).to.equal(actualTodo.completed);
            });
        });
    });
    describe("delete", () => {
        describe("with a populated list", () => {
            let expectedTodo: TodoModel;
            before(async () => {
                const todo = {
                    completed: false,
                    name: "Clean bathroom"
                } as TodoModel;
                const response = await agent(settings.application)
                    .post("/todo")
                    .send(todo)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200);
                expectedTodo = response.body as TodoModel;
            });
            it("should remove todo in list", async () => {
                await agent(settings.application)
                    .delete("/todo/" + expectedTodo.id)
                    .set("Accept", "application/json")
                    .expect(204);
                await agent(settings.application)
                    .get("/todo/" + expectedTodo.id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(404);
            });
        });
    });
});
