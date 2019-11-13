import "reflect-metadata";
import StrikeServer from "./server";
require("dotenv").config();
new StrikeServer().addDatabase().start();
