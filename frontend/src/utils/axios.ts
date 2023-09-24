import axios from "axios";
import logger from "./logger";

const networkCall = async ({
  method,
  url,
  headers,
  payload,
}: {
  method: string;
  url: string;
  headers?: {
    [key: string]: string;
  };
  payload?: {
    [key: string]: string;
  };
}) => {
  try {
    const defaultHeaders = {
      "content-type": "application/json",
    };
    const response = await axios({
      method,
      url,
      headers: headers || defaultHeaders,
      data: payload || {},
    });
    const data = response.data;
    return {
      error: null,
      data,
    };
  } catch (error: any) {
    logger.error(`Error occured while making network call : `, { error });
    const apiError = error?.response?.data;
    return { error: apiError || error, data: null };
  }
};

export default networkCall;
