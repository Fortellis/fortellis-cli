/* eslint-disable node/no-unsupported-features/node-builtins */
const { Command } = require('@oclif/command');
const constants = require('../utils/constants');
const fs = require('fs');
const path = require('path');

//
// Writes a template Open API 2.0 document to the current directory.
//
class ApiTemplateCommand extends Command {
  async run() {
    try {
      const src = path.resolve(
        `${__dirname}/../resources/${constants.sampleSpecName}`
      );
      const dst = path.resolve(process.cwd(), constants.sampleSpecName);
      fs.copyFileSync(src, dst);
      this.log(`Template spec created: ${constants.sampleSpecName}`);
    } catch (error) {
      this.error(
        `Error copying template API specification file: ${error.message}`
      );
    }
  }
}

ApiTemplateCommand.description = `Writes a template Open API 2.0 document to the current directory.
...
Writes a template Open API 2.0 document to the current directory that the user can then modify for API development.
`;

module.exports = ApiTemplateCommand;
