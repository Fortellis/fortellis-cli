const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule definitionRequiredProp', () => {
  const s = new Spectral();
  s.addRules({
    definitionRequiredProp: rules.definitionRequiredProp
  });
  s.mergeRules();

  it("shouldn't return style warnings if defintion objects include a 'required' property", async function() {
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

  it("should return style warnings if defintion objects do not include a 'required' property", async function() {
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