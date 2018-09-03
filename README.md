# Express with Typescript and Webpack

## Part 1

Project Setup
The project has the following prerequisites:

* NodeJs 8.X
* Typescript  => 2.7
* Webpack  => 4
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
npm install --save  body-parser@1.18.3 express@4.16.3 multer@1.3.1 reflect-metadata@0.1.10 routing-controllers@0.7.7
    #     cors@2.8.4
    #   kcors@2.2.2
    #   koa@2.5.2
    #   koa-bodyparser@4.2.1
    #   koa-multer@1.0.2
    #   koa-router@7.4.0
```
Install the dev dependencies.

```bash
npm install --save-dev @types/body-parser@1.17.0 @types/express@4.16.0 @types/multer@1.3.7 ts-loader@4.5.0 tslint@5.11.0 typescript@3.0.1 webpack@4.17.1 webpack-cli@3.1.0 ts-node@3.3.0
    #   @types/node@8.0.29
```

Create the Typescript configuration.

```bash
tsc --init
```


## Part 2

## Part 3
