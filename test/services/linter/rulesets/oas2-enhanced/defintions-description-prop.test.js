const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule definitionDescriptionProp', () => {
  const s = new Spectral();
  s.addRules({
    definitionDescriptionProp: rules.definitionDescriptionProp
  });
  s.mergeRules();

  it("shouldn't return style warnings if definition objects include a 'description' property", async function() {
    const results = await s.run({
      definitions: {
        Foo: {
          description: 'foo'
        },
        Bar: {
          description: 'bar'
        },
        Baz: {
          description: 'baz'
        }
      }
    });
            
    expect(results).to.eql([]); 
  });

  it("should return style warnings if definition objects do not include a 'description' property", async function() {
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