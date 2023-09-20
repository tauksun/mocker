import { Request, Response } from "express";
import { logger, resposneHandler } from "../utils";
import * as uuid from "uuid";
import { userCode } from "../models";

const createApi = async (req: Request, res: Response) => {
  try {
    logger("Hit to create new api ");

    const uniqueId = uuid.v4();

    await userCode.create({
      apiId: uniqueId,
      code: "",
    });

    const response = {
      id: uniqueId,
      code: "",
    };

    return resposneHandler.success({
      req,
      res,
      data: response,
      responeType: "json",
    });
  } catch (error) {
    logger(`Error occured while creating new api : `, error);
    return resposneHandler.error({
      req,
      res,
    });
  }
};

export default createApi;
