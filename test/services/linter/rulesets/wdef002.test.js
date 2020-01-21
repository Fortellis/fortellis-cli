const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule wdef002', () => {
  const s = new Spectral();
  s.addRules({
    wdef002: rules.wdef002
  });
  s.mergeRules();

  it("should pass if definition objects declare a `required` property", async function() {
    const results = await s.run({
      definitions: {
        Foo: {
          required: []
        },
        Bar: {
          required: []
        },
        Baz: {
          required: []
        }
      }
    });
            
    expect(results).to.eql([]); 
  });

  it("should fail if definition objects do not declare a `required` property", async function() {
    const results = await s.run({
      definitions: {
        Foo: {},
        Bar: {},
        Baz: {}
      }
    });
            
    expect(results.length).to.equal(3);
  });

});