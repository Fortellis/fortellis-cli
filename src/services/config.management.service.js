/* eslint-disable no-console */
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

  loadGlobalConfig() {
    try {
      let fileContents = fs.readFileSync(
        `${homedir}/${constants.configDirName}/${constants.configFileName}`
      );
      let credData = yaml.safeLoad(fileContents);

      this.username = credData.username;
      this.password = credData.password;
    } catch (error) {
      console.error('Error loading credentials:', error);
    }
  }

  loadLocalConfig() {
    try {
      let fileContents = fs.readFileSync(
        `${constants.configDir}/${constants.configFileName}`
      );
      let data = yaml.safeLoad(fileContents);
      this.orgId = data.organization.orgId;
      this.orgName = data.organization.orgName;
      this.specFiles = data.specifications;
    } catch (error) {
      console.error('Error loading configuraiton: ', error);
    }
  }

  saveGlobalConfig() {
    let credData = {
      username: this.username,
      password: this.password
    };

    let yamlStr = yaml.safeDump(credData);
    fs.writeFileSync(
      `${homedir}/${constants.configDirName}/${constants.configFileName}`,
      yamlStr,
      'utf8'
    );
  }

  saveLocalConfig() {
    let configData = {
      organization: {
        orgId: this.orgId,
        orgName: this.orgName
      },
      specifications: this.specFiles
    };

    let yamlStr = yaml.safeDump(configData);
    fs.writeFileSync(
      `${constants.configDir}/${constants.configFileName}`,
      yamlStr,
      'utf8'
    );
  }

  globalConfigDirExists() {
    if (fs.existsSync(`${homedir}/${constants.configDirName}`)) {
      return true;
    }

    return false;
  }

  createGlobalConfigDir() {
    if (!this.globalConfigDirExists()) {
      fs.mkdirSync(`${homedir}/${constants.configDirName}`);
      this.saveGlobalConfig();
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
