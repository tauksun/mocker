import CustomButton from "./button";
import Heading from "./heading";
import { createApi } from "../functions";
import { showMessageToUsers } from "../utils";
import { constants } from "../config";

async function createApiAndRedirectToUserPage() {
  const { error, data } = await createApi();
  if (error) {
    return showMessageToUsers({ message: JSON.stringify(error) });
  }
  const { id } = data;
  const { selfURL } = constants;
  const newApiURL = `${selfURL}/api/${id}`;
  window.location.replace(newApiURL);
}

function Homepage() {
  return (
    <>
      <img src="/shadowClone.png" height="250" width="250" />
      <div id="homepageHeading">
        <Heading type="h1" text="Shadow Clone" />
      </div>
      <div id="homepageButton">
        <CustomButton
          onClickFunc={createApiAndRedirectToUserPage}
          text="Create Api"
          variant="warning"
        />
      </div>
    </>
  );
}

export default Homepage;
