const { expect } = require('chai');
const { Spectral } = require('@stoplight/spectral');
const functions = require('../../../../../src/services/linter/rulesets/oas2-fortellis/functions');
const rules = require('../../../../../src/services/linter/rulesets/oas2-fortellis');

describe('rule wpar_f002', () => {
  const s = new Spectral();
  s.addFunctions(functions);
  s.addRules({
    wpar_f002: rules.wpar_f002
  });
  s.mergeRules();

  it("should pass if `name` propery casing matches type specified by `in` property", async function() {
    const results = await s.run({
      parameters: {
        "header.Foo-Bar": {
          name: "Foo-Bar",
          in: "header" 
        },
        "path.foo-bar": {
          name: "fooBar",
          in: "path" 
        },
        "query.foobar": {
          name: "fooBar",
          in: "query" 
        },
        "body.FooBar": {
          name: "FooBar",
          in: "body"
        }
      }
    });

    expect(results).to.eql([]); 
  });

  it("should fail if `name` propery casing does not match type specified by `in` property", async function() {
    const tests = [
      { 
        input: {
          parameters: {
            "header.foobar": {
              name: "foobar",
              in: "header"
            },
          },
        },
        expected: {
          message: "the `name` property of `header` parameter objects should be `Upper-Kebab-Case`"
        },
      },
      {
        input: {
          parameters: {
            "path.FooBar": {
              name: "FooBar",
              in: "path"  
            },
          },
        },
        expected: {
          message: "the `name` property of `path` parameter objects should be `camelCase`"
        },
      },
      {
        input: {
          parameters: {
            "query.foo-bar": {
              name: "foo-bar",
              in: "query"  
            },
          },
        },
        expected: {
          message: "the `name` property of `query` parameter objects should be `camelCase`"
        },
      },
      {
        input: {
          parameters: {
            "body.foobar": {
              name: "foobar",
              in: "body"  
            },
          },
        },
        expected: {
          message: "the `name` property of `body` parameter objects should be `PascalCase`"
        },
      },
    ];
    
    for(const t of tests) {
      const results = await s.run(t.input);
      expect(results.length, "test: " + Object.keys(t.input.parameters)).to.equal(1);
      expect(results[0], "test: " + t).to.contain(t.expected);
    }    
  });
});
