const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const path = require('path');
const { lint } = require('../services/linter');
const { formatResults } = require('../services/linter/formatters/rusty');
const { parseWithPointers } = require('@stoplight/yaml');
const ConfigManagementService = require('../services/config.management.service');
const { ERRORS, toCommandError } = require('../utils/errors');

class ApiLintCommand extends Command {
  async run() {
    const { flags, args } = this.parse(ApiLintCommand);

    // validate input
    if (!args.FILE) {
      this.error(...toCommandError(ERRORS.FILE_NOT_GIVEN));
    }

    const fileName = args.FILE;
    if (!fs.existsSync(fileName)) {
      this.error(
        ...toCommandError(ERRORS.FILE_NOT_EXIST, path.resolve(fileName))
      );
    }

    if (flags.safe) {
      const configService = new ConfigManagementService();
      configService.loadLocalConfig();
      if (configService.getSpecFilesFromConfig().indexOf(fileName) === -1) {
        this.error(...toCommandError(ERRORS.FILE_NOT_ADDED, fileName));
      }
    }

    const spec = fs.readFileSync(fileName, { encoding: 'utf8' });
    const parsedSpec = parseWithPointers(spec);
    const specSrc = spec.split('\n');

    const config = {
      rulesets: {
        'oas2-enhanced': true,
        'oas2-fortellis': true
      },
      severity: flags['display-severity']
    };

    const results = await lint(parsedSpec, config);
    this.log(formatResults(results, specSrc, fileName));

    const resultsHasErrorSeverity = results.some(r => r && r.severity === 0);
    if (resultsHasErrorSeverity) {
      this.exit(ERRORS.SPEC_INVALID.exit);
    }

    this.exit(0);
  }
}

ApiLintCommand.flags = {
  safe: flags.boolean({
    description:
      'Check that the API spec has been added to the Fortellis repository before linting'
  }),
  'display-severity': flags.string({
    description: 'Show only output greater than the specified severity level',
    options: ['error', 'warn', 'info', 'hint'],
    default: 'warn'
  })
};

ApiLintCommand.description = `Lints OpenAPI 2.0 specifications for correctness and style.`;

ApiLintCommand.args = [
  {
    name: 'FILE',
    required: true,
    description: 'Path of an Open API 2.0 specificaton file'
  }
];

module.exports = ApiLintCommand;
