const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const { oas2Functions } = require('@stoplight/spectral/dist/rulesets/oas2');
const rules = require('../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule edef_f001', () => {
  const s = new Spectral();
  s.addFunctions(oas2Functions());
  s.addRules({
    edef_f001: rules.edef_f001
  });
  s.mergeRules();

  it('should pass if defintion objects include an `example` property', async function() {
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

  it('should fail if defintion objects do not include an `example` property', async function() {
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
