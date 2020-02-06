/* eslint-disable no-useless-escape */

//
// rule naming scheme: {severity}{type}_f{id}
//
// {severity}: must be one of the following values:
//   e - error
//   w - warning
//   i - info
//   h - hint
//
// {type}: must be one of the following values:
//   s   - root spec object
//   inf - info object
//   sdf - security defintion object
//   sch - security scheme object
//   scp - security scope object
//   par - parameter object
//   res - response object
//   pat - path object
//   op  - operation object
//   def - definition object
//
// {id}: unsigned integer value
//

//
// root spec object rules
//
// todo:
//   - host?
//   - basePath?
//   - schemes?
//   - consumes?
//   - produces?
//

//
// info object rules
//
// todo:
//   - title?
//   - description -> see oas2_enhanced
//   - termsOfService?
const einf_f001 = {
  description:
    'the version should follow semantic versioning: {major-nnumber}.{minor-number}.{patch-number}',
  recommended: true,
  type: 'validation',
  severity: 'error',
  given: '$.info.version',
  then: {
    function: 'pattern',
    functionOptions: {
      match: '^[0-9]+.[0-9]+.[0-9]+$'
    }
  }
};

// basePath

// schemes

// consumes

// produces

//
// path object rules
//
const spat_f001 = {
  //
  // Path key segments should be kebab-case.  Ignores path parameters.
  //
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.paths',
  then: {
    field: '@key',
    function: 'fortellisPathCasing'
  }
};

//
// security definitions object rules
//
const wsdf_f001 = {
  description: 'root spec object should declare a `securityDefinitions` object',
  recommended: true,
  type: 'validation',
  severity: 'warn',
  given: '$',
  then: {
    field: 'securityDefinitions',
    function: 'truthy'
  }
};

//
// operationObject rules
//
const wop_f001 = {
  //
  // Operation objects must declare a `Request-Id` header parameter.
  // This rule can be simplified when spectral's JSON pointer implementation
  // supports conditional matching on property values:
  //
  // $.paths[*][*].parameters[?(@.name == 'Request-Id' && @.in == 'header')]
  //
  recommended: true,
  type: 'validation',
  severity: 'error',
  given: '$.paths[*][*].parameters',
  then: {
    function: 'fortellisRequestIdHeader'
  }
};

//
// parameter object rules
//
const wpar_f001 = {
  //
  // This rule validates that parameter object keys match:
  //
  //  'header.Upper-Kebab-Case',
  //  'path.kebab-case',
  //  'query.flatcase',
  //  'body.PascalCase'
  //
  recommended: true,
  severity: 'warn',
  type: 'style',
  given: '$.parameters',
  then: {
    field: '@key',
    function: 'fortellisParamKeyFormat'
  }
};

const wpar_f002 = {
  //
  // This rule validates that parameter object name casing matches the type:
  //
  //  header => `Upper-Kebab-Case',
  //  path => `kebab-case`,
  //  query => `flatcase`,
  //  body => `PascalCase'
  //
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.parameters[*]',
  then: {
    function: 'fortellisParamNameFormat'
  }
};

//
// response object rules
//
const wres_f001 = {
  description: 'responses should include a `Request-Id` header',
  recommended: true,
  type: 'validation',
  severity: 'warn',
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

//
// defintion object rules
//
const edef_f001 = {
  description: 'defintion objects should include an `example` property',
  recommended: true,
  type: 'validation',
  severity: 'error',
  given: '$.definitions[*]',
  then: {
    field: 'example',
    function: 'truthy'
  }
};

const sdef_f001 = {
  description: 'defintion object keys should be PascalCase',
  type: 'style',
  severity: 'warn',
  given: '$.definitions',
  then: {
    field: '@key',
    function: 'casing',
    functionOptions: {
      casing: 'pascalCase'
    }
  }
};

const sdef_f002 = {
  description: 'defintion object property names should be camelCase',
  type: 'style',
  severity: 'warn',
  given: '$.definitions[*].properties',
  then: {
    field: '@key',
    function: 'casing',
    functionOptions: {
      casing: 'camelCase'
    }
  }
};

module.exports = {
  einf_f001,
  wsdf_f001,
  spat_f001,
  wop_f001,
  wpar_f001,
  wpar_f002,
  wres_f001,
  edef_f001,
  sdef_f001,
  sdef_f002
};
