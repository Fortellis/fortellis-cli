const { Command } = require('@oclif/command');
const fs = require('fs');
const path = require('path');
const lint = require('../services/linter');
const { formatResults } = require('../services/linter/formatters/rusty');
const { parseWithPointers } = require('@stoplight/yaml');

class ApiLintCommand extends Command {
  async run() {
    const { args } = this.parse(ApiLintCommand);

    // validate input
    if (!args.FILE) {
      this.error('no specfication file specified', { code: 1 });
    }

    const fileName = args.FILE;
    if (!fs.existsSync(fileName)) {
      this.error("file '" + path.resolve(fileName) + "' does not exist", {
        code: 1
      });
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

ApiLintCommand.description = `Lints OpenAPI 2.0 specifications for correctness and style.`;

ApiLintCommand.args = [
  {
    name: 'FILE', // name of arg to show in help and reference with args[name]
    required: true, // make the arg required with `required: true`
    description: 'path of an Open API 2.0 specificaton file' // help description
  }
];

module.exports = ApiLintCommand;
