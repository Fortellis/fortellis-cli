const { expect } = require('chai');
const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule wpar_f003', () => {
  const s = new Spectral();
  s.addRules({
    wpar_f003: rules.wpar_f003
  });
  s.mergeRules();

  it('should pass if parameters declare schemas as references', async function() {
    const results = await s.run({
      'parameters': {
        'foo': {
          'schema': {
            '$ref': '#/definitions/Foo'
          }
        }       
      },
      'definitions': {
          'Foo': {
              'properties': {
                  'bar': {
                      'type': 'string'
                  }
              }
          }
      }
    });
            
    expect(results, 'should be an empty result').to.eql([]); 
  });

  it("should fail if parameters declare schemas inline", async function() {
    const results = await s.run({
      "parameters": {
        "foo": {
          "schema": {
            "properties": {
              "baz": {
                "type": "string"
              }
            }
          }
        }   
      }
    });
           
    expect(results.length, 'should be a single result').to.equal(1);
  });
});