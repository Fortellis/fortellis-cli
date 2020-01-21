const { expect } = require('chai');

const { casing } = require('../../../../src/services/linter/functions/oas2-enhanced');

describe('caseTypes', async function () {
  it('should pass kebab-case strings', async function () {
    const test = [
      { 
        targetVal: 'foo', 
        expected: []
      },
      {
        value: 'foo-bar',
        expected: []
      },
    ];

    for(const t of test) {
      const results = casing(t.value, {casing: 'kebabCase'});
      expect(results).to.eql(t.expected);
    }
  });

  it('should fail non-kebab-case strings', async function () {
    const test = [
      {
        targetVal: 'foo-bar-',
        expected: { message: "`foo-bar-` should be `kebab-case`" },
      },
      {
        targetVal: '1foo-bar',
        expected: { message: "`1foo-bar` should be `kebab-case`" },
      },
      {
        targetVal: '-foo-bar',
        expected: { message: "`-foo-bar` should be `kebab-case`" },
      },
      {
        targetVal: 'FooBar',
        expected: { message: "`FooBar` should be `kebab-case`" },
      },
      {
        targetVal: 'Foo-Bar',
        expected: { message: "`Foo-Bar` should be `kebab-case`" },
      },
    ];

    for(const t of test) {
      const results = casing(t.targetVal, {casing: 'kebabCase'});
      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.contain(t.expected);
    }
  });

  it('should pass PascalCase strings', async function () {
    const test = [
      { 
        value: 'Foo',  
      },
      {
        value: 'FooBar',
      },
      {
        value: 'Foo123',
      },
    ];

    for(const t of test) {
      const results = casing(t.value, {casing: 'pascalCase'});
      expect(results).to.eql([]);
    }
  });

  it('should fail non-PascalCase strings', async function () {
    const test = [
      {
          value: '123Bar',
          expected: { message: "`123Bar` should be `PascalCase`" },
      },
      {
          value: 'fooBar',
          expected: { message: "`fooBar` should be `PascalCase`" },
      }
    ];

    for(const t of test) {
      const results = casing(t.value, {casing: 'pascalCase'});
      expect(results).to.have.lengthOf(1);
      expect(results[0], '${t.value} should not be PascalCase').to.contain(t.expected);
    }
  });
});