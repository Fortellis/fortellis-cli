/* eslint-disable no-console */
/* eslint-disable no-undef */
const RepositoryService = require('../../src/services/repository.service');
const path = require('path');
const constants = require('../../src/utils/constants');
const { ERRORS } = require('../../src/utils/errors');
const apiLintCommand = require('../../src/commands/api-lint');

describe('api-lint', () => {
  let stdout;
  afterEach(() => {
    const repoService = new RepositoryService();
    repoService.deleteLocalRepository();
    console.log('Cleaning up repository');
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    stdout = [];
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdout.push(val));
  });

  describe('- run api-lint command with no arguments', () => {
    it('Exits with an error when no file is specified', async () => {
      try {
        await apiLintCommand.run([]);
      } catch (error) {
        expect(error.oclif.exit).toBe(2);
      }
    });
  });

  describe('- run api-lint command with no validation errors', () => {
    it('Exits with a successful exit code when there are no validation errors', async () => {
      try {
        await apiLintCommand.run([
          path.join(__dirname, '../../src/resources', constants.sampleSpecName)
        ]);
      } catch (error) {
        expect(error.oclif.exit).toBe(0);
      }
    });
  });

  describe('- run api-lint command with validation errors', () => {
    it('Exits with a correct exit code when there are validation errors', async () => {
      try {
        await apiLintCommand.run([
          path.join(
            __dirname,
            '../../src/resources',
            constants.sampleErrorSpecName
          )
        ]);
      } catch (error) {
        expect(error.oclif.exit).toBe(ERRORS.SPEC_INVALID.exit);
      }
    });
  });
});
