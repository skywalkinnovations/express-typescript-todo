import { expect } from "chai";
import { beforeEach, describe, it } from "mocha";
import { TodoModel, TodoService } from "../../../application";
describe("TodoService", () => {
    describe("getAll", () => {
        describe("with a populated list", () => {
            let sut: TodoService;
            let expectedTodos: TodoModel[];
            let actualTodos: TodoModel[];
            beforeEach(() => {
                sut = new TodoService();
                expectedTodos = [
                    {
                        completed: false,
                        name: "Clean bathroom"
                    } as TodoModel,
                    {
                        completed: false,
                        name: "Clean kitchen"
                    } as TodoModel,
                ];
                expectedTodos.forEach((todo) => sut.create(todo));
                actualTodos = sut.getAll();
            });
            it("should match the length of the expected todos", () => {
                expect(expectedTodos.length).to.equal(actualTodos.length);
            });
            it("should return todos in the same order as populated", () => {
                for (let index = 0; index < expectedTodos.length; index++) {
                    const expectedTodo = expectedTodos[index];
                    const actualTodo = actualTodos[index];
                    expect(expectedTodo).to.equal(actualTodo);
                }
            });
        });
        describe("with a empty list", () => {
            let sut: TodoService;
            let actualTodos: TodoModel[];
            beforeEach(() => {
                sut = new TodoService();
                actualTodos = sut.getAll();
            });
            it("should return an empty list", () => {
                expect(actualTodos).to.be.empty;
            });
        });
    });
    describe("getOne", () => {
        describe("with a populated list", () => {
            let expectedTodo: TodoModel;
            let actualTodo: TodoModel;
            let sut: TodoService;
            before(() => {
                sut = new TodoService();
                expectedTodo = {
                    completed: false,
                    name: "Clean bathroom"
                } as TodoModel;
                expectedTodo = sut.create(expectedTodo);
                actualTodo = sut.getOne(expectedTodo.id);
            });
            it("should return a matching todo", () => {
                expect(expectedTodo).to.equal(actualTodo);
            });
        });

        describe("with a empty list", () => {
            let sut: TodoService;
            let actualTodo: TodoModel;
            beforeEach(() => {
                sut = new TodoService();
                actualTodo = sut.getOne(1);
            });
            it("should return undefined", () => {
                expect(actualTodo).to.be.undefined;
            });
        });
    });
    describe("create", () => {
        let expectedTodo: TodoModel;
        let actualTodo: TodoModel;
        let sut: TodoService;
        before(() => {
            sut = new TodoService();
            expectedTodo = {
                completed: false,
                name: "Clean bathroom"
            } as TodoModel;
            expectedTodo = sut.create(expectedTodo);
            actualTodo = sut.getOne(expectedTodo.id);
        });
        it("should create a matching todo", () => {
            expect(expectedTodo).to.equal(actualTodo);
        });
    });
    describe("update", () => {
        describe("with a populated list", () => {
            let expectedTodo: TodoModel;
            let actualTodo: TodoModel;
            let sut: TodoService;
            before(() => {
                sut = new TodoService();
                expectedTodo = {
                    completed: false,
                    name: "Clean bathroom"
                } as TodoModel;
                expectedTodo = sut.create(expectedTodo);
                expectedTodo.completed = true;
                expectedTodo.name = "Clean kitchen";
                sut.update(expectedTodo.id, expectedTodo);
                actualTodo = sut.getOne(expectedTodo.id);
            });
            it("should update todo in list", () => {
                expect(expectedTodo).to.equal(actualTodo);
            });
        });
    });
    describe("delete", () => {
        describe("with a populated list", () => {
            let expectedTodo: TodoModel;
            let actualTodo: TodoModel;
            let sut: TodoService;
            before(() => {
                sut = new TodoService();
                expectedTodo = {
                    completed: false,
                    name: "Clean bathroom"
                } as TodoModel;
                expectedTodo = sut.create(expectedTodo);
                sut.delete(expectedTodo.id);
                actualTodo = sut.getOne(expectedTodo.id);
            });
            it("should remove todo in list", () => {
                expect(actualTodo).to.be.undefined;
            });
        });

        describe("with a empty list", () => {
            let sut: TodoService;
            let actualTodos: TodoModel[];
            beforeEach(() => {
                sut = new TodoService();
                sut.delete(1);
                actualTodos = sut.getAll();
            });
            it("should not change the list", () => {
                expect(actualTodos).to.be.empty;
            });
        });

        describe("with a non-existing todo", () => {
            let sut: TodoService;
            let expectedTodos: TodoModel[];
            let actualTodos: TodoModel[];
            beforeEach(() => {
                sut = new TodoService();
                let expectedTodo = {
                    completed: false,
                    name: "Clean bathroom"
                } as TodoModel;
                expectedTodo = sut.create(expectedTodo);
                expectedTodos = sut.getAll();
                sut.delete(expectedTodo.id + 1);
                actualTodos = sut.getAll();
            });
            it("should not change the list", () => {
                for (let index = 0; index < expectedTodos.length; index++) {
                    const expectedTodo = expectedTodos[index];
                    const actualTodo = actualTodos[index];
                    expect(expectedTodo).to.equal(actualTodo);
                }
            });
        });
    });
});
