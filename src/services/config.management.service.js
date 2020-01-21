/* eslint-disable no-console */
const yaml = require('js-yaml');
const homedir = require('os').homedir();
const fs = require('fs');
const constants = require('../utils/constants');
const path = require('path');

class ConfigManagementService {
  constructor() {
    this.username = '';
    this.password = '';
    this.token = ''; // Token is a JSON object with the structure { uid: <userId>, token: <authentication token> }
    this.specFiles = [];
    this.orgId = '';
    this.orgName = '';
  }

  loadGlobalConfig() {
    try {
      let fileContents = fs.readFileSync(
        path.join(homedir, constants.configDirName, constants.configFileName)
      );
      let credData = yaml.safeLoad(fileContents);

      this.token = credData.token;
    } catch (error) {
      console.error('Error loading credentials:', error);
    }
  }

  loadLocalConfig() {
    let configFile = path.join(
      process.cwd(),
      constants.configDirName,
      constants.configFileName
    );
    if (fs.existsSync(configFile)) {
      try {
        let fileContents = fs.readFileSync(configFile);
        let data = yaml.safeLoad(fileContents);
        this.orgId = data.organization.orgId;
        this.orgName = data.organization.orgName;
        this.specFiles = data.specifications;
      } catch (error) {
        console.error('Error loading configuraiton: ', error);
      }
    }
  }

  saveGlobalConfig() {
    let credData = {
      token: this.token
    };

    let yamlStr = yaml.safeDump(credData);
    fs.writeFileSync(
      path.join(homedir, constants.configDirName, constants.configFileName),
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
      path.join(
        process.cwd(),
        constants.configDirName,
        constants.configFileName
      ),
      yamlStr,
      'utf8'
    );
  }

  globalConfigDirExists() {
    if (fs.existsSync(path.join(homedir, constants.configDirName))) {
      return true;
    }

    return false;
  }

  createGlobalConfigDir() {
    if (!this.globalConfigDirExists()) {
      fs.mkdirSync(path.join(homedir, constants.configDirName));
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

  // The config token has two properties uid and token.
  setToken(value) {
    this.token = value;
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
