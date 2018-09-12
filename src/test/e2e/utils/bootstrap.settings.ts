import { Application } from "express";
import { Server } from "http";

export interface IBootstrapSettings {
    application: Application;
    server: Server;
}
