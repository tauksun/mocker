// @ts-nocheck
import { useEffect, useState } from "react";
import { selfURL } from "../config/constants";
import { constants } from "../config/index";
import {
  prettifyCode,
  getApiData,
  storeApiData,
  testExecute,
} from "../functions";

import CustomButton from "./button";
import Heading from "./heading";

function Userpage() {
  const [apiId, setApiId] = useState("");
  const [userCode, setUserCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [prettifyError, setPrettifyError] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const modifyUserCode = () => {
    const userCodeDiv = "userCodeTextArea";
    const codeValue = document.getElementById(userCodeDiv)?.value || "";
    setUserCode(codeValue);
  };

  const prettifyUserCode = async () => {
    let isCodeValid = false;
    const { error, prettifyError, formattedCode } = await prettifyCode({
      code: userCode,
    });
    if (error || prettifyError) {
      setPrettifyError(prettifyError || error);
    } else {
      setFormattedCode(formattedCode);
      setUserCode(formattedCode);
      isCodeValid = true;
    }
    return isCodeValid;
  };

  const saveCode = async () => {
    const isCodeValid = await prettifyUserCode();

    // Execute
    if (isCodeValid) {
      const { error } = await storeApiData({
        apiId,
        code: userCode,
      });
      if (error) {
        setApiResponse(error);
      } else {
        setApiResponse("Saved Successfully.");
      }
    }
  };

  const executeCode = async () => {
    // Prettify
    const isCodeValid = await prettifyUserCode();

    // Execute
    if (isCodeValid) {
      const { error, data } = await testExecute({
        apiId,
        code: userCode,
      });
      if (!error) {
        setApiResponse(JSON.stringify(data));
      } else {
        setApiResponse(JSON.stringify(error));
      }
    }
  };

  const gotoHomePage = () => {
    const homepageURL = constants.selfURL;
    window.location.href = homepageURL;
  };

  useEffect(() => {
    const currentURL = window.location.href;
    const urlParamerters = currentURL && currentURL.split("/");
    let apiId = "";
    for (let i = 0; i < urlParamerters.length; i++) {
      const param = urlParamerters[i];
      if (param === "api") {
        apiId = urlParamerters[i + 1];
      }
    }
    if (apiId) {
      setApiId(apiId);
    }
  }, []);

  useEffect(() => {
    if (apiId) {
      (async () => {
        try {
          const { error, data } = await getApiData({
            apiId,
          });
          if (error) {
            throw error;
          }
          const { code = "" } = data;
          setUserCode(code);
        } catch (error: any) {
          setApiResponse(error);
        }
      })();
    }
  }, [apiId]);

  useEffect(() => {
    const specificError = {
      error: "Formatting ERROR",
      cause: prettifyError?.cause,
      codeFrame: prettifyError?.codeFrame,
    };
    prettifyError && setApiResponse(JSON.stringify(specificError));
  }, [prettifyError]);

  useEffect(() => {
    setUserCode(formattedCode);
  }, [formattedCode]);

  return (
    <div id="userPageParent">
      {" "}
      <div id="userPage">
        <div id="userCode">
          <div id="userCodeArea">
            <Heading text="Code" type="h5" />
            <textarea
              id="userCodeTextArea"
              name="apiCode"
              autoFocus
              rows="18"
              cols="48"
              onChange={modifyUserCode}
              value={userCode}
              spellcheck="false"
            ></textarea>
          </div>
        </div>
        <div id="optionsAndResponse">
          <div id="optionsAndResponseArea">
            <Heading text="Response" type="h5" />
            <textarea
              id="responseTextArea"
              name="apiResponse"
              rows="8"
              cols="48"
              value={apiResponse}
              spellcheck="false"
            ></textarea>
          </div>
          <div id="optionsAndResponseOptions">
            <br />
            <CustomButton
              text="Save"
              variant="warning"
              onClickFunc={saveCode}
            />
            <br />
            <CustomButton
              text="Execute"
              variant="warning"
              onClickFunc={executeCode}
            />
            <br />
            <CustomButton
              text="Homepage"
              variant="dark"
              onClickFunc={gotoHomePage}
            />
            <br />
            <div>
              <Heading text={"Method : POST"} type="h5" />
              <hr></hr>
              <Heading
                text={"URL : " + `${selfURL}/api/execute/${apiId}/`}
                type="h5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userpage;
