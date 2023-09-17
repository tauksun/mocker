const environmentVariables = process.env;

const PORT = environmentVariables.PORT
  ? parseInt(environmentVariables.PORT)
  : 9876;

const ENABLE_LOGGER = environmentVariables.LOGGER === "true" ? true : false;

const constants = {
  PORT,
  ENABLE_LOGGER,
};

export default constants;
