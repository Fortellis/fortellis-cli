/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const constants = require('../utils/constants');

class RepositoryService {
  repoIsValid() {
    // Make sure the config directory is there.
    if (!fs.existsSync(constants.configDir)) {
      return false;
    }

    // Make sure the config file is there.
    let configFile = this.getFileFromDirectory(constants.configDir);
    if (configFile != `${constants.configFileName}`) {
      return false;
    }

    return true;
  }

  getFileFromDirectory(directory) {
    const files = fs.readdirSync(directory);

    if (files.length > 0) {
      return files[0];
    } else {
      return '';
    }
  }

  deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file, index) => {
        let curPath = path + '/' + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }

  getSpecInDirectory() {
    return this.getFileFromDirectory(constants.specDir);
  }

  deleteLocalRepository() {
    this.deleteFolderRecursive(constants.configDir);
  }
}

module.exports = RepositoryService;
