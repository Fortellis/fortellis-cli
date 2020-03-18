/* eslint-disable no-console */
/* eslint-disable no-undef */
const RepositoryService = require('../../src/services/repository.service');
const constants = require('../../src/utils/constants');
const fs = require('fs');
const { ERRORS } = require('../../src/utils/errors');
let stdout;
const addCommand = require('../../src/commands/add');
const initCommand = require('../../src/commands/init');
const apiTemplateCommand = require('../../src/commands/api-template');

describe('add', () => {
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

  describe('- Add file with no repository...', () => {
    it('exits with correct status when repo does not exist', async () => {
      try {
        await addCommand.run(['-a=*']);
      } catch (error) {
        expect(error.oclif.exit).toBe(ERRORS.REPO_INVALID.exit);
      }
    });
  });

  describe('- Add a file that does not exist', () => {
    it('should initialize and exit with correct status when file does not exist', async () => {
      await initCommand.run(['-n=MyOrg', '-i=1234']);
      expect(stdout[0]).toMatch('Initialized empty Fortellis repository');

      try {
        await addCommand.run(['-s', 'testSpec.yaml']);
      } catch (error) {
        expect(error.oclif.exit).toBe(ERRORS.FILE_NOT_EXIST.exit);
      }
    });
  });

  describe('- Add a file that is already in the repo', () => {
    it('Exits with correct status when file is already in the repo', async () => {
      await initCommand.run(['-n=MyOrg', '-i=1234']);
      expect(stdout[0]).toMatch('Initialized empty Fortellis repository');

      await apiTemplateCommand.run([]);
      expect(stdout[1]).toMatch('Template spec created');

      try {
        await addCommand.run(['-s', constants.sampleSpecName]);
        await addCommand.run(['-s', constants.sampleSpecName]);
      } catch (error) {
        expect(error.oclif.exit).toBe(ERRORS.FILE_ALREADY_EXISTS.exit);
      }
    });
  });

  describe('- Add a file', () => {
    beforeEach(() => {
      fs.closeSync(fs.openSync(`./${constants.sampleSpecName}`, 'w'));
    });

    afterEach(() => {
      const repoService = new RepositoryService();
      repoService.deleteLocalRepository();
      fs.unlinkSync(`./${constants.sampleSpecName}`);
    });

    it('init repo and add a file', async () => {
      await initCommand.run(['-n=MyOrg', '-i=1234']);
      expect(stdout[0]).toMatch('Initialized empty Fortellis repository');

      await addCommand.run(['-s', constants.sampleSpecName]);
      expect(stdout[1]).toMatch('has been added to the repository');
    });
  });
});
