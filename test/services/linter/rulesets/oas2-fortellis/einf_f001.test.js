const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const { oas2Functions } = require('@stoplight/spectral/dist/rulesets/oas2');
const rules = require('../../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule einf_f001', () => {
  const s = new Spectral();
  s.addFunctions(oas2Functions());
  s.addRules({
    einf_f001: rules.einf_f001
  });
  s.mergeRules();

  it("should pass if the version is in semantic versioning format", async function() {
    const test = {
      info: {
        version: "1.0.0"        
      }
    }
    
    const results = await s.run(test);
    expect(results).to.eql([]); 
  });

  it("should fail if the version is not in semantic versioning format", async function() {
    const tests = [
      {
        info: {
          version: "1"        
        }
      },
      {
        info: {
          version: "1.0"        
        }
      },
      {
        info: {
          version: "beta"        
        }
      },
    ];
    
    for(const t of tests) {
        const results = await s.run(t);
        expect(results).to.have.lengthOf(1); 
    }
  });

});