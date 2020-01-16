/* eslint-disable no-console */
/* eslint-disable no-undef */
const { expect, test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');

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
      .exit(2)
      .it('exits with status 2 if repo does not exist');
  });

  describe('- push with a repo, but no file', () => {
    test
      .stdout()
      .command(['init', '-n=MyOrg', '-i=1234'])
      .it('creating repo', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });

    test
      .stdout()
      .command(['push', '-p=myPass', '-u=myUser', '-f=testFile.yaml'])
      .exit(2)
      .it('exit with status 2 if file does not exist');
  });
});
