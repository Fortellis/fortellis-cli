const { Command, flags } = require('@oclif/command');
const inquirer = require('inquirer');
const ConfigManagementService = require('../services/config.management.service');
const AuthorizationService = require('../services/authorization.service');

/**
 * This globally configures fortellis-cli with a temporary access token.
 * It will create a file: $HOME/.fortellis/config.yaml
 * The file will have the structure:
 * {
 *    uid: <fortellis uid>
 *    token: <fortellis auth token>
 * }
 */
class ConfigureCommand extends Command {
  async run() {
    const { flags } = this.parse(ConfigureCommand);

    const configManagementService = new ConfigManagementService();
    const authService = new AuthorizationService();

    configManagementService.createGlobalConfigDir();

    if (flags.username && flags.password) {
      // If username/password are given in flags, simply use them and accept the values.

      let authToken = await authService(flags.username, flags.password);

      configManagementService.loadGlobalConfig();
      configManagementService.setToken(authToken);
      configManagementService.saveGlobalConfig();

      this.log(
        'Configuration completed. See [$home/.fortellis/config.yaml] file for stored values.'
      );
    } else {
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

        authService.getAuthToken(u, p).then(authToken => {
          configManagementService.loadGlobalConfig();
          configManagementService.setToken(authToken);
          configManagementService.saveGlobalConfig();
        });

        this.log(
          'Configuration completed. See [$HOME/.fortellis/config.yaml] file for stored values.'
        );
      });
    }
  }
}

ConfigureCommand.description = `Configure Fortellis CLI.
...
Set up the credentials and other global settings for 
the Fortellis CLI in this environment. This will allow it to 
communicate with Fortellis Platform.
`;

ConfigureCommand.flags = {
  username: flags.string({ char: 'u', description: 'Fortellis username' }),
  password: flags.string({ char: 'p', description: 'Fortellis password' })
};

module.exports = ConfigureCommand;
