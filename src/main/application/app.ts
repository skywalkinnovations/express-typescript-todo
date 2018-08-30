import * as express from "express";
import * as core from "express-serve-static-core";
import "reflect-metadata"; // this shim is required
import { useExpressServer } from "routing-controllers";
import { TodoController } from "./controllers";

// import {UserController} from "./UserController";
const app = express.default();
// creates express app, registers all controller routes and returns you express app instance
useExpressServer(app, {
    controllers: [TodoController],  // we specify controllers we want to use
    cors: false,
});

// run express application on port 3000
app.listen(3000);
