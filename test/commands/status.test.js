/* eslint-disable no-undef */
/* eslint-disable no-console */
const { expect, test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');
const fs = require('fs');
const { ERRORS } = require('../../src/utils/errors');

describe('status', () => {
  // Once all tests are done, clear out the repo artifacts
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteLocalRepository();
    if (fs.existsSync('./sampleApiSpec.yaml')) {
      fs.unlinkSync('./sampleApiSpec.yaml');
    }
    console.log('Cleaning up repository');
  });

  describe('- status of a non-repo directory', () => {
    test
      .stdout()
      .command(['status'])
      .exit(ERRORS.REPO_INVALID.exit)
      .it('exits with correct status when repo does not exist');
  });

  describe('- status with a created directory', () => {
    after(() => {
      const repoService = new RepositoryService();
      repoService.deleteLocalRepository();
      console.log('Cleaning up repository');
    });

    test
      .stdout()
      .command(['init', '-n=MyOrg', '-i=1234'])
      .it('creating repo', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });

    test
      .stdout()
      .command(['status'])
      .it('run status', ctx => {
        expect(ctx.stdout).to.contain('Spec Files:');
      });
  });

  describe('- status after using template to create repo files', () => {
    after(() => {
      const repoService = new RepositoryService();
      repoService.deleteLocalRepository();
      console.log('Cleaning up repository');
    });

    test
      .stdout()
      .command(['init', '-n=MyOrg', '-i=1234'])
      .it('creating repo', ctx => {
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
      .command(['status'])
      .it('runs status', ctx => {
        expect(ctx.stdout).to.contain('sampleApiSpec.yaml');
      });
  });
});
