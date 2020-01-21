const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const path = require('path');
const lint = require('../services/linter');
const { formatResults } = require('../services/formatters/rusty');
const { parseWithPointers } = require('@stoplight/yaml');
const ConfigManagementService = require('../services/config.management.service');
const { COMMAND_ERRORS, ERRORS, toCommandError } = require('../utils/errors');

class ApiLintCommand extends Command {
  async run() {
    const { flags } = this.parse(ApiLintCommand);
    const specFileName = flags.file;

    if (flags.safe) {
      const configService = new ConfigManagementService();
      configService.loadLocalConfig();
      if (configService.getSpecFilesFromConfig().indexOf(specFileName) === -1) {
        this.error(toCommandError(ERRORS.FILE_NOT_ADDED, specFileName));
      }
    }

    if (!flags.file) {
      this.error(toCommandError(ERRORS.SPECIFICATION_NOT_GIVEN))
    }
    if (!fs.existsSync(flags.file)) {
      this.error(toCommandError(ERRORS.FILE_NOT_EXIST, path.resolve(flags.file)));
    } 

    const spec = fs.readFileSync(flags.file, { encoding: 'utf8' });
    const parserResults = parseWithPointers(spec);

    const srcMap = spec.split('\n');

    const config = {
      rulesets: {
        'oas2-enhanced': true,
        'oas2-fortellis': true
      }
    };

    let linterResults = await lint(parserResults, config);
    this.log(formatResults(linterResults, srcMap, flags.file));
  }
}

ApiLintCommand.description = `Validates and lints  OpenAPI 2.0 specifications.
...
Checks OpenAPI 2.0 specifications for correctness and style according to 
the OpenAPI 2.0 standard and fortellis style guide.
`;

ApiLintCommand.flags = {
  file: flags.string({
    char: 'f'
  }),
  safe: flags.string({
    description: 'Check that the API spec has been added and registered to the repository before validating'
  })
};

module.exports = ApiLintCommand;
