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
      code: '/**\nfunction (headers, queryParams, pathParams,body){\n*  >>>>>>>>>>>Edit between lines<<<<<<<<<<<\n*/\n//---------------------------------------------------//\n//---------------------------------------------------//\n\n//---- Extract data from headers ----//\n//---- query or path parameters ----//\n// ---- request body & apply logic --//\n\nconst host = headers && headers.host;\n\nconst num1 = 2;\nconst num2 = 3;\nconst sum = num1 + num2;\n\n// ---- Return of this function is API response ---- //\n\nconst response = {\n  status: 200,\n  message: "Hello there",\n  host,\n  sum,\n};\n\nreturn response;\n\n//---------------------------------------------------//\n//---------------------------------------------------//\n/**  \n* >>>>>>>>>>>Edit between lines<<<<<<<<<<<\n}*/\n',
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
