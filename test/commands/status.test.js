/* eslint-disable no-undef */
/* eslint-disable no-console */
const RepositoryService = require('../../src/services/repository.service');
const constants = require('../../src/utils/constants');
const fs = require('fs');
const { ERRORS } = require('../../src/utils/errors');
const statusCommand = require('../../src/commands/status');
const initCommand = require('../../src/commands/init');

describe('status', () => {
  let stdout;
  // Once all tests are done, clear out the repo artifacts
  afterEach(() => {
    const repoService = new RepositoryService();
    repoService.deleteLocalRepository();
    if (fs.existsSync(constants.sampleSpecName)) {
      fs.unlinkSync(constants.sampleSpecName);
    }
    console.log('Cleaning up repository');
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    stdout = [];
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdout.push(val));
  });

  describe('- status of a non-repo directory', () => {
    it('exits with correct status when repo does not exist', async () => {
      try {
        await statusCommand.run([]);
      } catch (error) {
        expect(error.oclif.exit).toBe(ERRORS.REPO_INVALID.exit);
      }
    });
  });

  describe('- status with a created directory', () => {
    it('run status', async () => {
      await initCommand.run(['-n=MyOrg', '-i=1234']);
      expect(stdout[0]).toMatch('Initialized empty Fortellis repository');

      await statusCommand.run([]);
      expect(stdout[2]).toMatch('Spec Files:');
    });
  });
});
