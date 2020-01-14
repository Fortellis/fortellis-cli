const { expect } = require("chai");
const {
  fortellisParamKeyFormat
} = require("../../../../../src/services/linter/rulesets/oas2-fortellis/functions");

describe("function fortellisParamKeyFormat", async function() {
  // it("should fail keys with invalid type prefix", async function() {
  //   const keys = ["foo.Foo", "headerFoo-Bar"];

  //   for (const k of keys) {
  //     const result = fortellisParamKeyFormat(k);
  //     expect(result, "k: " + k).to.eql([
  //       {
  //         message:
  //           "parameter object keys should follow the structure: `{header|path|query|body}.{name}`"
  //       }
  //     ]);
  //   }
  // });

  it("should pass Upper-Kebab-Case header names", async function() {
    const keys = ["header.Foo", "header.Foo-Bar", "header.Foo-Bar-BAZ"];

    for (const k of keys) {
      const result = fortellisParamKeyFormat(k);
      expect(result, "k: " + k).to.eql([]);
    }
  });

  it("should fail non-Upper-Kebab-Case header keys", async function() {
    const keys = ["header.foo", "header.-Foo-Bar", "header.Foo-Bar-"];

    for (const k of keys) {
      const result = fortellisParamKeyFormat(k);
      expect(result).to.eql([
        {
          message:
            "`header` parameter keys should have `Upper-Kebab-Case` suffix"
        }
      ]);
    }
  });

  it("should pass kebab-case path parameter keys", async function() {
    const keys = ["path.foo", "path.foo-bar", "path.foo-bar-baz"];

    for (const k of keys) {
      const result = fortellisParamKeyFormat(k);
      expect(result).to.eql([]);
    }
  });

  it("should fail non-kebab-case path parameter keys", async function() {
    const keys = ["path.-foo-bar", "path.foo-bar-"];

    for (const k of keys) {
      const result = fortellisParamKeyFormat(k);
      expect(result).to.eql([
        {
          message: "`path` parameter keys should have `kebab-case` suffix"
        }
      ]);
    }
  });

  it("should pass flatcase query parameter keys", async function() {
    const keys = ["query.foo", "query.foo123"];

    for (const k of keys) {
      const result = fortellisParamKeyFormat(k);
      expect(result).to.eql([]);
    }
  });

  it("should fail non-flatcase query parameter keys", async function() {
    const keys = [
      "query.foo-bar",
      "query.foo_bar",
      "query.Foo",
      "query.123foo"
    ];

    for (const k of keys) {
      const result = fortellisParamKeyFormat(k);
      expect(result).to.eql([
        {
          message: "`query` parameter keys should have `flatcase` suffix"
        }
      ]);
    }
  });

  it("should pass PascalCase body parameter keys", async function() {
    const keys = ["body.Foo", "body.FooBar", "body.Foo123"];

    for (const k of keys) {
      const result = fortellisParamKeyFormat(k);
      expect(result).to.eql([]);
    }
  });

  it("should fail non-PascalCase body parameter keys", async function() {
    const keys = ["body.foo", "body.Foo_Bar", "body.Foo-Bar", "body.123Foo"];

    for (const k of keys) {
      const result = fortellisParamKeyFormat(k);
      expect(result).to.eql([
        {
          message: "`body` parameter keys should have `PascalCase` suffix"
        }
      ]);
    }
  });
});
