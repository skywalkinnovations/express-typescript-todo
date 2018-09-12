import { Application } from "express";
import { Server } from "http";
import { bootstrapMicroframework } from "microframework-w3tec";
import "reflect-metadata";
import { expressLoader } from "../../../application";
import { IBootstrapSettings } from "./bootstrap.settings";

export const bootstrapApp = async (): Promise<IBootstrapSettings> => {
    const framework = await bootstrapMicroframework({
        loaders: [
            expressLoader
        ]
    });
    return {
        application: framework.settings.getData("express_app") as Application,
        server: framework.settings.getData("express_server") as Server
    };
};
