const { Command, flags } = require('@oclif/command');
const inquirer = require('inquirer');
const ConfigManagementService = require('../services/config.management.service');
const OrganizationService = require('../services/organization.service');
const RepositoryService = require('../services/repository.service');

class ConfigureCommand extends Command {
  async run() {
    const { flags } = this.parse(ConfigureCommand);

    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error('This is not a Fortellis repository.');
    }

    let username = '';
    let password = '';
    let organizationId = '';
    const configManagementService = new ConfigManagementService();

    if (flags.username && flags.password && flags.orgid) {
      // If username/password are given in flags, simply use them and accept the values.
      username = flags.username;
      password = flags.password;
      organizationId = flags.orgid;

      configManagementService.loadConfig();
      configManagementService.setUsername(username);
      configManagementService.setPassword(password);
      configManagementService.setOrgId(organizationId);
      configManagementService.saveConfig();

      this.log('Configuration completed. See config file for stored values.');
    } else {
      // This literal list of organizations needs to eventually be a list created
      // by a call to Fortellis with the provided username/password. It will then
      // display the names, but save the organizationId

      const authQuestions = [
        {
          type: 'input',
          name: 'fortellisUsername',
          message: 'username:'
        },
        {
          type: 'password',
          name: 'fortellisPassword',
          message: 'password:'
        }
      ];

      inquirer.prompt(authQuestions).then(authAnswers => {
        let u = authAnswers.fortellisUsername;
        let p = authAnswers.fortellisPassword;

        configManagementService.loadConfig();
        configManagementService.setUsername(u);
        configManagementService.setPassword(p);
        configManagementService.saveConfig();

        const orgService = new OrganizationService();
        orgService.getOrganizations().then(userOrgs => {
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
            let theValue = userOrgs.find(
              x => x.name === orgAnswers.organization
            );
            configManagementService.setOrgId(theValue.id);
            configManagementService.setOrgName(theValue.name);
            configManagementService.saveConfig();
          });
        });
      });
    }
  }
}

ConfigureCommand.description = `Configure the Fortellis repository.
...
Set up the repository so it can communicate with Fortellis. This command will edit the
config.yaml file, reflecting the data entered during configuration.
`;

ConfigureCommand.flags = {
  username: flags.string({ char: 'u', description: 'Fortellis username' }),
  password: flags.string({ char: 'p', description: 'Fortellis password' }),
  orgid: flags.string({ char: 'o', description: 'Fortellis organization ID' })
};

module.exports = ConfigureCommand;
