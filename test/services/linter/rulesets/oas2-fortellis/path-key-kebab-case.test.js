const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const functions = require('../../../../../src/services/linter/rulesets/oas2-enhanced/functions');
const rules = require('../../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule pathKeyKebabCase', () => {
  const s = new Spectral();
  s.addFunctions({
    'pathCasing': functions.pathCasing
  });
  s.addRules({
    'pathKeyKebabCase': rules.pathKeyKebabCase
  });
  s.mergeRules();

  it('should return no results for kebab-case path segments', async function() {
    const results = await s.run({
      'paths': {
        '/foo': {},  
        '/foo-bar': {},
        '/foo-bar/baz': {},
        '/{foo}': {},  
        '/foo/{bar}': {},
        '/foo/{bar}/baz': {}
      }
    });
            
    expect(results).to.eql([]); 
  });

  it('should return a result for a non kebab-case path segments', async function() {
    const results = await s.run({
      'paths': {
        '/Foo': {},  
        '/fooBar': {},
        '/foo-bar-': {},
      }
    });
            
    expect(results.length).to.equal(3);
  });

});