const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const constants = require("../utils/constants");
const ConfigManagementService = require("../services/config.management.service");
const specValidator = require("../services/specValidator");
const RepositoryService = require("../services/repository.service");

const redColor = "\x1b[31m%s\x1b[0m";
const resetColor = "\x1b[0m%s";

class LintCommand extends Command {
  async run() {
    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error("This is not a Fortellis repository.");
    }

    const { flags } = this.parse(LintCommand);

    let configService = new ConfigManagementService();
    configService.loadConfig();

    const specFileName = configService.specFileName;
    if (!specFileName) {
      this.error(
        "Unable to validate spec. No spec file exists in this repository"
      );
    }
    this.log("Linting Spec File:", specFileName);

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
