const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const inquirer = require('inquirer');
const OrganizationService = require('../services/organization.service');
const constants = require('../utils/constants');
const ConfigManagementService = require('../services/config.management.service');
const RepositoryService = require('../services/repository.service');
const path = require('path');
const { ERRORS, toCommandError } = require('../utils/errors');

class InitCommand extends Command {
  async run() {
    const { flags } = this.parse(InitCommand);

    const repoService = new RepositoryService();

    if (repoService.repoIsValid()) {
      this.error(toCommandError(ERRORS.REPO_ALREADY_EXISTS));
    }

    const configManagementService = new ConfigManagementService();

    // Global config (credentials) must exist.
    if (!configManagementService.globalConfigDirExists()) {
      this.error(toCommandError(ERRORS.CONFIG_NOT_EXIST));
    }

    let configPath = path.join(process.cwd(), constants.configDirName);
    if (!fs.existsSync(configPath)) {
      fs.mkdirSync(configPath);
    }

    // If the values are passed in, just save without prompting
    if (flags.orgname && flags.orgid) {
      configManagementService.setOrgName(flags.orgname);
      configManagementService.setOrgId(flags.orgid);
      configManagementService.saveLocalConfig();

      this.log(
        `Initialized empty Fortellis repository in ${process.cwd()}/${
          constants.configDirName
        }/`
      );
    } else {
      configManagementService.saveLocalConfig();
      const orgService = new OrganizationService();
      orgService.getUserOrganizations().then(userOrgs => {
        const orgQuestion = [
          {
            type: 'list',
            name: 'organization',
            message: 'Select Organization:',
            choices: userOrgs
          }
        ];

        inquirer.prompt(orgQuestion).then(orgAnswers => {
          // Find the organization ID (from userOrgs) that
          // matches the name selected in the prompt.
          let theValue = userOrgs.find(x => x.name === orgAnswers.organization);
          // Create a new configuration object.
          configManagementService.setOrgId(theValue.id);
          configManagementService.setOrgName(theValue.name);
          configManagementService.saveLocalConfig();

          this.log(
            `Initialized Fortellis repository: ${process.cwd()}/${
              constants.configDirName
            }/`
          );
        });
      });

      this.log(
        `Initialized Fortellis repository: ${process.cwd()}/${
          constants.configDirName
        }/`
      );
    }
  }
}

InitCommand.description = `Create a Fortellis repository in the current directory.
...
A fortellis repository is a directory containing API Specs and a config directory
(/.fortellis) that holds the repo configuration file.
`;

InitCommand.flags = {
  orgname: flags.string({ char: 'n', description: 'Organization name' }),
  orgid: flags.string({ char: 'i', description: 'Organizatino ID' })
};

module.exports = InitCommand;
