/* eslint-disable no-console */
/* eslint-disable no-undef */
const RepositoryService = require('../../src/services/repository.service');
const { ERRORS } = require('../../src/utils/errors');
const initCommand = require('../../src/commands/init');

describe('init', () => {
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

  it('init repo', async () => {
    await initCommand.run(['-n=MyOrg', '-i=1234']);
    expect(stdout[0]).toMatch('Initialized empty Fortellis repository');
  });

  it('init an already created repo', async () => {
    await initCommand.run(['-n=MyOrg', '-i=1234']);
    try {
      await initCommand.run(['-n=MyOrg', '-i=1234']);
    } catch (error) {
      expect(error.oclif.exit).toBe(ERRORS.REPO_ALREADY_EXISTS.exit);
    }
  });
});
