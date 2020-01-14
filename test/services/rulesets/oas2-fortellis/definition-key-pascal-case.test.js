const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const functions = require('../../../../src/services/linter/rulesets/oas2-enhanced/functions');
const rules = require('../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule definitionNamePascalCase', () => {
  const s = new Spectral();
  s.addFunctions({
    casing: functions.casing
  });
  s.addRules({
    definitionKeyPascalCase: rules.definitionKeyPascalCase
  });
  s.mergeRules();

  it('should pass for PascalCase definition keys', async function() {
    const results = await s.run({
      definitions: {
        Foo: {},
        Bar: {},
        Baz: {}
      }
    });

    expect(results).to.eql([]);
  });

  it('should return style warnings for non-PascalCase defintion keys', async function() {
    const results = await s.run({
      definitions: {
        foo: {},
        'Bar-Bar': {},
        bazBaz: {}
      }
    });

    expect(results.length).to.equal(3);
  });
});
