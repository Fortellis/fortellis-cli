const { expect, test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');

describe('configure', () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteRepositoy();
    console.log('Cleaning up repository');
  });

  describe('- Configure with no repository...', () => {
    test
      .stdout()
      .command(['configure'])
      .exit(2)
      .it('exits with status 2 when repo does not exist');
  });

  describe('- Configure after creating a valid repo...', () => {
    test
      .stdout()
      .command(['init'])
      .it('runs init', ctx => {
        expect(ctx.stdout).to.contain('Initialized empty Fortellis repository');
      });

    test
      .stdout()
      .command(['configure', '-u=username', '-p=password', '-o=12345'])
      .it('runs config -u=username -p=password', ctx => {
        expect(ctx.stdout).to.contain('Configuration completed.');
      });
  });
});
