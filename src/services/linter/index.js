/* eslint-disable no-console */
const { Spectral } = require('@stoplight/spectral');
const { getLocationForJsonPath } = require('@stoplight/yaml');
const {
  oas2Functions,
  rules: oas2Rules
} = require('@stoplight/spectral/dist/rulesets/oas2');
const oas2EnhancedFunctions = require('./functions/oas2-enhanced');
const oas2EnhancedRules = require('./rulesets/oas2-enhanced');
const oas2FortellisFunctions = require('./functions/oas2-fortellis');
const oas2FortellisRules = require('./rulesets/oas2-fortellis');

async function lint(parserResult, config) {
  try {
    // load functions and rules
    let functions = oas2Functions();
    let rules = await oas2Rules();

    // Merge the rulesets and functions since this is not supported by Spectral v5.X.X
    if (config.rulesets['oas2-enhanced']) {
      Object.assign(functions, oas2EnhancedFunctions);
      Object.assign(rules, oas2EnhancedRules);
    }
    if (config.rulesets['oas2-fortellis']) {
      Object.assign(functions, oas2FortellisFunctions);
      Object.assign(rules, oas2FortellisRules);
    }

    // TODO: Need to devise on the fly ruleset generation as a workaround for Spectral v5.X.X
    //       only allowing loadRuleset().  Using addFunctions() and addRules results in
    //       deprecation messages being printed to stdout.
    const spectral = new Spectral({
      ignoreUnknownFormat: true
    });
    spectral.addFunctions(functions); // generates deprecation message
    spectral.addRules(rules); // generates deprecation message
    spectral.mergeRules();
    const results = spectral.run({
      parsed: parserResult,
      getLocationForJsonPath
    });
    return results;
  } catch (error) {
    console.error({
      message: 'linter error',
      error: error
    });
    throw { message: 'linter error', error: error };
  }
}

module.exports = lint;
