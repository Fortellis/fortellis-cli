const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const functions = require('../../../../../src/services/linter/rulesets/oas2-enhanced/functions');
const rules = require('../../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule sdef_f001', () => {
  const s = new Spectral();
  s.addFunctions({
    'casing': functions.casing
  });
  s.addRules({
    sdef_f001: rules.sdef_f001
  });
  s.mergeRules();

  it("should pass if definiton object keys are `PascalCase`", async function() {
    const results = await s.run({
      'definitions': {
        'Foo': {},
        'Bar': {}, 
        'Baz': {}    
      }
    });
            
    expect(results).to.eql([]); 
  });

  it("should fail if definiton object keys are not `PascalCase`", async function() {
    const results = await s.run({
      'definitions': {
        'foo': {},
        'Bar-Bar': {}, 
        'bazBaz': {}    
        }
    });
            
    expect(results.length).to.equal(3);
  });

});