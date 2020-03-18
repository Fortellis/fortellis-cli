const { expect } = require('chai');
const {
  fortellisParamKeyFormat
} = require('../../../../src/services/linter/functions/oas2-fortellis');

describe('function fortellisParamKeyFormat', function() {
  it('should fail keys with invalid structure', async function() {
    const tests = [{ key: 'headerFoo-Bar' }];

    for (const t of tests) {
      const result = fortellisParamKeyFormat(t.key);
      expect(result).to.eql([
        {
          message:
            'invalid structure.  Structure should be `{header|path|query|body}.{param_name}`'
        }
      ]);
    }
  });

  it('should fail keys with invalid prefix', async function() {
    const tests = [{ key: 'foo.barBaz' }];

    for (const t of tests) {
      const result = fortellisParamKeyFormat(t.key);
      expect(result).to.eql([
        {
          message:
            'invalid prefix `foo`. Prefix should be `header`,`path`,`query`, or `body`'
        }
      ]);
    }
  });

  it('should pass if the `header` parameter object key is Upper-Kebab-Case', async function() {
    const tests = [
      { key: 'header.Foo' },
      { key: 'header.Foo-Bar' },
      { key: 'header.Foo-Bar-BAZ' }
    ];

    for (const t of tests) {
      const result = fortellisParamKeyFormat(t.key);
      expect(result).to.eql([]);
    }
  });

  it('should fail if the `header` parameter object key is not Upper-Kebab-Case', async function() {
    const tests = [
      { key: 'header.foo' },
      { key: 'header.-Foo-Bar' },
      { key: 'header.Foo-Bar-' }
    ];

    for (const t of tests) {
      const result = fortellisParamKeyFormat(t.key);
      expect(result).to.eql([
        {
          message:
            'suffix is incorrect case. The suffix of `header` parameter objects should be `Upper-Kebab-Case`'
        }
      ]);
    }
  });

  it('should pass if the `path` parameter object key is camelCase', async function() {
    const tests = [
      { key: 'path.foo' },
      { key: 'path.fooBar' },
      { key: 'path.fooBarBAZ' },
      { key: 'path.fooBar123' }
    ];

    for (const t of tests) {
      const result = fortellisParamKeyFormat(t.key);
      expect(result).to.eql([]);
    }
  });

  it('should fail if the `path` parameter object key suffix is not camelCase', async function() {
    const tests = [{ key: 'path.-foo-bar' }, { key: 'path.foo-bar-' }];

    for (const t of tests) {
      const result = fortellisParamKeyFormat(t.key);
      expect(result).to.eql([
        {
          message:
            'suffix is incorrect case. The suffix of `path` parameter objects should be `camelCase`'
        }
      ]);
    }
  });

  it('should pass if the `query` parameter object key suffix is camelCase', async function() {
    const tests = [{ key: 'query.foo' }, { key: 'query.foo123' }];

    for (const t of tests) {
      const result = fortellisParamKeyFormat(t.key);
      expect(result).to.eql([]);
    }
  });

  it('should fail if the `query` parameter object key suffix is not camelCase', async function() {
    const tests = [
      { key: 'query.foo-bar' },
      { key: 'query.foo_bar' },
      { key: 'query.Foo' },
      { key: 'query.123foo' }
    ];

    for (const t of tests) {
      const result = fortellisParamKeyFormat(t.key);
      expect(result).to.eql([
        {
          message:
            'suffix is incorrect case. The suffix of `query` parameter objects should be `camelCase`'
        }
      ]);
    }
  });

  it('should pass if the `body` parameter object key suffix is PascalCase', async function() {
    const tests = [
      { key: 'body.Foo' },
      { key: 'body.FooBar' },
      { key: 'body.Foo123' }
    ];

    for (const t of tests) {
      const result = fortellisParamKeyFormat(t.key);
      expect(result).to.eql([]);
    }
  });

  it('should fail if the `body` parameter object key suffix is not PascalCase', async function() {
    const tests = [
      { key: 'body.foo' },
      { key: 'body.Foo_Bar' },
      { key: 'body.Foo-Bar' },
      { key: 'body.123Foo' }
    ];

    for (const t of tests) {
      const result = fortellisParamKeyFormat(t.key);
      expect(result).to.eql([
        {
          message:
            'suffix is incorrect case. The suffix of `body` parameter objects should be `PascalCase`'
        }
      ]);
    }
  });
});
