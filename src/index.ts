import "reflect-metadata";
import Server from "./server";
import { config as setupDotEnv } from "dotenv";

setupDotEnv(); // adds .env environment file support

new Server().start();
