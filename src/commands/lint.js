const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const constants = require("../utils/constants");
const ConfigManagementService = require("../services/config.management.service");
const specValidator = require("../services/specValidator");

const redColor = "\x1b[31m%s\x1b[0m";
const resetColor = "\x1b[0m%s";

class LintCommand extends Command {
  //   async validateSpec(contents, options) {
  //     const validationErrors = await specValidator.validate(contents, options);

  //     return validationErrors;
  //   }

  async run() {
    const { flags } = this.parse(LintCommand);

    let configService = new ConfigManagementService();
    configService.loadConfig();

    const specFileName = configService.specFileName;
    this.log("Spec File:", specFileName);

    // Load the spec file for linting.
    const specFileContents = fs.readFileSync(
      constants.specDir + "/" + specFileName,
      {
        encoding: "utf-8"
      }
    );

    let options = {
      standard: false,
      ignoreBasePathCheck: flags.ignoreBasepathCheck
    };

    let results = await specValidator.validate(specFileContents, options);

    if (results && Array.isArray(results) && results.length > 0) {
      results.forEach(entry => {
        this.log(redColor, entry);
      });
    }
  }
}

LintCommand.description = `Validate (lint) the contents of the repository spec file.
...
Check to see that the spec matches both the OpenAPI and Fortellis schema standards.
`;

LintCommand.flags = {
  ignoreBasepathCheck: flags.boolean({
    char: "i",
    default: false
  })
};

module.exports = LintCommand;
