/* eslint-disable no-undef */
/* eslint-disable no-console */

const apiTemplate = require('../../src/commands/api-template');
const constants = require('../../src/utils/constants');
const fs = require('fs');

let result;

describe('api-template command', () => {
  afterEach(() => {
    if (fs.existsSync(constants.sampleSpecName)) {
      fs.unlinkSync(constants.sampleSpecName);
    }
    console.log('Cleaning up repository');
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    result = [];
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => result.push(val));
  });

  describe('create a template Open API 2.0 document in the current directory', function() {
    it('created API template file', async () => {
      await apiTemplate.run([]);
      const e = fs.existsSync(constants.sampleSpecName);
      expect(e).toBe(true);
    });
  });
});
