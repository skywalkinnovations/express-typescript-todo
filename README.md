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
npm install --save-dev @types/body-parser@1.17.0 @types/express@4.16.0 @types/multer@1.3.7 ts-loader@4.5.0 tslint@5.11.0 typescript@3.0.1 webpack@4.17.1 webpack-cli@3.1.0 nodemon-webpack-plugin@4.0.3 webpack-node-externals@1.7.2
```

The function of each of these packages is as follows:

* @types/*: provides the type definitions for a npm package
* ts-loader: webpack typescript loader
* tslint: typescript linter
* typescript: a superset of javascript
* webpack: a module bundler
* 

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

## Part 3
