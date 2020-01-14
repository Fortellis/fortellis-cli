const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const { oas2Functions } = require('@stoplight/spectral/dist/rulesets/oas2');
const rules = require('../../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule definitionExampleProp', () => {
  const s = new Spectral();
  s.addFunctions(oas2Functions());
  s.addRules({
    definitionExampleProp: rules.definitionExampleProp
  });
  s.mergeRules();

  it("should pass if a defintion objects includes an 'example' property", async function() {
    const results = await s.run({
      definitions: {
        Foo: {
          example: {}
        },
        Bar: {
          example: {}
        },
        Baz: {
          example: {}
        }
      }
    });
            
    expect(results).to.eql([]); 
  });

  it("should return style warnings if defintion objects do not include an 'example' property", async function() {
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