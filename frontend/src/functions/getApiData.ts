import { logger, networkCall } from "../utils";
import { constants } from "../config";

const getApiData = async ({ apiId }: { apiId: string }) => {
  try {
    logger("Fetching Api Data ...");
    const { getApiDataURL } = constants;

    const { error, data } = await networkCall({
      method: "GET",
      url: getApiDataURL + `/${apiId}`,
    });

    if (error) {
      const err = `Error occured while fetching api data : error : ${error}`;
      logger.error(err);
      throw new Error(err);
    }

    return { error: null, data };
  } catch (error) {
    logger.error(`Error occured during fetching api data : `, { error });
    return { error, data: null };
  }
};

export default getApiData;
