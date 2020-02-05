/* eslint-disable no-console */
/* eslint-disable no-undef */
const { /*expect,*/ test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');
const path = require('path');
const constants = require('../../src/utils/constants');
const { ERRORS } = require('../../src/utils/errors');

describe('api-lint', () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteLocalRepository();
    console.log('Cleaning up repository');
  });

  describe('- run api-lint command with no arguments', () => {
    test
      .stdout()
      .command(['api-lint'])
      .exit(2)
      .it('Exits with an error when no file is specified');
  });

  describe('- run api-lint command with no validation errors', () => {
    test
      .stdout()
      .command([
        'api-lint',
        path.join(__dirname, '../../src/resources', constants.sampleSpecName)
      ])
      .exit(0)
      .it(
        'Exits with a successful exit code when there are no validation errors'
      );
  });

  describe('- run api-lint command with validation errors', () => {
    test
      .stdout()
      .command([
        'api-lint',
        path.join(
          __dirname,
          '../../src/resources',
          constants.sampleErrorSpecName
        )
      ])
      .exit(ERRORS.SPEC_INVALID.exit)
      .it('Exits with a correct exit code when there are validation errors');
  });
});
