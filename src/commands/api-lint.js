const { Command, flags } = require("@oclif/command");
const fs = require('fs');
const path = require('path');
const lint = require("../services/linter");
const { formatResults } = require('../services/formatters/rusty');
const { parseWithPointers } = require('@stoplight/yaml');

class ApiLintCommand extends Command {
  async run() {
    const { flags } = this.parse(ApiLintCommand);

    const specFileName = flags.file;
    if (!flags.file) {
      this.error('no specfication file specified', { code: 1});
    }
    if (!fs.existsSync(flags.file)) {
      this.error("file '" + path.resolve(flags.file) + "' does not exist", { code: 1});
    } 

    const spec = fs.readFileSync(flags.file, { encoding: 'utf8'})
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
    char: "f"
  })
};

module.exports = ApiLintCommand;
