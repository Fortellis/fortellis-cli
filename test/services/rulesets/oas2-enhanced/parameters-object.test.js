const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule parametersObject', () => {
  const s = new Spectral();
  s.addRules({
    'parametersObject': rules.parametersObject
  });
  s.mergeRules();

  it("should return no style warning if the OpenAPI object 'parameters' object declared", async function() {
    const results = await s.run({
      parameters: {}
    });
            
    expect(results).to.eql([]); 
  });

  it("should return a style warning if the OpenAPI object 'parameters' object is not declared", async function() {
    const results = await s.run({});
            
    expect(results.length).to.equal(1);
  });

});