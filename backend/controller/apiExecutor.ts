// Executes user code respective to the Api call

import { Request, Response } from "express";
import { logger, resposneHandler } from "../utils";
import { execute } from "../services";
import { userCode } from "../models";

const apiExecutor = async (req: Request, res: Response) => {
  try {
    logger("Hit to execute api ...");


    const payload = req.body;
    const headers = req.headers;
    const queryParams = req.query;
    const pathParams = req.params;

    const { id } = pathParams;

    // Validate //
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

    // Execute User Code //
    const { error, result } = await execute({
      code,
      headers,
      queryParams,
      pathParams,
    });

    if (error) {
      logger(`Error returned while executing userPayload : `, { error });
    }

    return resposneHandler.success({
      req,
      res,
      data: result,
      responeType: "json",
      status: 200,
    });
  } catch (error) {
    logger(`Error occured in executor : `, { error });
    return resposneHandler.error({
      req,
      res,
    });
  }
};

export default apiExecutor;
