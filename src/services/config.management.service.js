const yaml = require('js-yaml');
const homedir = require('os').homedir();
const fs = require('fs');
const constants = require('../utils/constants');

class ConfigManagementService {
  constructor() {
    this.username = '';
    this.password = '';
    this.specFiles = [];
    this.orgId = '';
    this.orgName = '';
  }

  loadCredentials() {
    try {
      let fileContents = fs.readFileSync(`${homedir}/.fortellis/config.yaml`);
      let credData = yaml.safeLoad(fileContents);

      this.username = credData.username;
      this.password = credData.password;
    } catch (error) {
      console.error('Error loading credentials:', error);
    }
  }

  saveCredentials() {
    let credData = {
      username: this.username,
      password: this.password
    };

    let yamlStr = yaml.safeDump(credData);
    fs.writeFileSync(`${homedir}/.fortellis/config.yaml`, yamlStr, 'utf8');
  }

  saveConfig() {
    this.saveCredentials();
    let configData = {
      organization: {
        orgId: this.orgId,
        orgName: this.orgName
      },
      specifications: this.specFiles
    };

    let yamlStr = yaml.safeDump(configData);
    fs.writeFileSync(`${constants.configDir}/config.yaml`, yamlStr, 'utf8');
  }

  loadConfig() {
    this.loadCredentials();
    try {
      let fileContents = fs.readFileSync(`${constants.configDir}/config.yaml`);
      let data = yaml.safeLoad(fileContents);
      this.orgId = data.organization.orgId;
      this.orgName = data.organization.orgName;
      this.specFiles = data.specifications;
    } catch (error) {
      console.error('Error loading configuraiton: ', error);
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

  setOrgName(value) {
    this.orgName = value;
  }

  addSpecFile(fileName) {
    // Don't add the file again if it is already in the repo
    if (this.specFiles.indexOf(fileName) === -1) {
      this.specFiles.push(fileName);
    }
  }
}

module.exports = ConfigManagementService;
