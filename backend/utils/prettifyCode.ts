import * as prettier from "prettier";
import logger from "./logger";

const prettifyCode = async ({
  code,
}: {
  code: string;
}): Promise<{
  result: string | null;
  error?: any;
}> => {
  try {
    if (!code) {
      return { error: null, result: "" };
    }
    const prettyCode = await prettier.format(code, {
      semi: true,
      parser: "babel",
      printWidth: 1000,
    });
    return {
      error: null,
      result: prettyCode,
    };
  } catch (error) {
    logger.f_error(`Error occured while prettifying code : `, {
      error,
    });
    return { error, result: null };
  }
};

export default prettifyCode;
