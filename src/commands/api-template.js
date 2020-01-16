/* eslint-disable node/no-unsupported-features/node-builtins */
const { Command } = require('@oclif/command');
const RepositoryService = require('../services/repository.service');
const ConfigManagementService = require('../services/config.management.service');
const constants = require('../utils/constants');
const fs = require('fs');

/**
 * Create a template repository, with a sample Spec, Doc, and Permissions file.
 *
 * This command should not be able to override files that have already been saved to the repository.
 * In fact, it should only be usable on an empty repo.
 *
 */
class ApiTemplateCommand extends Command {
  async run() {
    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error('This is not a Fortellis repository.');
    }

    fs.copyFileSync(
      `${__dirname}/../resources/${constants.sampleSpecName}`,
      constants.sampleSpecName,
      err => {
        if (err) {
          this.error('Error copying template API spec file:', err);
        }
      }
    );

    const configService = new ConfigManagementService();
    configService.loadLocalConfig();
    configService.addSpecFile(constants.sampleSpecName);
    configService.saveLocalConfig();

    this.log(`Template spec created: ${constants.sampleSpecName}`);
  }
}

ApiTemplateCommand.description = `Put example template documents into an empty repository.
...
This creates sample spec, documentaiton, and permissions documents that the user can then modify for API development.
`;

module.exports = ApiTemplateCommand;
