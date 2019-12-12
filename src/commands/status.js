const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const constants = require("../utils/constants");
const ConfigManagementService = require("../services/config.management.service");
const RepositoryService = require("../services/repository.service");

const redColor = "\x1b[31m%s\x1b[0m";
const resetColor = "\x1b[0m%s";

class StatusCommand extends Command {
  async run() {
    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error("This is not a Fortellis repository.");
      return 1;
    }

    const configManagementService = new ConfigManagementService();
    configManagementService.loadConfig();

    let specStatus = configManagementService.getFilesFromConfig();

    let apiSpecMessage = "\t         Spec File:\t";
    let messageColor = resetColor;
    if (specStatus.apiSpecFile) {
      // The repo config refrences a spec file, check to see if it is still there.
      apiSpecMessage += `${specStatus.apiSpecFile}`;
      if (!fs.existsSync(`${constants.specDir}/${specStatus.apiSpecFile}`)) {
        apiSpecMessage += " - DELETED";
        messageColor = redColor;
      } else {
      }
    } else {
      // There is no docs file in the config, check to see if a new file is in the directory.
      let repoFile = repoService.getSpecInDirectory();
      if (repoFile) {
        apiSpecMessage += `${repoFile} - ADDED`;
        messageColor = redColor;
      }
    }
    this.log(messageColor, apiSpecMessage);

    // Check status of documentation file
    let docsMessage = "\tDocumentation File:\t";
    messageColor = resetColor;
    if (specStatus.apiDocsFile) {
      // The repo config refrences a doc file, check to see if it is still there.
      docsMessage += `${specStatus.apiDocsFile}`;
      if (!fs.existsSync(`${constants.docsDir}/${specStatus.apiDocsFile}`)) {
        docsMessage += " - DELETED";
        messageColor = redColor;
      }
    } else {
      // There is no docs file in the config, check to see if a new file is in the directory.
      let repoFile = repoService.getDocsInDirectory();
      if (repoFile) {
        docsMessage += `${repoFile} - ADDED`;
        messageColor = redColor;
      }
    }
    this.log(messageColor, docsMessage);

    // Check status of permissions file.
    let authMessage = "\t  Permissions File:\t";
    messageColor = resetColor;
    if (specStatus.apiAuthFile) {
      // The repo config refrences a permissions file, check to see if it is still there.
      authMessage += `${specStatus.apiAuthFile}`;
      if (!fs.existsSync(`${constants.authDir}/${specStatus.apiAuthFile}`)) {
        authMessage += " - DELETED";
        messageColor = redColor;
      }
    } else {
      // There is no permissions file in the config, check to see if a new file is in the directory.
      let repoFile = repoService.getAuthInDirectory();
      if (repoFile) {
        authMessage += `${repoFile} - ADDED`;
        messageColor = redColor;
      }
    }
    this.log(messageColor, authMessage);
  }
}

StatusCommand.description = `Initialize a Fortellis repository in the current directory.
...
This creates a .fortellis directory and creates a default config.yaml file.
`;

module.exports = StatusCommand;
