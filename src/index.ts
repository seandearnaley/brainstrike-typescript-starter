import "reflect-metadata";
import StrikeServer from "./server";
import { config as setupDotEnv } from "dotenv";

setupDotEnv(); // adds .env environment file support

new StrikeServer()
  .addMiddleware()
  .addRouters()
  .addDatabase()
  .start();
