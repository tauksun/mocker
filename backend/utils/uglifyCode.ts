import UglifyJS from "uglify-js";
import logger from "./logger";

const uglifyCode = ({ code }: { code: string }) => {
  try {
    const { error, code: uglifiedCode } = UglifyJS.minify(code);
    return { error, uglifiedCode };
  } catch (error) {
    logger(`Error occured while uglifying code : `, { error });
    return { error, uglifiedCode: null };
  }
};

export default uglifyCode;
