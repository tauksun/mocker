import { Request, Response } from "express";
import { logger, resposneHandler } from "../utils";

const healthCheck = (req: Request, res: Response) => {
  logger("Hit on health check");
  return resposneHandler.success({
    req,
    res,
    data: "OK",
    responeType: "string",
  });
};

export default healthCheck;
