const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const { oas2Functions } = require('@stoplight/spectral/dist/rulesets/oas2');
const rules = require('../../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule responsesRequestIdHeader', () => {
  const s = new Spectral();
  s.addFunctions(oas2Functions());
  s.addRules({
    responsesRequestIdHeader: rules.responsesRequestIdHeader
  });
  s.mergeRules();

  it("should pass if a reponse object includes a 'Request-Id' header", async function() {
    const results = await s.run({
      responses: {
        Foo: {
          headers: {
              "Request-Id": {},
              "Accept-Language": {}
          }
        }
      }
    });
            
    expect(results).to.eql([]); 
  });

  it("should return validation error if response object do not include a 'Request-Id' header", async function() {
    const results = await s.run({
        responses: {
          Foo: {
            headers: {
                "Accept-Language": {}
            }
          }
        }
      });
              
      expect(results.length).to.equal(1);
      expect(results[0]).to.contain({ 
        message: "responses should include a `Request-Id` header"
      }); 
  });

});