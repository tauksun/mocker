import { Request, Response } from "express";
import { logger, prettifyCode, resposneHandler } from "../utils";

const prettifyUserCode = async (req: Request, res: Response) => {
  try {
    logger("Hit to prettify code ...");

    const payload = req.body;
    const code = payload.code;

    const { error: prettifyError, result: formattedCode } = await prettifyCode({
      code,
    });

    const response = {
      prettifyError,
      formattedCode,
    };
    return resposneHandler.success({
      req,
      res,
      data: response,
      responeType: "json",
    });
  } catch (error) {
    logger(`Error occured while prettifying code : `, { error });
    resposneHandler.error({
      req,
      res,
    });
  }
};

export default prettifyUserCode;
