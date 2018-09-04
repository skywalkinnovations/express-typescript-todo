import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { TodoController } from "./controllers";

const app = createExpressServer({
    controllers: [TodoController],
    cors: false,
});

app.listen(3000);
