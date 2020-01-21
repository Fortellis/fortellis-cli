const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const functions = require('../../../../src/services/linter/functions/oas2-enhanced');
const rules = require('../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule spat_f001', () => {
  const s = new Spectral();
  s.addFunctions({
    pathCasing: functions.pathCasing
  });
  s.addRules({
    spat_f001: rules.spat_f001
  });
  s.mergeRules();

  it("should pass for paths with `kebab-case` segments", async function() {
    const test = {
      'paths': {
        '/foo': {},  
        '/foo-bar': {},
        '/foo-bar/baz': {},
        '/{foo}': {},
        '/foo/{bar}': {},
        '/foo/{bar}/baz': {}
      }
    };

    const results = await s.run(test);     
    expect(results).to.eql([]); 
  });

  it("should fail for paths with non-`kebab-case` segments", async function() {
    const test = {
      'paths': {
        '/Foo': {},  
        '/fooBar': {},
        '/foo-bar-': {}
      }
    };

    const results = await s.run(test);  
    expect(results.length).to.equal(3);
  });
});
