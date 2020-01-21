/* eslint-disable no-console */
/* eslint-disable no-undef */
const { expect, test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');

describe('init', () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteLocalRepository();
    console.log('Cleaning up repository');
  });

  describe('- init an empty repo', () => {
    test
      .stdout()
      .command(['init', '-n=MyOrg', '-i=1234'])
      .it('runs init', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });
  });

  describe('- init an already created repo', () => {
    test
      .stdout()
      .command(['init', '-n=MyOrg', '-i=1234'])
      .exit(2)
      .it('exit with status 2 if repo already exists');
  });
});
