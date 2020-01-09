const yaml = require("js-yaml");
const fs = require("fs");

class ConfigManagementService {
  constructor() {
    this.username = "";
    this.password = "";
    this.specFiles = [];
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
      specifications: this.specFiles
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
      this.specFiles = data.specifications;
    } catch (err) {
      console.error("Error loading configuraiton: ", err);
    }
  }

  getSpecFilesFromConfig() {
    return this.specFiles;
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

  addSpecFile(fileName) {
    // Don't add the file again if it is already in the repo
    if (this.specFiles.indexOf(fileName) === -1) {
      this.specFiles.push(fileName);
    }
  }
}

module.exports = ConfigManagementService;
