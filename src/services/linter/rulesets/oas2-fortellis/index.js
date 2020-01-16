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
  description: "the version should follow semantic versioning: {major-nnumber}.{minor-number}.{patch-number}",
  recommended: true,
  type: 'validation',
  severity: 'error',
  given: '$.info.version',
  then: {
    function: 'pattern',
    functionOptions: {
      match: '^[0-9]+\.[0-9]+\.[0-9]+$'
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
  description: "path key segments should be 'kebab-case'",
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.paths',
  then: {
    field: '@key',
    function: 'pathCasing',
    functionOptions: {
      casing: 'kebabCase'
    }
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
}

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
}

const wpar_f003 = {
  description: 'parameters that declare a `schema` property should use references',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.parameters[*].schema',
  then: {
    field: 'properties',
    function: 'truthy'
  }
};

//
// response object rules
//
const wres_f001 = {
  description: "responses should include a `Request-Id` header",
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
  description: "defintion objects should include an `example` property",
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
  given: '$.definitions[*]',
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
   
  spat_f001,

  wpar_f001,
  wpar_f002,
  wpar_f003,

  wres_f001,

  edef_f001,
  sdef_f001,
  sdef_f002,
};
  