/* eslint-disable no-console */
/* eslint-disable no-undef */
const { expect, test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');
const constants = require('../../src/utils/constants');
const fs = require('fs');
const { ERRORS } = require('../../src/utils/errors');

describe('add', () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteLocalRepository();
    if (fs.existsSync(constants.sampleSpecName)) {
      fs.unlinkSync(constants.sampleSpecName);
    }
    console.log('Cleaning up repository');
  });

  describe('- Add file with no repository...', () => {
    test
      .stdout()
      .command(['add', '-a=*'])
      .exit(ERRORS.REPO_INVALID.exit)
      .it('exits with correct status when repo does not exist');
  });

  describe('- Add a file that does not exist', () => {
    after(() => {
      const repoService = new RepositoryService();
      repoService.deleteLocalRepository();
    });

    test
      .stdout()
      .command(['init', '-n=MyOrg', '-i=1234'])
      .it('init repo', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });

    test
      .stdout()
      .command(['add', '-s', 'testSpec.yaml'])
      .exit(ERRORS.FILE_NOT_EXIST.exit)
      .it('Exits with correct status when file does not exist');
  });

  describe('- Add a file that is already in the repo', () => {
    after(() => {
      const repoService = new RepositoryService();
      repoService.deleteLocalRepository();
    });

    test
      .stdout()
      .command(['init', '-n=MyOrg', '-i=1234'])
      .it('init repo', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });

    test
      .stdout()
      .command(['api-template'])
      .it('create template files', ctx => {
        expect(ctx.stdout).to.contain('Template spec created');
      });

    test
      .stdout()
      .command(['add', '-s', constants.sampleSpecName])
      .command(['add', '-s', constants.sampleSpecName])
      .exit(ERRORS.FILE_ALREADY_EXISTS.exit)
      .it('Exits with correct status when file is already in the repo');
  });

  describe('- Add a file', () => {
    before(() => {
      fs.closeSync(fs.openSync('./testSpec.yaml', 'w'));
    });

    after(() => {
      const repoService = new RepositoryService();
      repoService.deleteLocalRepository();
      fs.unlinkSync('./testSpec.yaml');
    });

    test
      .stdout()
      .command(['init', '-n=MyOrg', '-i=1234'])
      .it('init repo', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });

    test
      .stdout()
      .command(['add', '-s', constants.sampleSpecName])
      .it('add a file', ctx => {
        expect(ctx.stdout).to.contain('has been added to the repository');
      });
  });
});
