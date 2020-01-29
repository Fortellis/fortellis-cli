/* eslint-disable no-unused-vars */
const { Command } = require('@oclif/command');
const fs = require('fs');
const ConfigManagementService = require('../services/config.management.service');
const RepositoryService = require('../services/repository.service');
const path = require('path');
const { ERRORS, toCommandError } = require('../utils/errors');
const colors = require('colors');

class StatusCommand extends Command {
  async run() {
    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error(...toCommandError(ERRORS.REPO_INVALID));
    }

    const configManagementService = new ConfigManagementService();
    configManagementService.loadLocalConfig();

    let specFiles = configManagementService.getSpecFilesFromConfig();

    this.log('Organization:', configManagementService.orgName);
    this.log('Spec Files:');
    if (specFiles.length > 0) {
      specFiles.forEach(item => {
        let deleted = false;
        let apiSpecMessage = '';
        apiSpecMessage += `\t${item}`;
        if (!fs.existsSync(path.join(process.cwd(), item))) {
          apiSpecMessage += ' - DELETED';
          deleted = true;
        }
        if (deleted) {
          this.log(apiSpecMessage.red);
        } else {
          this.log(apiSpecMessage.reset);
        }
      });
    }
  }
}

StatusCommand.description = `Output the status of the fortellis repository.
...
List all of the repository files and their status.
`;

module.exports = StatusCommand;
