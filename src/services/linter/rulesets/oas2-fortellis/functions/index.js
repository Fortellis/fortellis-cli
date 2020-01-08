const { caseTypes } = require('../../oas2-enhanced/functions');

// paths

// parameters

// responses

// UNSORTED

const REGEX_EXP = {
  httpSuccessCode: RegExp('^[23][0-9][0-9]$'),
  httpFailureCode: RegExp('^[45][0-9][0-9]$')
};

// parameters
const parameterNameCasing = {
  'header': caseTypes.upperKebabCase,
  'path': caseTypes.kebabCase,
  'query': caseTypes.flatCase,
  'body': caseTypes.pascalCase
};

function matchKeyFormat(key, type) {
  return key.match('^(?:' + type + ')\.(.*)$');
}

function paramKeyFormat(targetVal, opts) {
  const key = targetVal;
  const { type } = opts;

  const typeCase = parameterNameCasing[type];
  if(!typeCase)
    throw "unexpected type: " + type;

  const groups = matchKeyFormat(key, type);
  if(!groups || groups.length != 2) {
    return [{
      message: type + " parameter keys should be prefixed with `" + type + ".`"
    }];
  }

  if(!typeCase.regex.test(groups[1])) {
    return [{
      message: type + " parameter keys should have " + typeCase.prettyName + " suffix"
    }];
  }  

  return [];
}

function paramNameFormat(targetVal, opts) {
  const key = targetVal;
  const { type } = opts;

  const regex = parameterNameCasing[type].regex;
  if(!regex.test(key)) {
    const prettyName = parameterNameCasing[type].prettyName;
    return [{
      message: type + " parameter keys should have " + prettyName + " suffix"
    }];
  }  

  return [];
}

function regexTestFunction(regExp) {
  return function(input) {
    return regExp.test(input);
  };
}
    
function responseCodeValidation(paths) {
  let successCheckRegex = regexTestFunction(REGEX_EXP.httpSuccessCode);
  let failureCheckRegex = regexTestFunction(REGEX_EXP.httpFailureCode);
  let errors = [];
  for (var eachpath in paths) {
    for (var eachMethod in paths[eachpath]) {
      let target = paths[eachpath][eachMethod];
      let values = Object.keys(target.responses || {});
      if (!values.find(successCheckRegex)) {
        errors.push({
          message: 'Success response required 2xx, 3xx',
          path: ['paths', eachpath, eachMethod, 'responses']
        });
      }
      if (!values.find(failureCheckRegex)) {
        errors.push({
          message: 'Failure response required 4xx, 5xx',
          path: ['paths', eachpath, eachMethod, 'responses']
        });
      }
    }
  }
  return errors;
}
  
function requestIdHeaderValidation(paths) {
  let errors = [];
  
  const HEADER_KEY = 'header';
  const REQUEST_ID_HEADER = 'Request-Id';
  const ERR_MSG = 'Request-Id Header must be defined with attribute required.';
    
  for (var eachpath in paths) {
    for (var eachMethod in paths[eachpath]) {
      let target = paths[eachpath][eachMethod];
      //Error when no parameters are defined on the api.
      if (!target.parameters) {
        errors.push({
          message: ERR_MSG,
          path: ['paths', eachpath, eachMethod]
        });
      } else {
        const isRequestIdPresent = target.parameters
          .filter(eachParam => eachParam.in === HEADER_KEY)
          .find(eachParam => {
            return (
              eachParam.name === REQUEST_ID_HEADER &&
              eachParam.required === true
            );
          });
        if (!isRequestIdPresent) {
          errors.push({
            message: ERR_MSG,
            path: ['paths', eachpath, eachMethod, 'parameters']
          });
        }
      }
    }
  }
  return errors;
}
  
module.exports = {
  matchKeyFormat,
  paramKeyFormat,
  paramNameFormat,
  responseCodeValidation,
  requestIdHeaderValidation
};
  