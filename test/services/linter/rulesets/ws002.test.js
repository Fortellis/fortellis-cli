const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule ws002', () => {
  const s = new Spectral();
  s.addRules({
<<<<<<< HEAD:test/services/rulesets/oas2-enhanced/responses-object.test.js
    responsesObject: rules.responsesObject
=======
    'rws002': rules.ws002
>>>>>>> a745e4e2ada3fd47a73519ab2a00f868808c71ed:test/services/linter/rulesets/ws002.test.js
  });
  s.mergeRules();

  it("should pass if the root spec object declares a `responses` property", async function() {
    const results = await s.run({
      responses: {}
    });

    expect(results).to.eql([]);
  });

  it("should fail if the root spec object does not declare a `responses` property", async function() {
    const results = await s.run({});

    expect(results.length).to.equal(1);
  });
<<<<<<< HEAD:test/services/rulesets/oas2-enhanced/responses-object.test.js
});
=======
});
>>>>>>> a745e4e2ada3fd47a73519ab2a00f868808c71ed:test/services/linter/rulesets/ws002.test.js
