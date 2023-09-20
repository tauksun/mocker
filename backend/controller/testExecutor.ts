import { Request, Response } from "express";
import { logger, resposneHandler } from "../utils";
import { execute } from "../services";

const executor = async (req: Request, res: Response) => {
  try {
    logger("Hit on executor ...");

    const payload = req.body;
    const headers = req.headers;
    const queryParams = req.query;
    const pathParams = req.params;

    // Validate //
    //
    //

    logger({ payload });
    logger(`!!!!!!!!!!!!!!!!!!!!!!!!`);
    logger({ testExecutorPID: process.pid });
    logger(`!!!!!!!!!!!!!!!!!!!!!!!!`);

    // Execute User Code //
    const { error, result } = await execute({
      code: payload && payload.code,
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

export default executor;
