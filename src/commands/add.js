const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const ConfigManagementService = require('../services/config.management.service');
const RepositoryService = require('../services/repository.service');

class AddCommand extends Command {
  async run() {
    const { flags } = this.parse(AddCommand);

    const repositoryService = new RepositoryService();

    // Verify that this is a Fortellis repo
    if (!repositoryService.repoIsValid()) {
      this.error('This is not a Fortellis repository.');
    }

    const configManagementService = new ConfigManagementService();
    configManagementService.loadConfig();

    let fileName = '';

    if (flags.apispec) {
      // Save a new Spec file to the config
      fileName = flags.apispec;
      // If the file name is specified, make sure it is a .yaml file.
      if (fileName.indexOf('.yaml') < 0) {
        fileName += '.yaml';
      }

      // Don't add a file if it isn't in the directory
      if (!fs.existsSync(`./${fileName}`)) {
        this.error(`${fileName} does not exist in this directory.`);
      }

      // Don't add the same spec twice
      if (configManagementService.specFiles.indexOf(`${fileName}`) > -1) {
        this.error(`${fileName} is already in the repository`);
      }
      configManagementService.addSpecFile(fileName);
    } else {
      this.error(
        'You must specifiy the type of flie to be added to the repository'
      );
    }

    configManagementService.saveConfig();

    this.log(`${fileName} has been added to the repository.`);
  }
}

AddCommand.description = `Add an item to the Fortellis repository.
...
Add an API Spec to the repository.
`;

AddCommand.flags = {
  apispec: flags.string({
    char: 'a',
    description: 'Add Spec file to the repostory'
  })
};

module.exports = AddCommand;
