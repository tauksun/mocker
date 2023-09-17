import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { corsHandler, errorHandler } from "./middlewares";
import { logger } from "./utils";
import router from "./routes";

// Initialize application
const server = express();

// Parse Request Body
server.use(express.json());

// Middlewares
logger(`Adding Middlewares ...`);
server.use(corsHandler);

// Routes
server.use(router);

// Error Handler
server.use(errorHandler);

export default server;