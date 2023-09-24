import { logger, networkCall } from "../utils";
import { constants } from "../config";

const createApi = async () => {
  try {
    logger("Creating new Api ...");
    const { createApiURL } = constants;

    const { error, data } = await networkCall({
      method: "POST",
      url: createApiURL,
    });

    if (error) {
      const err = `Error occured while creating new api : error : ${error}`;
      logger.error(err);
      throw new Error(err);
    }

    return { error: null, data };
  } catch (error) {
    logger.error(`Error occured during createApi : `, { error });
    return { error, data: null };
  }
};

export default createApi;
