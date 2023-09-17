import { constants } from "../config";
import { currentDateTime } from "./dateTime";

const ENABLE_LOGGER = constants.ENABLE_LOGGER;

const logger = (...data: any) => {
  if (ENABLE_LOGGER) {
    console.log(currentDateTime(), " : ", ...data);
  }
};

export default logger;
