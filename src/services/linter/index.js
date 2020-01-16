/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { Spectral, isOpenApiv2 } = require('@stoplight/spectral');
const { getLocationForJsonPath } = require('@stoplight/yaml');
const {
  oas2Functions,
  rules: oas2Rules
} = require('@stoplight/spectral/dist/rulesets/oas2');
const oas2EnhancedFunctions = require('./rulesets/oas2-enhanced/functions');
const oas2EnhancedRules = require('./rulesets/oas2-enhanced');
const oas2FortellisFunctions = require('./rulesets/oas2-fortellis/functions');
const oas2FortellisRules = require('./rulesets/oas2-fortellis');

async function lint(parserResult, config) {
  try {
    // load functions and rules
    let functions = oas2Functions();
    let rules = await oas2Rules();

    if (config.rulesets['oas2-enhanced']) {
      Object.assign(functions, oas2EnhancedFunctions);
      Object.assign(rules, oas2EnhancedRules);
    }
    if (config.rulesets['oas2-fortellis']) {
      Object.assign(functions, oas2FortellisFunctions);
      Object.assign(rules, oas2FortellisRules);
    }

    // TODO: Need to devise on the fly ruleset generation as a workaround for Spectral v5.0.0
    //       only allowing loadRuleset().  Using addFunctions() and addRules results in
    //       deprecation messages being printed to stdout.
    const spectral = new Spectral();
    spectral.addFunctions(functions); // generates deprecation message
    spectral.addRules(rules); // generates deprecation message
    spectral.mergeRules();

    return spectral.run({
      parsed: parserResult,
      getLocationForJsonPath
    });
  } catch (error) {
    console.error({
      message: 'linter error',
      error: error
    });
    throw { message: 'linter error', error: error };
  }
}

module.exports = lint;
