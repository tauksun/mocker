import { execSync } from "child_process";
import { logger } from "../utils";
import { join } from "path";
import templateCode from "./executionTemplate";

const execute = async ({
  code,
  headers,
  queryParmas,
  pathParams,
}: {
  code: string;
  headers: any;
  queryParmas: any;
  pathParams: any;
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
      queryParmas,
      pathParams,
      code: Buffer.from(code),
    });

    result = execSync(
      `node ${pathToExecuteUserCode} ${JSON.stringify(templateWrappedCode)}`,
      {}
    );

    result = result && result.toString();
    return { result };
  } catch (error) {
    logger(`Error occured while executing user code in a new process : `, {
      error,
    });
    return { error, result: null };
  }
};

export default execute;
