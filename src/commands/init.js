const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const constants = require("../utils/constants");
const ConfigManagementService = require("../services/config.management.service");
const RepositoryService = require("../services/repository.service");

class InitCommand extends Command {
  async run() {
    const repoService = new RepositoryService();

    if (repoService.repoIsValid()) {
      this.error("This directory is already a Fortellis repository.");
      return 1;
    }

    if (!fs.existsSync(constants.configDir)) {
      fs.mkdirSync(constants.configDir);
    }

    if (!fs.existsSync(constants.docsDir)) {
      fs.mkdirSync(constants.docsDir);
    }

    if (!fs.existsSync(constants.authDir)) {
      fs.mkdirSync(constants.authDir);
    }

    if (!fs.existsSync(constants.specDir)) {
      fs.mkdirSync(constants.specDir);
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
A fortellis repository is a directory containing a ./.fortellis sub-directory. In this
sub-directory will be a config.yaml file which will eventually contain the configuration data
for the repository.
`;

module.exports = InitCommand;
