import { Application } from "express";
import { Server } from "http";
import { MicroframeworkLoader, MicroframeworkSettings } from "microframework-w3tec";
import { createExpressServer, useContainer } from "routing-controllers";
import Container from "typedi";
import { TodoController } from "../controllers";

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        useContainer(Container);

        const app: Application = createExpressServer({
            controllers: [TodoController],
            cors: false,
        });
        const server: Server = app.listen(3000);
        settings.setData("express_app", app);
        settings.setData("express_server", server);
    }
};
