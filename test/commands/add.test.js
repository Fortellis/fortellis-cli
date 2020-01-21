/* eslint-disable no-console */
/* eslint-disable no-undef */
const { expect, test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');
const fs = require('fs');

describe('add', () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteLocalRepository();
    if (fs.existsSync('./sampleApiSpec.yaml')) {
      fs.unlinkSync('./sampleApiSpec.yaml');
    }
    console.log('Cleaning up repository');
  });

  describe('- Add file with no repository...', () => {
    test
      .stdout()
      .command(['add', '-a=*'])
      .exit(2)
      .it('exits with status 2 when repo does not exist');
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
      .command(['add', '-a=testSpec.yaml'])
      .exit(2)
      .it('Exits with status 2 when file does not exist');
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
      .command(['add', '-s', 'sampleApiSpec.yaml'])
      .exit(2)
      .it('Exits with status 2 when file is already in the repo');
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
      .command(['add', '-s', 'sampleApiSpec.yaml'])
      .it('add a file', ctx => {
        expect(ctx.stdout).to.contain('has been added to the repository');
      });
  });
});
