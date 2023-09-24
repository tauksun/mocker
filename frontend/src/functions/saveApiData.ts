import { logger, networkCall } from "../utils";
import { constants } from "../config";

const storeApiData = async ({
  apiId,
  code,
}: {
  apiId: string;
  code: string;
}) => {
  try {
    logger("Storing Api Data ...");
    const { storeApiDataURL } = constants;

    const { error, data } = await networkCall({
      method: "POST",
      url: storeApiDataURL + `/${apiId}`,
      payload: {
        code,
      },
    });

    if (error) {
      const err = `Error occured while storing api data : error : ${error}`;
      logger.error(err);
      throw new Error(err);
    }

    return { error: null, data };
  } catch (error) {
    logger.error(`Error occured during storing api data : `, { error });
    return { error, data: null };
  }
};

export default storeApiData;
