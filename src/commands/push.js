/* eslint-disable no-unused-vars */
const { Command, flags } = require('@oclif/command');
const RepositoryService = require('../services/repository.service');
const AuthorizationService = require('../services/authorization.service');
const ConfigManagementService = require('../services/config.management.service');
const fs = require('fs');
const axios = require('axios');
const constants = require('../utils/constants');
const path = require('path');
const { ERRORS, toCommandError } = require('../utils/errors');

class PushCommand extends Command {
  async run() {
    const { flags } = this.parse(PushCommand);

    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error(...toCommandError(ERRORS.REPO_INVALID));
    }

    if (!flags.file) {
      this.error(...toCommandError(ERRORS.FILE_NOT_GIVEN));
    }

    if (!flags.apispec) {
      this.error(...toCommandError(ERRORS.FILE_TYPE_NOT_GIVEN));
    }

    // Get local repo config (spec file names and orgId)
    const configService = new ConfigManagementService();
    configService.loadLocalConfig();

    // Make sure the spec is registered in the repo
    if (configService.getSpecFilesFromConfig().indexOf(flags.file) > -1) {
      this.log(`Pushing ${flags.file} to Fortellis...`);

      try {
        // Get the spec contents
        let specFile = path.join(process.cwd(), flags.file);
        let specString = fs.readFileSync(specFile, 'utf8');
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
          configService.loadGlobalConfig();
          token = configService.token;
        }

        let cliPushUrl = `${constants.fortellisShimURL}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token.token}`
          }
        };

        // Send the push request to Fortellis
        axios
          .post(cliPushUrl, payload, config)
          .then(response => {
            this.log('File was successfully pushed', response.data);
          })
          .catch(error => {
            if (error.response.status === 422) {
              this.error(...toCommandError(ERRORS.UNEXPECTED_AXIOS_ERROR, 'Malformed push spec request', error));
            } else if (error.response.status === 403) {
              this.error(...toCommandError(ERRORS.AUTH_ERROR));
            } else {
              this.error(...toCommandError(ERRORS.UNEXPECTED_AXIOS_ERROR, 'Error pushing spec file'));
            }
          });
      } catch (error) {
        this.error(...toCommandError(ERRORS.UNEXPECTED_ERROR, `Unable to push spec to Fortellis: ${error.message}`));
      }
    } else {
      this.error(...toCommandError(FILE_NOT_ADDED, flags.file));
    }
  }
}

PushCommand.description = `Push specified file to fortellis.
...
Publish the file (spec, documentation, etc.) to Fortellis: either 
an update of an existing file in DRAFT status, or a new version 
in FINAL status.

Pass in a username/password to explicitly publish with a given user. Otherwise
the username/password configured in the enviromment (see fortellis-cli configure)
will be used.

A flag must be used to specify the kind of file to be pushed.
 -s --apispec
`;

PushCommand.flags = {
  apispec: flags.boolean({
    char: 's',
    description: 'Push API Spec file to Fortellis'
  }),
  username: flags.string({ char: 'u', description: 'Fortellis username' }),
  password: flags.string({ char: 'p', description: 'Fortellis password' }),
  file: flags.string({ char: 'f' })
};

module.exports = PushCommand;
