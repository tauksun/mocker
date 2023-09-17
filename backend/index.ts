import server from "./server";
import { constants } from "./config";

const port = constants.PORT;

server.listen(port, () => console.log(`Server running on ${port}`));
