// rules

// swagger.paths

// Operation Object
// * need a rule to enforce that an operation declares produces
// * need a rule to enforce that an operation declares consumes 
// * need a rule to enforce parameters should be $ref  
// * need to check for security scopes being declared

// swagger.parameters
const parametersObject = {
  description: "OpenAPI object should declare a 'parameters' object.  This helps organization and readability.",
  recommended: true,
  severity: 'warn',
  type: 'style',
  given: '$',
  then: {
    field: 'parameters',
    function: 'truthy'
  }
};

// swagger.responses
const responsesObject = {
  description: "OpenAPI object should declare a 'responses' object.  This helps organization and readability.",
  recommended: true,
  severity: 'warn',
  type: 'style',
  given: '$',
  then: {
    field: 'responses',
    function: 'truthy'
  }
};

// swagger.defintions
const definitionsObject = {
  description: "OpenAPI object should declare a 'definitions' object.  This helps organization and readability.",
  recommended: true,
  severity: 'warn',
  type: 'style',
  given: '$',
  then: {
    field: 'definitions',
    function: 'truthy'
  }
};

// swagger.defintions[*].description
const definitionDescriptionProp = {
  description: "Defintions should include a 'description' property.",
  recommended: true,
  severity: 'warn',
  type: 'style',
  given: '$.definitions[*]',
  then: {
    field: 'description',
    function: 'truthy'
  }
};

// swagger.defintions[*].required
const definitionRequiredProp = {
  description: "Defintion objects should include a 'required' property.",
  recommended: true,
  severity: 'warn',
  type: 'style',
  given: '$.definitions[*]',
  then: {
    field: 'required',
    function: 'truthy'
  }
};

module.exports = {
  parametersObject,
  responsesObject,

  definitionsObject,
  definitionDescriptionProp,
  definitionRequiredProp
};