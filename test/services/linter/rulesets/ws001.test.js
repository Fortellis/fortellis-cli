const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule ws001', () => {
  const s = new Spectral();
  s.addRules({
    'ws001': rules.ws001
  });
  s.mergeRules();

  it("should pass if the root spec object declares a `parameters` property", async function() {
    const results = await s.run({
      parameters: {}
    });
            
    expect(results).to.eql([]); 
  });

  it("should fail if the root spec object does not declare a `parameters` property", async function() {
    const results = await s.run({});
            
    expect(results.length).to.equal(1);
  });
});