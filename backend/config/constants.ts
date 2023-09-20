const environmentVariables = process.env;

const PORT = environmentVariables.PORT
  ? parseInt(environmentVariables.PORT)
  : 9876;

const ENABLE_LOGGER = environmentVariables.LOGGER === "true" ? true : false;

const DB_HOST = environmentVariables.DB_HOST;
const DB_PORT = environmentVariables.DB_PORT
  ? parseInt(environmentVariables.DB_PORT)
  : 5432;
const DATABASE = environmentVariables.DATABASE;
const USER = environmentVariables.DB_USER;
const PASSWORD = environmentVariables.PASSWORD;

const constants = {
  PORT,
  ENABLE_LOGGER,
  DB: {
    DB_HOST,
    DB_PORT,
    DATABASE,
    USER,
    PASSWORD,
  },
};

export default constants;
