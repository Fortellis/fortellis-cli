const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const { oas2Functions } = require('@stoplight/spectral/dist/rulesets/oas2');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule ws003', () => {
  const s = new Spectral();
  s.addFunctions(oas2Functions());
  s.addRules({
    ws003: rules.ws003
  });
  s.mergeRules();

  it("should pass if the root spec object declares a 'definitions' property", async function() {
    const results = await s.run({
      definitions: {}
    });

    expect(results).to.eql([]);
  });

  it("should fail if the root spec object does not declare a 'definitions' property", async function() {
    const results = await s.run({});

    expect(results.length).to.equal(1);
  });
<<<<<<< HEAD:test/services/rulesets/oas2-enhanced/definitions-object.test.js
});
=======
});
>>>>>>> a745e4e2ada3fd47a73519ab2a00f868808c71ed:test/services/linter/rulesets/ws003.test.js
