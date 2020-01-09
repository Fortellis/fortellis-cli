const { Spectral } = require("@stoplight/spectral");
const {
  oas2Functions,
  rules: oas2Rules
} = require("@stoplight/spectral/dist/rulesets/oas2");
const whitelistedRulesSet = require("./default-rule-whitelist");
const defaultRuleOverrides = require("./default-rule-overrides");
const customValidationFunctions = require("./custom-validation-functions");
const customValidationRules = require("./custom-validation-rules");
const spectral = new Spectral();
let isRulesetConfigured = false;

function filterRules({ defaultRuleSet, whitelistedRulesSet }) {
  for (const eachRule in defaultRuleSet) {
    if (!whitelistedRulesSet[eachRule]) {
      delete defaultRuleSet[eachRule];
    }
  }
  return defaultRuleSet;
}

async function validate(APISpecInJSON) {
  try {
    if (!APISpecInJSON) {
      throw Error("Bad Input.");
    }
    if (!isRulesetConfigured) {
      await oas2Rules().then(rules => {
        const ruleSet = filterRules({
          defaultRuleSet: rules,
          whitelistedRulesSet
        });
        spectral.addRules(ruleSet);
      });
      spectral.addFunctions(oas2Functions());
      spectral.addFunctions(customValidationFunctions);
      spectral.addRules(customValidationRules);
      spectral.mergeRules(defaultRuleOverrides);
      isRulesetConfigured = true;
    }
    return await spectral.run(APISpecInJSON);
  } catch (err) {
    console.error({
      message: "Spectral API Spec validation failed.",
      error: err
    });
    throw { message: "Spectral API Spec validation failed.", error: err };
  }
}

module.exports = {
  validate,
  filterRules
};
