import { Sequelize } from "sequelize";
import { constants } from "../config";
import { logger } from "../utils";

let connectionToDB: any = null;

const connectToDB = () => {
  const { DB_HOST, DB_PORT, DATABASE, USER, PASSWORD } = constants.DB;

  const sequelize = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    database: DATABASE,
    username: USER,
    password: PASSWORD,
    dialect: "postgres",
  });
  connectionToDB = sequelize;
  authenticate(sequelize);
  return sequelize;
};

const authenticate = (sequelize: any) => {
  try {
    sequelize.authenticate();
    logger("Successfully connected to DB");
  } catch (error) {
    logger("Error occured while connecting with DB");
  }
};

const getDBConnection = () => {
  if (connectionToDB) {
    return connectionToDB;
  }
  return connectToDB();
};

export { connectToDB, getDBConnection };
