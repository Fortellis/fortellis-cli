const { expect } = require('chai');

const { Spectral } = require('@stoplight/spectral');
const rules = require('../../../../src/services/linter/rulesets/oas2-fortellis');
const functions = require('../../../../src/services/linter/functions/oas2-fortellis');

describe('rule wop_f001', () => {
  const s = new Spectral();
  s.addFunctions(functions);
  s.addRules({
    wop_f001: rules.wop_f001
  });
  s.mergeRules();

  it('should pass if operation declares a required header parameter named `Request-Id`', async function() {
    const test = {
      paths: {
        '/': {
          get: {
            parameters: [
              {
                name: 'Request-Id',
                in: 'header',
                required: true
              }
            ]
          }
        }
      }
    };

    const results = await s.run(test);
    expect(results).to.eql([]);
  });

  it('should fail if operation does not declare a header parameter named `Request-Id`', async function() {
    const test = {
      paths: {
        '/': {
          get: {
            parameters: [
              {
                name: 'Foo',
                in: 'header'
              }
            ]
          }
        }
      }
    };

    const expected = {
      message: 'operation objects must declare a `Request-Id` header parameter'
    };

    const results = await s.run(test);
    expect(results).to.have.lengthOf(1);
    expect(results[0]).to.contain(expected);
  });

  it('should fail if operation does not declare the `Request-Id` header parameter as required', async function() {
    const test = {
      paths: {
        '/': {
          get: {
            parameters: [
              {
                name: 'Request-Id',
                in: 'header',
                required: false
              }
            ]
          }
        }
      }
    };

    const expected = {
      message: 'operation objects must require the Request-Id header'
    };

    const results = await s.run(test);
    expect(results).to.have.lengthOf(1);
    expect(results[0]).to.contain(expected);
  });
});
