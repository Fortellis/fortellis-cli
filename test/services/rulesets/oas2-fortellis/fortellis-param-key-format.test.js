const { expect } = require('chai');
const { Spectral } = require('@stoplight/spectral');
const functions = require('../../../../src/services/linter/rulesets/oas2-fortellis/functions');
const rules = require('../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule fortellisParamKeyFormat', () => {
  const s = new Spectral();
  s.addFunctions(functions);
  s.addRules({
    fortellisParamKeyFormat: rules.fortellisParamKeyFormat
  });
  s.mergeRules();

  it('should pass if key suffix casing matches prefix type', async function() {
    const results = await s.run({
      parameters: {
        'header.Foo-Bar': {},
        'path.foo-bar': {},
        'query.foobar': {},
        'body.FooBar': {}
      }
    });

    expect(results).to.eql([]);
  });

  it('should pass if key suffix casing does not match prefix type', async function() {
    const results = await s.run({
      parameters: {
        'header.foobar': {},
        'path.FooBar': {},
        'query.foo-bar': {},
        'body.foobar': {}
      }
    });

    expect(results.length).to.equal(4);
  });
});
