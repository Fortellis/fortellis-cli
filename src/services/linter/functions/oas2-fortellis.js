const { caseTypes } = require('./oas2-enhanced');

// parameters
const parameterNameCasing = {
  header: caseTypes.upperKebabCase,
  path: caseTypes.camelCase,
  query: caseTypes.camelCase,
  body: caseTypes.pascalCase
};

function isPathParam(segment) {
  return new RegExp('{.*?}').test(segment);
}

function fortellisPathCasing(targetVal) {
  const path = targetVal || '';
  const kebabCase = caseTypes.kebabCase;
  let results = [];

  // test each segment for casing
  const segments = path.split('/');
  for (const seg of segments) {
    if (seg && !isPathParam(seg) && !kebabCase.regex.test(seg)) {
      results.push({
        message:
          'path segment `' + seg + '` should be `' + kebabCase.prettyName + '`'
      });
    }
  }

  return results;
}

function fortellisParamKeyFormat(targetVal) {
  const key = targetVal;

  // Validate the structure
  const tokens = key.split('.');
  if (tokens.length != 2) {
    return [
      {
        message:
          'invalid structure.  Structure should be `{header|path|query|body}.{param_name}`'
      }
    ];
  }

  // Validate the prefix
  const prefix = tokens[0];
  const suffixCase = parameterNameCasing[prefix];
  if (!suffixCase) {
    return [
      {
        message:
          'invalid prefix `' +
          prefix +
          '`. Prefix should be `header`,`path`,`query`, or `body`'
      }
    ];
  }

  // Validate the casing of the suffix
  const suffix = tokens[1];
  if (!suffixCase.regex.test(suffix)) {
    return [
      {
        message:
          'suffix is incorrect case. The suffix of `' +
          prefix +
          '` parameter objects should be `' +
          suffixCase.prettyName +
          '`'
      }
    ];
  }
  return [];
}

function fortellisParamNameFormat(targetVal) {
  const param = targetVal;
  const name = param.name;
  const type = param.in;

  // Verify the parameter object has the needed properties
  if (!name || !type) {
    return [];
  }

  // Verifiy the parameter has a valid type.
  // If invalid, bailout and defer to the validation rule for the OpenAPI 2.0 schema
  const typeCase = parameterNameCasing[type];
  if (!typeCase) {
    return [];
  }

  // Validate the casing of the name
  if (!typeCase.regex.test(param.name)) {
    return [
      {
        message:
          'the `name` property of `' +
          type +
          '` parameter objects should be `' +
          typeCase.prettyName +
          '`'
      }
    ];
  }

  return [];
}

function fortellisRequestIdHeader(targetVal) {
  //
  // Note: This can be replaced with the Truthy function once the JSON pointer
  // library supports conditional matching on property values.
  //
  const parameters = targetVal;

  // search through the declared parameters for a `Request-Id` header
  for (const p of parameters) {
    const name = (p.name || '').toLowerCase();
    const type = (p.in || '').toLowerCase();
    const required = p.required || false;

    // return no results if found
    if (name === 'request-id' && type === 'header') {
      if (required === false) {
        return [
          {
            message: 'operation objects must require the Request-Id header'
          }
        ];
      }
      return [];
    }
  }

  // `Request-Id` header parameter not found
  return [
    {
      message: 'operation objects must declare a `Request-Id` header parameter'
    }
  ];
}

module.exports = {
  parameterNameCasing,
  isPathParam,
  fortellisPathCasing,
  fortellisParamKeyFormat,
  fortellisParamNameFormat,
  fortellisRequestIdHeader
};
