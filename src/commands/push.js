/* eslint-disable no-unused-vars */
const { Command, flags } = require('@oclif/command');
const RepositoryService = require('../services/repository.service');
const AuthorizationService = require('../services/authorization.service');
const ConfigManagementService = require('../services/config.management.service');
const fs = require('fs');
const axios = require('axios');
const constants = require('../utils/constants');

class PushCommand extends Command {
  async run() {
    const { flags } = this.parse(PushCommand);

    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error('This is not a Fortellis repository.');
    }

    // Get local repo config (spec file names and orgId)
    const configService = new ConfigManagementService();
    configService.loadLocalConfig();

    if (flags.file) {
      // Make sure the spec is registered in the repo
      if (configService.getSpecFilesFromConfig().indexOf(flags.file) > -1) {
        this.log(`Pushing ${flags.file} to Fortellis...`);

        // Get the spec contents
        let specString = fs.readFileSync(`${flags.file}`, 'utf8');
        let payload = {
          spec: specString
        };

        // Get the auth token
        const authService = new AuthorizationService();
        let token = '';
        if (flags.username && flags.password) {
          token = await authService.getAuthToken(
            flags.username,
            flags.password
          );
        } else {
          token = await authService.getAuthToken();
        }

        let cliPushUrl = `${constants.fortellisShimURL}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token.token}`
          }
        };

        try {
          // Send the push request to Fortellis
          let res = await axios.post(cliPushUrl, payload, config);
        } catch (error) {
          this.error('Error pushing spec file:', error);
        }
      } else {
        this.error(`${flags.file} is not in the local repository.`);
      }
    } else {
      this.error('You must specify a spec filename.');
    }
  }
}

PushCommand.description = `Push specified api spec to fortellis.
...
Publish the API spec to Fortellis: either an update of an existing spec
in DRAFT status, or a new version of a spec in FINAL status.

Pass in a username/password to explicitly publish with a given user. Otherwise
the username/password configured in the enviromment (see fortellis-cli configure)
will be used.
`;

PushCommand.flags = {
  username: flags.string({ char: 'u', description: 'Fortellis username' }),
  password: flags.string({ char: 'p', description: 'Fortellis password' }),
  file: flags.string({ char: 'f' })
};

module.exports = PushCommand;
