const isLog = false;
const logger = (...data: any) => {
  if (!isLog) {
    return;
  }
  const now = new Date();
  console.log(now, " : ", ...data);
};

logger.success = (...data: any) => {
  logger("## success ##", data);
};

logger.error = (...data: any) => {
  logger("## error ##", data);
};

export default logger;
