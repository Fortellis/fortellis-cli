/* eslint-disable no-undef */
/* eslint-disable no-console */
const { expect, test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');
const { ERRORS } = require('../../src/utils/errors');

describe('api-template command', () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteLocalRepository();
    console.log('Cleaning up repository');
  });

  describe('Create template where there is no repo', () => {
    test
      .stdout()
      .command(['api-template'])
      .exit(ERRORS.REPO_INVALID.exit)
      .it('exits with correct status when repo does not exist');
  });

  describe('Create template in a fresh repo', () => {
    test
      .stdout()
      .command(['init', '-n=MyOrg', '-i=1234'])
      .it('runs init', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });

    test
      .stdout()
      .command(['api-template'])
      .it('runs template', ctx => {
        expect(ctx.stdout).to.contain('Template spec created');
      });
  });

  describe('Create template in a repo already populated', () => {
    test
      .stdout()
      .command(['template'])
      .exit(2)
      .it('create template');
  });
});
