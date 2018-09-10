# Express with Typescript and Webpack

## Part 1

Project Setup
The project has the following prerequisites:

* NodeJs 8.X
* Typescript  => 2.7
* TSLint => 5.11.0
* Webpack  => 4
* Webpack CLI => 3.1.0
* Git

Create the project directory.

```bash
mkdir express-typescript-todo
cd express-typescript-todo
```

Initialize the git repository for the project.

```bash
git init
```

Create a .gitignore file with following content:

```
.idea/
.vscode/
node_modules/
build/
dist/
```

Create the npm package.

```bash
npm init -y
```

Install the dependencies.

```bash
npm install --save body-parser@1.18.3 express@4.16.3 multer@1.3.1 reflect-metadata@0.1.10 routing-controllers@0.7.7
```

The function of each of these packages is as follows:

* body-parser: parse the request body into an object on express.Request.body property
* express: the webserver being used
* multer: parse for handling multipart/form-data
* reflect-metadata: allows the adding of decorators to modify typescript classes
* routing-controllers: allows the use of @Controller and http verb decorators to simplify routing declarations

Install the dev dependencies.

```bash
npm install -D @types/body-parser@1.17.0 @types/express@4.16.0 @types/multer@1.3.7 ts-loader@4.5.0 tslint@5.11.0 typescript@3.0.1 webpack@4.17.1 webpack-cli@3.1.0 nodemon-webpack-plugin@4.0.3 webpack-node-externals@1.7.2
```

The function of each of these packages is as follows:

* @types/*: provides the type definitions for a npm package
* ts-loader: webpack typescript loader
* tslint: typescript linter
* typescript: a super set of javascript
* webpack: a module bundler
* webpack-cli: allows the running of webpack from terminal
* nodemon-webpack-plugin: a webpack plugin to auto-restart a expressjs server with nodemon
* webpack-node-externals: a function for webpack to filter out node_modules when bundling

Create the Typescript configuration.

```bash
tsc --init
```

Make the following changes to the tsconfig.json file:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": [
      "es2017",
      "dom"
    ],
    "typeRoots": [
      "node_modules/@types"
    ],
    "esModuleInterop": true ,
    "inlineSourceMap": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,  
  },
  "exclude": [
    "node_modules"
  ]
}
```

Create the TSLint configuration.

```bash
tslint --init
```

Create a webpack.config.js with the following content:

```js
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const nodemonPlugin = require( 'nodemon-webpack-plugin' );

module.exports = {
    entry: './src/application/app.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    watch: true,
    target: 'node',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: [
        nodeExternals()
    ],
    plugins:[
        new nodemonPlugin()
    ]
};

```

Create the application directories.

```bash
mkdir src
cd src
mkdir application
mkdir test
cd application
mkdir controllers
```
Create the file src/application/controllers/todo.controller.ts with the following content:

```typescript
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
    public post(@Body() todo: any) {
       return "Saving todo...";
    }

    @Put("/todo/:id")
    public put(@Param("id") id: number, @Body() todo: any) {
       return "Updating a todo...";
    }

    @Delete("/todo/:id")
    public remove(@Param("id") id: number) {
       return "Removing todo...";
    }

}

```

Create the barrel roll file src/application/controllers/index.ts with the content:

```typescript
export * from "./todo.controller";

```

Create the application bootstrapping file src/application/app.ts with the content:

```typescript
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { TodoController } from "./controllers";

const app = createExpressServer({
    controllers: [TodoController],
    cors: false,
});

app.listen(3000);

```

Add the following scripts to the package.json file:

```json
  "scripts": {
    "dev": "webpack"
  }
```

Run the application.

```bash
npm run dev
```

The application is accessible at http://localhost:3000/todo.

## Part 2

Install the dependencies

```bash
npm install --save typedi
```

Install the dev dependencies

```bash
npm install @types/node -D
```

Create the services and models directory

```bash
cd src/application
mkdir services
mkdir models
```

Update the app file src/application/app.ts with the content:

```typescript
import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import {Container} from "typedi";
import { TodoController } from "./controllers";

useContainer(Container);

const app = createExpressServer({
    controllers: [TodoController],
    cors: false,
});

app.listen(3000);

```

Update the file tslint.json with the content:

```json
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {
        "variable-name": [
            true,
            "check-format",
            "allow-leading-underscore"
        ]
    },
    "rulesDirectory": []
}
```

Create the todo model file src/application/models/todo.model.ts with the content:

```typescript
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TodoModel {
    private _id: number;
    private _name: string;
    private _completed: boolean;

    @Expose()
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    @Expose()
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }
    @Expose()
    public get completed(): boolean {
        return this._completed;
    }
    public set completed(v: boolean) {
        this._completed = v;
    }

}

```

Create the barrel roll file src/application/models/index.ts with the content:

```typescript
export * from "./todo.model";

```

Create the todo service file src/application/services/todo.service.ts with the content:

```typescript
import { Service } from "typedi";
import { TodoModel } from "../models";

@Service()
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

    public create(todo: TodoModel): void {
        todo.id = this.generateId();
        this._todos.push(todo);
    }

    public update(id: number, todo: TodoModel): void {
        const previousVersion = this.getOne(id);
        previousVersion.completed = todo.completed;
        previousVersion.id = todo.id;
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

```

Create the barrel roll file src/application/services/index.ts with the content:

```typescript
export * from "./todo.service";

```

Update the todo controller file src/application/controllers/todo.controller.ts with the content:

```typescript
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

```

## Part 3

Update the todo model file src/application/models/todo.model.ts with the content:

```typescript
import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsEmpty, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

@Exclude()
export class TodoModel {
    private _id: number;
    @IsNotEmpty({ message: "Name is required" })
    @IsString({ message: "Name should be a string" })
    @MinLength(1, {
        message: "Name is too short"
    })
    @MaxLength(50, {
        message: "Name is too long"
    })
    private _name: string;
    @IsNotEmpty({ message: "Completed is required" })
    @IsBoolean({ message: "Completed should be boolean" })
    private _completed: boolean;

    @Expose()
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    @Expose()
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }
    @Expose()
    public get completed(): boolean {
        return this._completed;
    }
    public set completed(v: boolean) {
        this._completed = v;
    }

}

```

Install the dev dependencies.

```bash
npm install chai mocha ts-node supertest @types/chai @types/mocha @types/supertest -D
```

Create the unit test directories.

```bash
cd src/test
mkdir e2e
mkdir unit
cd e2e
mkdir controllers
cd ../unit
mkdir services
```

Create the mocha options file src/test/mocha.opts with the content:

```opts
--require ts-node/register
--require source-map-support/register
--full-trace
--bail
src/test/**/*.spec.ts
```

Update the npm package scripts.

```json
   "scripts": {
      "dev": "webpack",
      "test": "mocha --opts src/test/mocha.opts"
   },
```

Update the tslint.json.

```json
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {
        "variable-name": [
            true,
            "check-format",
            "allow-leading-underscore"
        ],
        "trailing-comma":false,
        "no-unused-expression":false
    },
    "rulesDirectory": []
}
```

Create the barrel roll file src/application/index.ts with the content:

```typescript
export * from "./controllers";
export * from "./models";
export * from "./services";
export * from "./app";

```

Update the app.ts file src/application/app.ts with the content:

```typescript
import { Application } from "express";
import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { TodoController } from "./controllers";

export const bootstrapExpress = (): Application => {
    useContainer(Container);

    const app: Application = createExpressServer({
        controllers: [TodoController],
        cors: false,
    });

    return app;
};
bootstrapExpress();

```

Update the todo.controller.ts for src/application/controllers/todo.controller.ts with the content:

```typescript
import { Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put } from "routing-controllers";
import Container, { Inject } from "typedi";
import { TodoModel } from "../models";
import { TodoService } from "../services";

@JsonController()
export class TodoController {
    private _todoService: TodoService;
    constructor() {
        this._todoService = Container.get<TodoService>("TodoService");
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

```

Update the todo.service.ts for src/application/services/todo.service.ts with the content:

```typescript
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

```

Create the todo service unit test src/test/unit/services/todo.service.spec.ts with the content:

```typescript
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

        describe("with a empty list", () => {
            let sut: TodoService;
            let actualTodos: TodoModel[];
            beforeEach(() => {
                sut = new TodoService();
                actualTodos = sut.getAll();
            });
            it("should not change the list", () => {
                expect(actualTodos).to.be.empty;
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

```

Create the todo controller e2e test src/test/e2e/controllers/todo.controller.spec.ts with the content:

```typescript
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

```