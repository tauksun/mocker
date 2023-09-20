import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { corsHandler, errorHandler } from "./middlewares";
import { logger } from "./utils";
import router from "./routes";
import { connectToDB } from "./services";

// Initialize application
const server = express();

// Parse Request Body
server.use(express.json());

// Middlewares
logger(`Adding Middlewares ...`);
server.use(corsHandler);

// Connect  DB
logger(`Connecting to DB ...`);
connectToDB();

// Routes
server.use(router);

// Error Handler
server.use(errorHandler);

export default server;
