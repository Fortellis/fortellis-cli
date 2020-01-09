const { caseTypes } = require('../../oas2-enhanced/functions');

// parameters
const parameterNameCasing = {
  'header': caseTypes.upperKebabCase,
  'path': caseTypes.kebabCase,
  'query': caseTypes.flatCase,
  'body': caseTypes.pascalCase
};

function fortellisParamKeyFormat(targetVal) {
  const key = targetVal;

  const groups = key.match('^((header|path|query|body)\.)(.*)$');
  if(!groups || groups.length != 4) {
    return [{
      message: "parameter object keys should follow the structure: `{header|path|query|body}.{name}`"
    }]
  } 

  const type = groups[2];
  const typeCase = parameterNameCasing[type];
  if(!typeCase) {
    return [{
      message: "parameter object keys should follow the structure: `{header|path|query|body}.{name}`"
    }]
  }

  const suffix = groups[3];
  if(!typeCase.regex.test(suffix)) {
    return [{
      message: "`" + type + "` parameter keys should have `" + typeCase.prettyName + "` suffix"
    }];
  }  

  return [];
}
  
module.exports = {
  parameterNameCasing,
  fortellisParamKeyFormat
}
  