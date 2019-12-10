const yaml = require("js-yaml");
const fs = require("fs");

class ConfigManagementService {
  constructor(username, password, specFileName) {
    this.username = username;
    this.password = password;
    this.specfileName = specFileName;
  }

  setConfig() {
    let configData = {
      authorization: {
        username: this.username,
        password: this.password
      },
      specification: {
        apiSpecFile: this.specfileName,
        apiDocsFile: "",
        apiAuthFile: ""
      },
      fortellisServer: "https://fortellis-dev.io",
      userId: "00u4ssqo8mToRxhxK2p7"
    };

    let yamlStr = yaml.safeDump(configData);
    fs.writeFileSync("./.fortellis/config.yaml", yamlStr, "utf8");
  }
}

module.exports = ConfigManagementService;
