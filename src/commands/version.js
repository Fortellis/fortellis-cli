const { Command } = require('@oclif/command');
const { version } = require('../../src/utils/constants');

class VersionCommand extends Command {
  async run() {
    this.log(
      `fortellis cli version ${version.major}.${version.minor}.${version.patch}`
    );
  }
}

VersionCommand.description = `Outputs the version of the fortellis cli.
...
Outputs the version of the fortellis cli.
`;

module.exports = VersionCommand;
