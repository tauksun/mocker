// Stores user Code in DB

import { Request, Response } from "express";
import { userCode } from "../models";
import { logger, resposneHandler } from "../utils";

const storeApiData = async (req: Request, res: Response) => {
  try {
    logger("Hit to store Api Data ");
    const payload = req.params;
    const { id } = payload;

    const { code } = req.body;

    // Validate
    //
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

    await userCode.update(
      {
        code,
      },
      {
        where: {
          apiId: id,
        },
      }
    );

    const response = {
      data: "updated",
    };

    return resposneHandler.success({
      req,
      res,
      data: response,
      responeType: "json",
    });
  } catch (error) {
    logger(`Error occured while storing api data : `, error);
    return resposneHandler.error({
      req,
      res,
    });
  }
};

export default storeApiData;
