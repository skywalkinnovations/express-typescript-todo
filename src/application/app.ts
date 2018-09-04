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
