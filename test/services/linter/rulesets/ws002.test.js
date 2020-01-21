const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule ws002', () => {
  const s = new Spectral();
  s.addRules({
    'rws002': rules.ws002
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
});