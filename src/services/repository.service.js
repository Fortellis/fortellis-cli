/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const constants = require('../utils/constants');
const path = require('path');

class RepositoryService {
  repoIsValid() {
    let localConfigDir = path.join(process.cwd(), constants.configDirName);
    // Make sure the config directory is there.
    if (!fs.existsSync(localConfigDir)) {
      return false;
    }

    // Make sure the config file is there.
    let configFile = this.getFileFromDirectory(localConfigDir);
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

  deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file, index) => {
        let curPath = path.join(folderPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(folderPath);
    }
  }

  deleteLocalRepository() {
    this.deleteFolderRecursive(
      path.join(process.cwd(), constants.configDirName)
    );
  }
}

module.exports = RepositoryService;
