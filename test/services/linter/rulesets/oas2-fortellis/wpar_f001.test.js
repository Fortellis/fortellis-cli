const { expect } = require('chai');
const { Spectral } = require('@stoplight/spectral');
const functions = require('../../../../../src/services/linter/rulesets/oas2-fortellis/functions');
const rules = require('../../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule wpar_f001', () => {
  const s = new Spectral();
  s.addFunctions(functions);
  s.addRules({
    wpar_f001: rules.wpar_f001
  });
  s.mergeRules();

  it("should pass if parameter key suffix casing matches prefix type", async function() {
    const results = await s.run({
      parameters: {
        "header.Foo-Bar": {},
        "path.fooBar": {},
        "query.fooBar": {},
        "body.FooBar": {}
      }
    });

    expect(results).to.eql([]); 
  });

  it("should fail if parameter key suffix casing does not match prefix type", async function() {
    const tests = [
      {
        parameters: {
          "header.foobar": {},
        },
      },
      {
        parameters: {
          "path.FooBar": {},
        },
      },
      {
        parameters: {
          "query.foo-bar": {},
        },
      },
      {
        parameters: {
          "body.foobar": {}
        }
      },
    ];
    
    for(const t of tests) {
      const results = await s.run(t);
      expect(results).to.have.lengthOf(1);
    }
  });
});
