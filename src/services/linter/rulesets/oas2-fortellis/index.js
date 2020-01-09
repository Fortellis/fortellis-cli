/* eslint-disable no-useless-escape */

// Info Object
const semanticVersion = {
  description: "the specification should follow semantic versioning: {major-nnumber}.{minor-number}.{patch-number}",
  recommended: true,
  severity: 'warn',
  type: 'style',
  given: '$.info.version',
  then: {
    function: 'pattern',
    functionOptions: {
      match: '^[0-9]+\.[0-9]+\.[0-9]+$'
    }
  }
};

// basePath
const basePathValiation = {
  message: 'Missing required property: basePath',
  type: 'style',
  given: '$',
  then: {
    field: 'basePath',
    function: 'truthy'
  }
};

// schemes

// consumes

// produces

// paths
const pathKeyKebabCase = {
  description: "path key segments should be 'kebab-case'",
  recommended: true,
  severity: 'error',
  type: 'style',
  given: '$.paths',
  then: {
    field: '@key',
    function: 'pathCasing',
    functionOptions: {
      casing: 'kebabCase'
    }
  }
};
  
// parameters
const fortellisParamKeyFormat = {
  /*
   * This rule validates that parameter object keys match:
   * 
   *  'header.Upper-Kebab-Case',
   *  'path.kebab-case',
   *  'query.flatcase',
   *  'body.PascalCase'
   */
  recommended: true,
  severity: 'warn',
  type: 'style',
  given: '$.parameters',
  then: {
    field: '@key',
    function: 'fortellisParamKeyFormat',
  }
}

const parameterSchemaRef = {
  //description: 'parameters that declare schemas should use references',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.parameters[*].schema',
  then: {
    field: 'properties',
    function: 'truthy'
  }
};

// responses
const responsesRequestIdHeader = {
  description: "responses should include a `Request-Id` header",
  recommended: true,
  severity: 'error',
  type: 'validation',
  given: '$.responses[*].headers',
  then: {
    field: 'Request-Id',
    function: 'truthy'
  }
};

// securityDefinitions

// security

// tags

// external docs

// defintions
const definitionKeyPascalCase = {
  description: 'defintion object keys should be PascalCase',
  type: 'validation',
  given: '$.definitions',
  then: {
    field: '@key',
    function: 'casing',
    functionOptions: {
      casing: 'pascalCase'
    }
  }
};

const definitionPropertiesCamelCase = {
  description: 'defintion object property names should be PascalCase',
  type: 'validation',
  given: '$.definitions[*].properties',
  then: {
    field: '@key',
    function: 'casing',
    functionOptions: {
      casing: 'camelCase'
    }
  }
};

const definitionExampleProp = {
  description: "defintion objects should include an 'example' property.",
  recommended: true,
  severity: 'warn',
  type: 'style',
  given: '$.definitions[*]',
  then: {
    field: 'example',
    function: 'truthy'
  }
};

module.exports = {
  semanticVersion,
  basePathValiation,
  
  pathKeyKebabCase,

  fortellisParamKeyFormat,
  //fortellisParamNameFormat,
  parameterSchemaRef,

  responsesRequestIdHeader,

  definitionKeyPascalCase,
  definitionPropertiesCamelCase,
  definitionExampleProp
};
  