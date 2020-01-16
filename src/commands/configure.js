const { Command, flags } = require('@oclif/command');
const inquirer = require('inquirer');
const ConfigManagementService = require('../services/config.management.service');

class ConfigureCommand extends Command {
  async run() {
    const { flags } = this.parse(ConfigureCommand);

    let username = '';
    let password = '';
    const configManagementService = new ConfigManagementService();

    configManagementService.createGlobalConfigDir();

    if (flags.username && flags.password) {
      // If username/password are given in flags, simply use them and accept the values.
      username = flags.username;
      password = flags.password;

      configManagementService.loadGlobalConfig();
      configManagementService.setUsername(username);
      configManagementService.setPassword(password);
      configManagementService.saveGlobalConfig();

      this.log(
        'Configuration completed. See [$home/.fortellis/config.yaml] file for stored values.'
      );
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

        configManagementService.loadGlobalConfig();
        configManagementService.setUsername(u);
        configManagementService.setPassword(p);
        configManagementService.saveGlobalConfig();

        this.log(
          'Configuration completed. See [$home/.fortellis/config.yaml] file for stored values.'
        );
      });
    }
  }
}

ConfigureCommand.description = `Configure Fortellis CLI.
...
Set up the credentials (username/password) and other global settings
for the fortellis CLI in this environment. This will allow it to 
communicate with Fortellis Platform.
`;

ConfigureCommand.flags = {
  username: flags.string({ char: 'u', description: 'Fortellis username' }),
  password: flags.string({ char: 'p', description: 'Fortellis password' })
};

module.exports = ConfigureCommand;
