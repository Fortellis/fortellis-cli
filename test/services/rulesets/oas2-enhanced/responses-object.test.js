const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule responsesObject', () => {
  const s = new Spectral();
  s.addRules({
    responsesObject: rules.responsesObject
  });
  s.mergeRules();

  it("should return no style warning if the OpenAPI object 'responses' object declared", async function() {
    const results = await s.run({
      responses: {}
    });

    expect(results).to.eql([]);
  });

  it("should return a style warning if the OpenAPI object 'responses' object is not declared", async function() {
    const results = await s.run({});

    expect(results.length).to.equal(1);
  });
});
