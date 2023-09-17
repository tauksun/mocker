import { Request, Response } from "express";
import { logger, resposneHandler, prettifyCode } from "../utils";
import { execSync } from "child_process";
import { writeFileSync, mkdirSync, rmSync } from "fs";
import path from "path";

const executor = async (req: Request, res: Response) => {
  try {
    logger("Hit on executor ...");

    const payload = req.body;

    // Validate //
    //
    //

    logger({ payload });

    // Execute User Code //
    const { error, result } = await executeUserCode({
      code: payload && payload.code,
    });

    if (error) {
      logger(`Error returned while executing userPayload : `, { error });
    }

    return resposneHandler.success({
      req,
      res,
      data: result,
    });
  } catch (error) {
    logger(`Error occured in executor : `, { error });
    return resposneHandler.error({
      req,
      res,
    });
  }
};

const executeUserCode = async ({
  code,
}: {
  code: string;
}): Promise<{
  error?: any;
  result: string | null;
}> => {
  const nodeEnvironmentPath = path.join(process.cwd(), "environments/node");
  const userDirName = "userDirectory";
  const fileName = "userCode";
  const pathToUserDir = path.join(process.cwd(), userDirName);
  const pathToUserCode = path.join(pathToUserDir, fileName);

  try {
    if (!code) {
      return {
        result: null,
        error: " Missing code ",
      };
    }

    logger(`Making user directory ...`);
    mkdirSync(pathToUserDir);

    logger(`Copy node binary & ldd files ...`);
    execSync(`cp -r ${nodeEnvironmentPath}/* ${pathToUserDir}`);

    logger(`Prettify User Code`);
    const { error: prettifiedError, result: prettifiedCode } =
      await prettifyCode({ code });
    if (prettifiedError || !prettifiedCode) {
      logger(`Error occured while prettifying code : `, {
        prettifiedError,
        prettifiedCode,
      });
      throw prettifiedError;
    }

    logger(`Writing user code to file...`);
    writeFileSync(pathToUserCode, prettifiedCode);

    logger(`---=> Forking / Namespaces / Cgroups  <=---`);

    logger(`===================`);
    logger("Cerating Cgroup directory");
    mkdirSync("/sys/fs/cgroup/abc");
    logger(`===================`);

    logger(`Executing user code in a child process ...`);
    const executionResult = execSync(
      `unshare -U -u -p -f -n -m -r chroot ./userDirectory node userCode`,
    );

    logger(`Removing user directory ...`);
    rmSync(pathToUserDir, { recursive: true, force: true });

    const result = executionResult.toString();
    return { result };
  } catch (error: any) {
    logger(`Error occured while executing User Code : `, { error });
    logger(`Removing user directory ...`);
    rmSync(pathToUserDir, { recursive: true, force: true });
    return { error, result: null };
  }
};

export default executor;
