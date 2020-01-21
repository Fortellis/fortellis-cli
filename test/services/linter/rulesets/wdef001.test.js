const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule wdef001', () => {
  const s = new Spectral();
  s.addRules({
    wdef001: rules.wdef001
  });
  s.mergeRules();

  it("should pass if definition objects declare a `description` property", async function() {
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

  it("should fail if definition objects does not declare a `description` property", async function() {
    const results = await s.run({
      definitions: {
        Foo: {},
        Bar: {},
        Baz: {}
      }
    });

    expect(results.length).to.equal(3);
  });
<<<<<<< HEAD:test/services/rulesets/oas2-enhanced/defintions-description-prop.test.js
});
=======
});
>>>>>>> a745e4e2ada3fd47a73519ab2a00f868808c71ed:test/services/linter/rulesets/wdef001.test.js
