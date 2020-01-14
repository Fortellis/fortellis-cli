const { Command } = require('@oclif/command');
const fs = require('fs');
const ConfigManagementService = require('../services/config.management.service');
const RepositoryService = require('../services/repository.service');

const redColor = '\u001B[31m%s\u001B[0m';
const resetColor = '\u001B[0m%s';

class StatusCommand extends Command {
  async run() {
    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error('This is not a Fortellis repository.');
    }

    const configManagementService = new ConfigManagementService();
    configManagementService.loadConfig();

    let specFiles = configManagementService.getSpecFilesFromConfig();

    this.log('Organization:', configManagementService.orgName);
    this.log('Spec Files:');
    let messageColor = resetColor;
    if (specFiles.length > 0) {
      specFiles.forEach(item => {
        let apiSpecMessage = '';
        messageColor = resetColor;
        apiSpecMessage += `\t${item}`;
        if (!fs.existsSync(`./${item}`)) {
          messageColor = redColor;
          apiSpecMessage += ' - DELETED';
        }
        this.log(messageColor, apiSpecMessage);
      });
    }
  }
}

StatusCommand.description = `Output the status of the fortellis repository.
...
List all of the repository files and their status.
`;

module.exports = StatusCommand;
