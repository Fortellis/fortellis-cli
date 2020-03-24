const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const functions = require('../../../../src/services/linter/functions/oas2-enhanced');
const rules = require('../../../../src/services/linter/rulesets/oas2-enhanced');

describe('rule wdef002', () => {
  const s = new Spectral();
  s.addFunctions(functions);
  s.addRules({
    wdef002: rules.wdef002
  });
  s.mergeRules();

  it('should pass if definitions that are explicity type `object` declare a `required` property', async function() {
    const test = {
      definitions: {
        Foo: {
          type: 'object',
          required: []
        }
      }
    };

    const results = await s.run(test);
    expect(results).to.eql([]);
  });

  it('should pass if definitions that are implicitly type `object` declare a `required` property', async function() {
    const test = {
      definitions: {
        Foo: {
          properties: {},
          required: []
        }
      }
    };

    const results = await s.run(test);
    expect(results).to.eql([]);
  });

  it('should pass definitions that are not type `object`', async function() {
    const test = {
      definitions: {
        Foo: {
          type: 'array'
        }
      }
    };

    const results = await s.run(test);
    expect(results).to.eql([]);
  });

  it('should fail if definitions that are explicity type `object` do not declare a `required` property', async function() {
    const test = {
      definitions: {
        Foo: {
          type: 'object'
        }
      }
    };

    const results = await s.run(test);
    expect(results).to.have.lengthOf(1);
  });

  it('should fail if definitions that are implicitly type `object` do not declare a `required` property', async function() {
    const test = {
      definitions: {
        Foo: {
          properties: {}
        }
      }
    };

    const results = await s.run(test);
    expect(results).to.have.lengthOf(1);
  });
});
