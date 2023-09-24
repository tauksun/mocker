import { execSync } from "child_process";
import { logger, uglifyCode } from "../utils";
import { join } from "path";
import templateCode from "./executionTemplate";

const execute = async ({
  code,
  headers,
  queryParams,
  pathParams,
  reqBody = {},
}: {
  code: string;
  headers: any;
  queryParams: any;
  pathParams: any;
  reqBody?: any;
}): Promise<{
  error?: any;
  result: string | null;
}> => {
  try {
    let result = null;

    logger(`Executing userCode in a new process... `);

    const pathToExecuteUserCode = join(
      process.cwd(),
      "services/executeUserCode"
    );

    const templateWrappedCode = templateCode({
      headers,
      queryParams,
      pathParams,
      code: Buffer.from(code),
      body: reqBody,
    });

    logger(`Uglifying templateWrappedCode...`);
    const { error: uglifyError, uglifiedCode } = uglifyCode({
      code: templateWrappedCode,
    });

    if (uglifyError || !uglifiedCode) {
      logger(`Error occured while uglifying code : `, { uglifyError });
      throw uglifyError;
    }

    result = execSync(
      `node ${pathToExecuteUserCode} ${JSON.stringify(uglifiedCode)}`,
      {}
    );

    result = (result && result.toString("utf8", 0, result.length - 1)) || "";
    result = JSON.parse(result);
    return { result };
  } catch (error) {
    logger(`Error occured while executing user code in a new process : `, {
      error,
    });
    return { error, result: null };
  }
};

export default execute;
