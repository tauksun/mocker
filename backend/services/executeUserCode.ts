import { execSync } from "child_process";
import { writeFileSync, mkdirSync, rmSync } from "fs";
import path from "path";
import { logger } from "../utils";

const executeUserCode = async () => {
  const nodeEnvironmentPath = path.join(process.cwd(), "environments/node");
  const userDirName = "userDirectory";
  const fileName = "userCode";
  const pathToUserDir = path.join(process.cwd(), userDirName);
  const pathToUserCode = path.join(pathToUserDir, fileName);

  const processARGS = process.argv;
  const code = processARGS[2];

  try {
    if (!code) {
      return {
        result: null,
        error: " Missing code ",
      };
    }

    logger.f_info(`Making user directory ...`);
    mkdirSync(pathToUserDir);

    logger.f_info(`Copy node binary & ldd files ...`);
    execSync(`cp -r ${nodeEnvironmentPath}/* ${pathToUserDir}`);

    logger.f_info(`Writing user code to file...`);
    writeFileSync(pathToUserCode, Buffer.from(code));

    //
    // logger.f_info(`---=> Adding process to cgroup <=---`);
    // const cGroupCommand = `echo ${process.pid} >> tee /sys/fs/cgroup/testing/cgroup.procs`;

    logger.f_info(`---=> Forking / Namespaces <=---`);
    logger.f_info(`Executing user code in a child process ...`);
    const executionResult = execSync(
      `unshare -U -u -p -f -n -m -r chroot ./userDirectory node userCode`,
      {
        timeout: 3000,
      }
    );

    logger.f_info(`Removing user directory ...`);
    rmSync(pathToUserDir, { recursive: true, force: true });

    // console log stdout
    // such that it is visible outside child process
    console.log(executionResult.toString("utf8",0,executionResult.length-1));
    return;
  } catch (error: any) {
    logger.f_error(`Error occured while executing User Code : `, error);
    logger.f_error(`Removing user directory ...`);
    rmSync(pathToUserDir, { recursive: true, force: true });
    return;
  }
};

executeUserCode();
// export default executeUserCode;
