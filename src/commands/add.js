const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const ConfigManagementService = require('../services/config.management.service');
const RepositoryService = require('../services/repository.service');
const path = require('path');

class AddCommand extends Command {
  async run() {
    const { flags, args } = this.parse(AddCommand);

    const repositoryService = new RepositoryService();

    // Verify that this is a Fortellis repo
    if (!repositoryService.repoIsValid()) {
      this.error(
        `This is not a Fortellis repository. Run 'fortellis-cli init' to create a new repository.`
      );
    }

    const configManagementService = new ConfigManagementService();
    configManagementService.loadLocalConfig();

    let fileName = '';

    if (flags.apispec) {
      // Save a new Spec file to the config
      fileName = args.file;

      // If the file name is specified, make sure it is a .yaml file.
      if (fileName.indexOf('.yaml') < 0 && fileName.indexOf('.yml') < 0) {
        fileName += '.yaml';
      }

      // Don't add a file if it isn't in the directory
      let addFile = path.join(process.cwd(), fileName);
      if (!fs.existsSync(addFile)) {
        this.error(`${fileName} does not exist in this directory.`);
      }

      // Don't add the same spec twice
      if (configManagementService.specFiles.indexOf(`${fileName}`) > -1) {
        this.error(`${fileName} is already in the repository`);
      }
      configManagementService.addSpecFile(fileName);
    } else {
      this.error(
        'You must specify the type of flie to be added to the repository'
      );
    }

    configManagementService.saveLocalConfig();

    this.log(`${fileName} has been added to the repository.`);
  }
}

AddCommand.args = [
  {
    name: 'file',
    required: true,
    description: 'Path of file to be pushed.'
  }
];

AddCommand.flags = {
  apispec: flags.boolean({
    char: 's',
    description: 'Add API Spec file to the repostory'
  })
};

AddCommand.description = `Add an item to the Fortellis repository.
...
Add a file to the repository.
Currently supported file types:
 - API spec files (-s) 
`;

module.exports = AddCommand;
