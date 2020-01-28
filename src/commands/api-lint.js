const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const path = require('path');
const lint = require('../services/linter');
const { formatResults } = require('../services/linter/formatters/rusty');
const { parseWithPointers } = require('@stoplight/yaml');
const ConfigManagementService = require('../services/config.management.service');
const { ERRORS, toCommandError } = require('../utils/errors');

class ApiLintCommand extends Command {
  async run() {
    const { flags, args } = this.parse(ApiLintCommand)
    
    // validate input
    if(!args.FILE) {
      this.error(...toCommandError(ERRORS.SPECIFICATION_NOT_GIVEN));
    }

    if (flags.safe) {
      const configService = new ConfigManagementService();
      configService.loadLocalConfig();
      if (configService.getSpecFilesFromConfig().indexOf(args.FILE) === -1) {
        this.error(...toCommandError(ERRORS.FILE_NOT_ADDED, args.FILE));
      }
    }

    const fileName = args.FILE;
    if (!fs.existsSync(fileName)) {
      this.error(...toCommandError(ERRORS.FILE_NOT_EXIST, path.resolve(fileName)));
    }

    const spec = fs.readFileSync(fileName, { encoding: 'utf8' });
    const parserResults = parseWithPointers(spec);
    const srcMap = spec.split('\n');

    const config = {
      rulesets: {
        'oas2-enhanced': true,
        'oas2-fortellis': true
      }
    };

    const linterResults = await lint(parserResults, config);
    this.log(formatResults(linterResults, srcMap, fileName));
  }
}

ApiLintCommand.flags = {
  safe: flags.boolean({
    description: 'Check that the API spec has been added and registered to the repository before validating'
  })
};

ApiLintCommand.description = `Lints OpenAPI 2.0 specifications for correctness and style.`;

ApiLintCommand.args = [
  {
    name: 'FILE', // name of arg to show in help and reference with args[name]
    required: true, // make the arg required with `required: true`
    description: 'path of an Open API 2.0 specificaton file' // help description
  }
];

module.exports = ApiLintCommand;
