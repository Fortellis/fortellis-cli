//
// rule naming scheme: {severity}{type}{id}
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
//   con - contact object
//   lic - license object
//   par - parameter object
//   res - response object
//   op  - operation object
//   def - definition object
//
// {id}: unsigned integer value
//

//
// root spec object rules
//
const ws001 = {
  description: 'root spec object should declare a `parameters` property',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$',
  then: {
    field: 'parameters',
    function: 'truthy'
  }
};

//
// Verify the root object declares a `definitions` object
//
const ws002 = {
  description: 'root object should declare a `responses` property',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$',
  then: {
    field: 'responses',
    function: 'truthy'
  }
};

//
// Verify the root object declares a `definitions` property
//
const ws003 = {
  description: 'root object should declare a `definitions` property',
  recommended: true,
  severity: 'warn',
  type: 'style',
  given: '$',
  then: {
    field: 'definitions',
    function: 'truthy'
  }
};

//
// info object rules
//
const winf001 = {
  description: 'the info object should declare a `description` property',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.info',
  then: {
    field: 'description',
    function: 'truthy'
  }
};

//
// securityDefinitions object rules
//

//
// security object rules
//

//
// pathItem object rules
//

//
// operationObject rules
//
const eop001 = {
  description: 'operation objects should declare a `produces` property.',
  recommended: true,
  type: 'verification',
  severity: 'error',
  given: '$.paths[*][*]',
  then: {
    field: 'produces',
    function: 'truthy'
  }
};

const eop002 = {
  description: 'operation objects should declare a `consumes` property.',
  recommended: true,
  type: 'verification',
  severity: 'error',
  given: '$.paths[*][*]',
  then: {
    field: 'consumes',
    function: 'truthy'
  }
};

const wop001 = {
  description: 'operation objects should declare a `operationId` property',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.paths[*][*]',
  then: {
    field: 'operationId',
    function: 'truthy'
  }
};

const wop002 = {
  description: 'operation objects should declare a `summary` property',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.paths[*][*]',
  then: {
    field: 'summary',
    function: 'truthy'
  }
};

const wop003 = {
  description: 'operation objects should declare a `description` property.',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.paths[*][*]',
  then: {
    field: 'description',
    function: 'truthy'
  }
};

//
// parameter object rules
//
const wpar001 = {
  description: 'parameters should declare a `description` property',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.parameters[*]',
  then: {
    field: 'description',
    function: 'truthy'
  }
};

//
// response object rules
//
const wres001 = {
  description: 'responses should declare a `description` property',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.responses[*]',
  then: {
    field: 'description',
    function: 'truthy'
  }
};

//
// defintion object rules
//
const wdef001 = {
  description: 'definition objects should declare a `description` property.',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.definitions[*]',
  then: {
    field: 'description',
    function: 'truthy'
  }
};

const wdef002 = {
  description: 'defintion objects should declare a `required` property.',
  recommended: true,
  type: 'style',
  severity: 'warn',
  given: '$.definitions[*]',
  then: {
    field: 'required',
    function: 'truthy'
  }
};

//
// tags object rules
//

//
// externalDocs object rules
//

module.exports = {
  ws001,
  ws002,
  ws003,
  winf001,
  eop001,
  eop002,
  wop001,
  wop002,
  wop003,
  wpar001,
  wres001,
  wdef001,
  wdef002
};
