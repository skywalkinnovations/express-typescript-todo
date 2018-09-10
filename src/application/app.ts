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

    console.log("Starting server");
    // app.listen(3000);
    // console.log("Listening on port 3000");
    return app;
};
bootstrapExpress();
