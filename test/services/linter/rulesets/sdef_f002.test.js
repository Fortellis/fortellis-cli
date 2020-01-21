const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const functions = require('../../../../src/services/linter/functions/oas2-enhanced');
const rules = require('../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule sdef_f002', () => {
  const s = new Spectral();
  s.addFunctions({
    'casing': functions.casing
  });
  s.addRules({
    sdef_f002: rules.sdef_f002
  });
  s.mergeRules();

  it("should pass if definiton object properties are `camelCase`", async function() {
    const test = {
      "definitions": {
        "Foo": {
          "properties": { 
            "foo": {},
            "fooBar": {},
            "fooBarBaz": {},
          },
        },
      },
    };

    const results = await s.run(test);
    expect(results).to.eql([]); 
  });

  it("should fail if definiton object properties are not `camelCase`", async function() {
    const test = {
      "definitions": {
        "Foo": { 
          "properties": {
            "Foo": {},
            "foo-bar": {},
            "Foo-Bar": {},
          },
        },
      },
    };

    const results = await s.run(test);
    expect(results).to.have.lengthOf(3);
  });
});