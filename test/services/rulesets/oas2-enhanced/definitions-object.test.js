const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const { oas2Functions } = require('@stoplight/spectral/dist/rulesets/oas2');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule definitionsObject', () => {
  const s = new Spectral();
  s.addFunctions(oas2Functions());
  s.addRules({
    definitionsObject: rules.definitionsObject
  });
  s.mergeRules();

  it("should return no style warning if the OpenAPI object 'definitions' object declared", async function() {
    const results = await s.run({
      definitions: {}
    });
            
    expect(results).to.eql([]); 
  });

  it("should return a style warning if the OpenAPI object 'definitions' object is not declared", async function() {
    const results = await s.run({});
            
    expect(results.length).to.equal(1);
  });

});