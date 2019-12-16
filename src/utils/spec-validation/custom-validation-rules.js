/* eslint-disable no-useless-escape */

const pathParamsKebabCaseValidation = {
  given: '$.paths',
  type: 'style',
  message: 'Path parameters should be in kebab-case.',
  then: {
    function: 'pattern',
    field: '@key',
    functionOptions: {
      notMatch: /[~!.@#$%^&*()_=+|'\"? `_<>,[\]]+/
    }
  }
};

const basePathValiation = {
  message: 'Missing required property: basePath',
  type: 'style',
  given: '$',
  then: {
    field: 'basePath',
    function: 'truthy'
  }
};

const parameterNamesCamelCaseValidation = {
  type: 'validation',
  given: '$.paths',
  then: {
    function: 'parameterNamesCamelCaseValidation'
  }
};

const definitionsCamelCaseValidation = {
  type: 'validation',
  given: '$.definitions',
  then: {
    function: 'definitionsCamelCaseValidation'
  }
};

const responseCodeValidation = {
  type: 'validation',
  given: '$.paths',
  then: {
    function: 'responseCodeValidation'
  }
};

const requestIdHeaderValidation = {
  type: 'validation',
  given: '$.paths',
  then: {
    function: 'requestIdHeaderValidation'
  }
};

module.exports = {
  pathParamsKebabCaseValidation,
  basePathValiation,
  parameterNamesCamelCaseValidation,
  definitionsCamelCaseValidation,
  responseCodeValidation,
  requestIdHeaderValidation
};
