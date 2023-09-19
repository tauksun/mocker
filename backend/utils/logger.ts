import { constants } from "../config";
import { currentDateTime } from "./dateTime";
import { appendFile } from "fs";
import { join } from "path";

const ENABLE_LOGGER = constants.ENABLE_LOGGER;

const logger = (...data: any) => {
  if (ENABLE_LOGGER) {
    console.log(currentDateTime(), " : ", ...data);
  }
};

type logType = "info" | "error";

logger.file = (type: logType, ...data: any) => {
  const now = JSON.stringify(currentDateTime()).split("T")[0];
  const pathToLogFile = join(process.cwd(), `logs/${type}-${now}`);

  let logContent = "";
  for (let i = 0; i < data.length; i++) {
    const logMessage = data[i];
    if (logMessage) {
      logContent += `\n${logMessage}`;
    }
  }

  if (!logContent) {
    return;
  }

  logContent = `${currentDateTime()} : ${logContent}`;

  if (ENABLE_LOGGER) {
    appendFile(pathToLogFile, JSON.stringify(logContent), (error) => {
      if (error) {
        logger(`Error occured while writing to log file : ${error}`);
      }
    });
  }
};

logger.f_info = (...data: any) => {
  logger.file("info", ...data);
};

logger.f_error = (...data: any) => {
  logger.file("error", ...data);
};

export default logger;
export { logger };
