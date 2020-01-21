const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule wop001', () => {
  const s = new Spectral();
  s.addRules({
    wop001: rules.wop001
  });
  s.mergeRules();

  it("should pass if operation objects declare an `operationId` property", async function() {
    const test = {
      "paths": {
        "/": {
          "get": {
            "operationId": {}
          }
        }
      }
    };
    
    const results = await s.run(test); 
    expect(results).to.eql([]); 
  });

  it("should fail if the root spec object does not declare an `operationId` property", async function() {
    const test = {
      "paths": {
        "/": {
          "get": {}
        }
      }
    };
    
    const results = await s.run(test); 
    expect(results).to.have.lengthOf(1); 
  });
});