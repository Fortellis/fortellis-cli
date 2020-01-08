const { expect } = require('chai');

const { paramKeyFormat, matchKeyFormat } = require('../../../../../src/services/linter/rulesets/oas2-fortellis/functions');

describe('function matchKeyFormat', async function () {
  it('should return 3 groups', async function () {
    const result = matchKeyFormat('header.Accept', 'header');
    expect(result.length).to.equal(2);
    expect(result).to.eql(['header.Accept', 'Accept']); 
  });
});

describe('function paramKeyFormat', async function () {
  it('should pass Upper-Kebab-Case header names', async function () {
    const targetVal = [ 
      'header.Foo',
      'header.Foo-Bar',
      'header.Foo-Bar-BAZ',
    ];

    for(const t of targetVal) {
      const result = paramKeyFormat(t, { type: 'header'});
      expect(result, 'targetVal: ' + t).to.eql([]);
    }
  });

  it('should fail non-Upper-Kebab-Case header keys', async function () {
    const targetVal = [ 
      'header.foo',
      'header.-Foo-Bar',
      'header.Foo-Bar-',
    ];

    for(const t of targetVal) {
      const result = paramKeyFormat(t, { type: 'header' });
      expect(result).to.eql([{
        message: 'header parameter keys should have Upper-Kebab-Case suffix'
      }]);
    }
  });

  it('should pass kebab-case path parameter keys', async function () {
    const targetVal = [ 
      'path.foo',
      'path.foo-bar',
      'path.foo-bar-baz',
    ];

    for(const t of targetVal) {
      const result = paramKeyFormat(t, { type: 'path' });
      expect(result).to.eql([]);
    }
  });

  it('should fail non-kebab-case path parameter keys', async function () {
    const targetVal = [ 
      'path.-foo-bar',
      'path.foo-bar-',
    ];

    for(const t of targetVal) {
      const result = paramKeyFormat(t, { type: 'path' });
      expect(result).to.eql([{
        message: 'path parameter keys should have kebab-case suffix'
      }]);
    }
  });

  it('should pass flatcase query parameter keys', async function () {
    const targetVal = [ 
      'query.foo',
      'query.foo123'
    ];

    for(const t of targetVal) {
      const result = paramKeyFormat(t, { type: 'query' });
      expect(result).to.eql([]);
    }
  });

  it('should fail non-flatcase query parameter keys', async function () {
    const targetVal = [ 
      'query.foo-bar',
      'query.foo_bar',
      'query.Foo',
      'query.123foo'
    ];

    for(const t of targetVal) {
      const result = paramKeyFormat(t, { type: 'query' });
      expect(result).to.eql([{
        message: 'query parameter keys should have flatcase suffix'
      }]);
    }
  });

  it('should pass PascalCase body parameter keys', async function () {
    const targetVal = [ 
      'body.Foo',
      'body.FooBar',
      'body.Foo123'
    ];

    for(const t of targetVal) {
      const result = paramKeyFormat(t, { type: 'body' });
      expect(result).to.eql([]);
    }
  });

  it('should fail non-PascalCase body parameter keys', async function () {
    const targetVal = [ 
      'body.foo',
      'body.Foo_Bar',
      'body.Foo-Bar',
      'body.123Foo'
    ];

    for(const t of targetVal) {
      const result = paramKeyFormat(t, { type: 'body' });
      expect(result).to.eql([{
        message: 'body parameter keys should have PascalCase suffix'
      }]);
    }
  });
});