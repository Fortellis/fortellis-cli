const { Command } = require('@oclif/command');
const os = require('os');
const fs = require('fs');
const constants = require('../utils/constants');
const ConfigManagementService = require('../services/config.management.service');
const RepositoryService = require('../services/repository.service');

class InitCommand extends Command {
  async run() {
    const repoService = new RepositoryService();

    if (repoService.repoIsValid()) {
      this.error('This directory is already a Fortellis repository.');
    }

    let homeDir = os.homedir();
    if (!fs.existsSync(`${homeDir}/.fortellis`)) {
      fs.mkdirSync(`${homeDir}/.fortellis`);
    }

    if (!fs.existsSync(constants.configDir)) {
      fs.mkdirSync(constants.configDir);
    }

    // Create blank config and save it.
    const configManagementService = new ConfigManagementService();
    configManagementService.saveConfig();

    this.log(
      `Initialized empty Fortellis repository in ${process.cwd()}/.fortellis/`
    );
  }
}

InitCommand.description = `Create a Fortellis repository in the current directory.
...
A fortellis repository is a directory containing a spec, docs, permissions, and .fortellis sub-directory. 
In the .fortellis sub-directory will be a config.yaml file which will contain the configuration data
for the repository.
`;

module.exports = InitCommand;
