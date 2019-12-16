/* eslint-disable no-useless-escape */

const REGEX_EXP = {
  cameCase: RegExp('[a-z]+((\\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?'),
  httpSuccessCode: RegExp('^[23][0-9][0-9]$'),
  httpFailureCode: RegExp('^[45][0-9][0-9]$')
};

function isCamelCase(input) {
  const [result] = REGEX_EXP.cameCase.exec(input);
  return result.includes(input);
}

function regexTestFunction(regExp) {
  return function(input) {
    return regExp.test(input);
  };
}

function parameterNamesCamelCaseValidation(paths) {
  const paramTypesToBeValidated = ['path', 'query', 'formData'];
  let errors = [];
  for (var eachpath in paths) {
    for (var eachMethod in paths[eachpath]) {
      let target = paths[eachpath][eachMethod];
      target.parameters &&
        target.parameters.forEach(param => {
          if (paramTypesToBeValidated.includes(param.in || '')) {
            if (!isCamelCase(param.name)) {
              errors.push({
                message: `Parameter names with type ${paramTypesToBeValidated.join(
                  '/'
                )} should be in camelCase or snake_case and contain only alphanumeric characters`,
                path: ['paths', eachpath, eachMethod, 'parameters', param.name]
              });
            }
          }
        });
    }
  }
  return errors;
}

function definitionsCamelCaseValidation(defs) {
  let errors = [];
  for (var eachDef in defs) {
    const properties = defs[eachDef].properties || {};
    for (var eachProperty in properties) {
      if (!isCamelCase(eachProperty)) {
        errors.push({
          message:
            'Definition properties should be in camelCase or snake_case and contain only alphanumeric characters',
          path: ['definitions', eachDef, 'properties', eachProperty]
        });
      }
    }
  }
  return errors;
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
  let errors = [],
    HEADER_KEY = 'header',
    REQUEST_ID_HEADER = 'Request-Id';
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
  parameterNamesCamelCaseValidation,
  definitionsCamelCaseValidation,
  responseCodeValidation,
  requestIdHeaderValidation
};
