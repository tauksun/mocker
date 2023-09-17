import { Request, Response } from "express";
import logger from "./logger";

type responseType = "string" | "json";

const resposneHandler = ({
  req,
  res,
  status,
  data,
  responeType,
}: {
  req: Request;
  res: Response;
  status: number;
  data: any;
  responeType: responseType;
}) => {
    logger({data})
  if (responeType === "string") {
    return res.status(status).send(data);
  }

  return res.status(status).json(data);
};

resposneHandler.error = ({
  req,
  res,
  status,
  data = {},
  responeType = "json",
}: {
  req: Request;
  res: Response;
  status?: number;
  data?: any;
  responeType?: responseType;
}) => {
  let resposneStatus = status;
  if (!resposneStatus) {
    resposneStatus = 500;
  }
  logger(`Returning HTTP Error Response : `, { resposneStatus });
  resposneHandler({ req, res, status: resposneStatus, data, responeType });
};

resposneHandler.success = ({
  req,
  res,
  status,
  data = {},
  responeType = "json",
}: {
  req: Request;
  res: Response;
  status?: number;
  data?: any;
  responeType?: responseType;
}) => {
  let resposneStatus = status;
  if (!resposneStatus) {
    resposneStatus = 200;
  }
  logger(`Returning HTTP Success Response : `, { resposneStatus });
  resposneHandler({ req, res, status: resposneStatus, data, responeType });
};

export default resposneHandler;
