const { expect } = require('chai');
const { Spectral } = require('@stoplight/spectral');
const functions = require('../../../../src/services/linter/rulesets/oas2-fortellis/functions');
const rules = require('../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule paramKeyFormat', () => {
  const s = new Spectral();
  s.addFunctions(functions);
  s.addRules({
    paramKeyFormat: rules.paramKeyFormat
  });
  s.mergeRules();

  it("should pass if the parameter key prefix matches the type", async function() {
    const results = await s.run({
      parameters: {
        "header.Foo": {
          in: "header"
        },
        "path.foo": {
          in: "path"
        }, 
        "query.foo": {
          in: "query"
        }, 
        "body.Foo": {
          in: "body"
        }    
      }
    });
            
    expect(results).to.eql([]); 
  });

  it("should emit a style warning if parameter key suffix casing is incorrect", async function() {
    const results = await s.run({
        parameters: {
          "header.aa-bb": {
            in: 'header'
          },
          "path.Cc-Dd": {
            in: 'path'
          }, 
          "query.ee_ff": {
            in: 'query'
          }, 
          "body.GG_HH": {
            in: 'body'
          },    
        }
      });
          
    expect(results.length).to.equal(4);
  });
});