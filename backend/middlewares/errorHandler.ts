import { Request, Response, NextFunction } from "express";
import { logger, resposneHandler } from "../utils";
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger(`Error caught in errorHandler : `, { error });
  resposneHandler.error({
    req,
    res,
    data: "Internal Server Error",
    responeType: "string",
  });
  next();
};

export default errorHandler;
