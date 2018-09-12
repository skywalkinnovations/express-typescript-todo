import { bootstrapMicroframework } from "microframework-w3tec";
import "reflect-metadata";
import { expressLoader } from "./loaders";

bootstrapMicroframework([
    expressLoader
]);
