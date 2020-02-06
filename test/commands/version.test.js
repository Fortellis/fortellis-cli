/* eslint-disable no-console */
/* eslint-disable no-undef */
const { /*expect,*/ test } = require('@oclif/test');
const { version } = require('../../src/utils/constants');

describe('version', () => {
  describe('- run version', () => {
    test
      .stdout()
      .command(['version'])
      .it(
        `fortellis cli version ${version.major}.${version.minor}.${version.patch}`
      );
  });
});
