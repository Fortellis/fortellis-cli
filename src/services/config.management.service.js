const yaml = require("js-yaml");
const fs = require("fs");

class ConfigManagementService {
  constructor() {
    this.username = "";
    this.password = "";
    this.specFileName = "";
    this.docFileName = "";
    this.authFileName = "";
    this.orgId = "";
  }

  saveConfig() {
    let configData = {
      authorization: {
        username: this.username,
        password: this.password
      },
      organization: {
        orgId: this.orgId
      },
      specification: {
        apiSpecFile: this.specFileName,
        apiDocsFile: this.docFileName,
        apiAuthFile: this.authFileName
      }
    };

    let yamlStr = yaml.safeDump(configData);
    fs.writeFileSync("./.fortellis/config.yaml", yamlStr, "utf8");
  }

  loadConfig() {
    try {
      let fileContents = fs.readFileSync("./.fortellis/config.yaml");
      let data = yaml.safeLoad(fileContents);

      this.username = data.authorization.username;
      this.password = data.authorization.password;
      this.orgId = data.organization.orgId;
      this.specFileName = data.specification.apiSpecFile;
      this.docFileName = data.specification.apiDocsFile;
      this.authFileName = data.specification.apiAuthFile;
    } catch (err) {
      console.error("Error loading configuraiton: ", err);
    }
  }

  getFilesFromConfig() {
    let retVal = {
      apiSpecFile: this.specFileName,
      apiDocsFile: this.docFileName,
      apiAuthFile: this.authFileName
    };

    return retVal;
  }

  setUsername(name) {
    this.username = name;
  }

  setPassword(value) {
    this.password = value;
  }

  setOrgId(value) {
    this.orgId = value;
  }

  setSpecFile(fileName) {
    this.specFileName = fileName;
  }

  setDocFile(fileName) {
    this.docFileName = fileName;
  }

  setAuthFile(fileName) {
    this.authFileName = fileName;
  }
}

module.exports = ConfigManagementService;
