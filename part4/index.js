const app = require("./app");
const config = require("./utils/config");
const server = require("http").createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server is running on ${config.PORT}`);
});
