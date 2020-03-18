const { expect } = require('chai');
const {
  fortellisParamNameFormat
} = require('../../../../src/services/linter/functions/oas2-fortellis');

describe('function fortellisParamNameFormat', function() {
  it('should silently ignore parameters missing the `name` property', async function() {
    const tests = [
      { in: 'header' },
      { in: 'path' },
      { in: 'query' },
      { in: 'path' }
    ];

    for (const t of tests) {
      const result = fortellisParamNameFormat(t);
      expect(result).to.eql([]);
    }
  });

  it('should silently ignore parameters missing the `in` property', async function() {
    const tests = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];

    for (const t of tests) {
      const result = fortellisParamNameFormat(t);
      expect(result).to.eql([]);
    }
  });

  it('should pass if the `name` property of `header` parameter objects is `Upper-Kebab-Case`', async function() {
    const tests = [
      { name: 'Foo', in: 'header' },
      { name: 'Foo-Bar', in: 'header' },
      { name: 'Foo-Bar-BAZ', in: 'header' }
    ];

    for (const t of tests) {
      const result = fortellisParamNameFormat(t);
      expect(result).to.eql([]);
    }
  });

  it('should fail if the `name` property of `header` parameter objects is not `Upper-Kebab-Case`', async function() {
    const tests = [
      { name: 'foo', in: 'header' },
      { name: '-Foo-Bar', in: 'header' },
      { name: 'Foo-Bar-', in: 'header' }
    ];

    for (const t of tests) {
      const result = fortellisParamNameFormat(t);
      expect(result).to.eql([
        {
          message:
            'the `name` property of `header` parameter objects should be `Upper-Kebab-Case`'
        }
      ]);
    }
  });

  it('should pass if the `name` property of `path` parameter objects is `camelCase`', async function() {
    const tests = [
      { name: 'foo', in: 'path' },
      { name: 'fooBar', in: 'path' },
      { name: 'fooBarBAZ', in: 'path' },
      { name: 'foo123', in: 'path' }
    ];

    for (const t of tests) {
      const result = fortellisParamNameFormat(t);
      expect(result).to.eql([]);
    }
  });

  it('should fail if the `name` property of `path` parameter objects is not `camelCase`', async function() {
    const tests = [
      { name: 'Foo', in: 'path' },
      { name: 'foo-bar', in: 'path' },
      { name: '123foo', in: 'path' }
    ];

    for (const t of tests) {
      const result = fortellisParamNameFormat(t);
      expect(result).to.eql([
        {
          message:
            'the `name` property of `path` parameter objects should be `camelCase`'
        }
      ]);
    }
  });

  it('should pass if the `name` property of `query` parameter objects is `camelCase`', async function() {
    const tests = [
      { name: 'foo', in: 'query' },
      { name: 'fooBar', in: 'query' },
      { name: 'fooBarBAZ', in: 'query' },
      { name: 'foo123', in: 'query' }
    ];

    for (const t of tests) {
      const result = fortellisParamNameFormat(t);
      expect(result).to.eql([]);
    }
  });

  it('should fail if the `name` property of `query` parameter objects is not `camelCase`', async function() {
    const tests = [
      { name: 'Foo', in: 'query' },
      { name: 'foo-bar', in: 'query' },
      { name: '123foo', in: 'query' }
    ];

    for (const t of tests) {
      const result = fortellisParamNameFormat(t);
      expect(result).to.eql([
        {
          message:
            'the `name` property of `query` parameter objects should be `camelCase`'
        }
      ]);
    }
  });

  it('should pass if the `name` property of `body` parameter objects is `PascalCase`', async function() {
    const tests = [
      { name: 'Foo', in: 'body' },
      { name: 'FooBar', in: 'body' },
      { name: 'Foo123', in: 'body' }
    ];

    for (const t of tests) {
      const result = fortellisParamNameFormat(t);
      expect(result).to.eql([]);
    }
  });

  it('should fail if the `name` property of `body` parameter objects is not `PascalCase`', async function() {
    const tests = [
      { name: 'foo', in: 'body' },
      { name: 'Foo_Bar', in: 'body' },
      { name: 'Foo-Bar', in: 'body' },
      { name: '123Foo', in: 'body' }
    ];

    for (const t of tests) {
      const result = fortellisParamNameFormat(t);
      expect(result).to.eql([
        {
          message:
            'the `name` property of `body` parameter objects should be `PascalCase`'
        }
      ]);
    }
  });
});
