// Fetches user code from DB

import { Request, Response } from "express";
import { userCode } from "../models";
import { logger, resposneHandler } from "../utils";

const getApiData = async (req: Request, res: Response) => {
  try {
    logger("Hit to get Api Data ");
    const payload = req.params;
    const { id } = payload;

    // Validate
    //
    //

    const apiInstance = await userCode.findOne({
      where: {
        apiId: id,
      },
    });

    if (!apiInstance) {
      return resposneHandler.error({
        req,
        res,
        status: 400,
        data: "Invalid Id",
        responeType: "string",
      });
    }

    const code = apiInstance.code;

    const response = {
      code,
    };

    return resposneHandler.success({
      req,
      res,
      data: response,
      responeType: "json",
    });
  } catch (error) {
    logger(`Error occured while fetching api data : `, error);
    return resposneHandler.error({
      req,
      res,
    });
  }
};

export default getApiData;
