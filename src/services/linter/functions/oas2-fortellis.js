const { caseTypes } = require('./oas2-enhanced');

// parameters
const parameterNameCasing = {
  'header': caseTypes.upperKebabCase,
  'path': caseTypes.camelCase,
  'query': caseTypes.camelCase,
  'body': caseTypes.pascalCase
};

function fortellisParamKeyFormat(targetVal) {
  const key = targetVal;

  // Validate the structure
  const tokens = key.split('.');
  if(tokens.length != 2) {
    console.error("key: " + key + " split into: " + tokens);
    return [{
      message: "invalid structure.  Structure should be `{header|path|query|body}.{param_name}`"
    }];
  }

  // Validate the prefix
  const prefix = tokens[0];
  const suffixCase = parameterNameCasing[prefix];
  if(!suffixCase) {
    console.error("key: " + key + " prefix: " + prefix);
    return [{
      message: "invalid prefix `" + prefix + "`. Prefix should be `header`,`path`,`query`, or `body`"
    }];
  }

  // Validate the casing of the suffix
  const suffix = tokens[1];
  if(!suffixCase.regex.test(suffix)) {
    return [{
      message: "suffix is incorrect case. The suffix of `" + prefix + "` parameter objects should be `" + suffixCase.prettyName + "`"
    }];
  }
  return [];
}

function fortellisParamNameFormat(targetVal) {
  const param = targetVal;
  const name = param.name;
  const type = param.in;
  
  // Verify the parameter object has the needed properties
  if(!name || !type) {
    return [];
  } 

  // Verifiy the parameter has a valid type.
  // If invalid, bailout and defer to the validation rule for the OpenAPI 2.0 schema
  const typeCase = parameterNameCasing[type];
  if(!typeCase) {
    return [];
  } 

  // Validate the casing of the name
  if(!typeCase.regex.test(param.name)) {
    return [{
      message: "the `name` property of `" + type + "` parameter objects should be `" + typeCase.prettyName + "`"
    }];
  }  

  return [];
}
  
module.exports = {
  parameterNameCasing,
  fortellisParamKeyFormat,
  fortellisParamNameFormat
}
  