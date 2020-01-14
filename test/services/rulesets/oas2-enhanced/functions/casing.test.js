const { expect } = require('chai');

const {
  caseTypes
} = require('../../../../../src/services/linter/rulesets/oas2-enhanced/functions');

describe('caseTypes', async function() {
  it('should properly match kebab-case strings', async function() {
    const test = [
      {
        value: 'foo',
        expected: true
      },
      {
        value: 'foo-bar',
        expected: true
      },
      {
        value: 'foo-bar-',
        expected: false
      },
      {
        value: '1foo-bar',
        expected: false
      },
      {
        value: '-foo-bar',
        expected: false
      }
    ];

    for (const t of test) {
      const result = caseTypes.kebabCase.regex.test(t.value);
      expect(result, `is ${t} kebab-case?`).to.equal(t.expected);
    }
  });
});
