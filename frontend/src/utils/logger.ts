const logger = (...data: any) => {
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
