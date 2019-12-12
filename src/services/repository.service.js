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

  getSpecInDirectory() {
    return this.getFileFromDirectory(constants.specDir);
  }

  getDocsInDirectory() {
    return this.getFileFromDirectory(constants.docsDir);
  }

  getAuthInDirectory() {
    return this.getFileFromDirectory(constants.authDir);
  }
}

module.exports = RepositoryService;
