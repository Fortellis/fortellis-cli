/* eslint-disable no-console */
/* eslint-disable no-undef */
const { expect, test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');
const { ERRORS } = require('../../src/utils/errors');

describe('push', () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteLocalRepository();
    console.log('Cleaning up repository');
  });

  describe('- push without a repo', () => {
    test
      .stdout()
      .command(['push', '-p=myPass', '-u=myUser', '-f=testFile.yaml'])
      .exit(ERRORS.REPO_INVALID.exit)
      .it('exits with correct status if repo does not exist');
  });

  describe('- push with a repo, but no file type', () => {
    test
      .stdout()
      .command(['init', '-n=MyOrg', '-i=1234'])
      .it('creating repo', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });

    test
      .stdout()
      .command(['push', '-p=myPass', '-u=myUser', '-f=testFile.yaml'])
      .exit(ERRORS.FILE_TYPE_NOT_GIVEN.exit)
      .it('exit with status 2 if file type not specified');
  });
});
