/* eslint-disable no-undef */
/* eslint-disable no-console */
const { expect, test } = require('@oclif/test');
const constants = require('../../src/utils/constants');
const fs = require('fs');

describe('api-template command', () => {
  after(() => {
    if (fs.existsSync(constants.sampleSpecName)) {
      fs.unlinkSync(constants.sampleSpecName);
    }
    console.log('Cleaning up repository');
  });

  describe('create a template Open API 2.0 document in the current directory', async function() {
    test
      .stdout()
      .command(['api-template'])
      .it('created API template file', async function() {
        const e = fs.existsSync(constants.sampleSpecName);
        expect(e).to.be.true;
      });
  });
});
