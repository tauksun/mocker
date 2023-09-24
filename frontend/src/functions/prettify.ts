import { logger, networkCall } from "../utils";
import { constants } from "../config";

const prettifyCode = async ({ code }: { code: string }) => {
  try {
    logger("Prettify code ...");
    const { prettifyURL } = constants;

    const { error, data } = await networkCall({
      method: "POST",
      url: prettifyURL,
      payload: { code },
    });

    if (error) {
      const err = `Error occured while prettifying code : error : ${error}`;
      logger.error(err);
      throw new Error(err);
    }

    const { prettifyError, formattedCode } = data;

    return { error: null, prettifyError, formattedCode };
  } catch (error) {
    logger.error(`Error occured during prettifying code : `, { error });
    return { error, data: null };
  }
};

export default prettifyCode;
