const fs = require("fs");
const constants = require("../utils/constants");

class RepositoryService {
  repoIsValid() {
    if (!fs.existsSync(constants.configDir)) {
      return false;
    }

    if (!fs.existsSync(constants.specDir)) {
      return false;
    }

    if (!fs.existsSync(constants.docsDir)) {
      return false;
    }

    if (!fs.existsSync(constants.authDir)) {
      return false;
    }
    return true;
  }

  getFileFromDirectory(directory) {
    const files = fs.readdirSync(directory);

    if (files.length > 0) {
      return files[0];
    } else {
      return "";
    }
  }

  deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file, index) => {
        let curPath = path + "/" + file;
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

  getDocsInDirectory() {
    return this.getFileFromDirectory(constants.docsDir);
  }

  getAuthInDirectory() {
    return this.getFileFromDirectory(constants.authDir);
  }

  deleteRepositoy() {
    this.deleteFolderRecursive(constants.specDir);
    this.deleteFolderRecursive(constants.docsDir);
    this.deleteFolderRecursive(constants.authDir);
    this.deleteFolderRecursive(constants.configDir);
  }
}

module.exports = RepositoryService;
