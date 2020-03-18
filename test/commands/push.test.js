/* eslint-disable no-console */
/* eslint-disable no-undef */
const RepositoryService = require('../../src/services/repository.service');
const { ERRORS } = require('../../src/utils/errors');
const initCommand = require('../../src/commands/init');
const pushCommand = require('../../src/commands/push');

describe('push', () => {
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

  describe('- push without a repo', () => {
    it('exits with correct status if repo does not exist', async () => {
      try {
        await pushCommand.run(['-p=myPass', '-u=myUser', '-f=testFile.yaml']);
      } catch (error) {
        expect(error.oclif.exit).toBe(ERRORS.REPO_INVALID.exit);
      }
    });
  });

  describe('- push with a repo, but no file type', () => {
    it('exit with status 2 if file type not specified', async () => {
      await initCommand.run(['-n=MyOrg', '-i=1234']);
      expect(stdout[0]).toMatch('Initialized empty Fortellis repository');

      try {
        await pushCommand.run(['-p=myPass', '-u=myUser', '-f=testFile.yaml']);
      } catch (error) {
        expect(error.oclif.exit).toBe(ERRORS.FILE_TYPE_NOT_GIVEN.exit);
      }
    });
  });
});
