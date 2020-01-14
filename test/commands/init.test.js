const { expect, test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');

describe('init', () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteRepositoy();
    console.log('Cleaning up repository');
  });

  describe('- init an empty repo', () => {
    test
      .stdout()
      .command(['init'])
      .it('runs init', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });
  });

  describe('- init an already created repo', () => {
    test
      .stdout()
      .command(['init'])
      .exit(2)
      .it('exit with status 2 if repo already exists');
  });

  describe('- init a repo with no .fortellis directory, but with the other directories', () => {
    it('remove .fortellis directory', () => {
      let repositoryService = new RepositoryService();
      repositoryService.deleteFolderRecursive('./.fortellis');
    });

    test
      .stdout()
      .command(['init'])
      .it('runs init', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });
  });
});
