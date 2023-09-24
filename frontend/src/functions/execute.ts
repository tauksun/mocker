import { logger, networkCall } from "../utils";
import { constants } from "../config";

const testExecute = async ({
  apiId,
  code,
}: {
  apiId: string;
  code: string;
}) => {
  try {
    logger("Test executing ...");
    const { executeURL } = constants;

    const { error, data } = await networkCall({
      method: "GET",
      url: executeURL + `/${apiId}`,
      payload: {
        code,
      },
    });

    if (error) {
      const err = `Error occured during testExecute : error : ${error}`;
      logger.error(err);
      throw new Error(err);
    }

    return { error: null, data };
  } catch (error) {
    logger.error(`Error occured during testExecute : `, { error });
    return { error, data: null };
  }
};

export default testExecute;
