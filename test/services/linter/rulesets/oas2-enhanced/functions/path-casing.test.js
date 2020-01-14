const { expect } = require('chai');

const { pathCasing } = require('../../../../../../src/services/linter/rulesets/oas2-enhanced/functions');

describe('function pathCasing', async function () {
  it('should properly match kebab-case path segments', async function () {
    const test = [
      { 
        path: '/', 
        expected: []
      },
      {
        path: '/foo',
        expected: []
      },
      {
        path: '/foo-bar',
        expected: []
      },
      {
        path: '/foo-bar/baz',
        expected: []
      },
      {
        path: '/{foo}',
        expected: []
      },
      {
        path: '/foo/{bar}',
        expected: []
      },
      {
        path: '/foo/{bar}/baz',
        expected: []
      },
    ];

    for(const t of test) {
      const results = pathCasing(t.path, { casing: 'kebabCase'});
      expect(results, `path: ${t}`).to.eql(t.expected);
    }
  });
});