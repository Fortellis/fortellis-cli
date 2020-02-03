/* eslint-disable no-console */
/* eslint-disable no-undef */
const { /*expect,*/ test } = require('@oclif/test');
const RepositoryService = require('../../src/services/repository.service');
const path = require('path');
const { ERRORS } = require('../../src/utils/errors');
//const { Spectral } = require('@stoplight/spectral');

describe('api-lint', () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteLocalRepository();
    console.log('Cleaning up repository');
  });

  describe('- run api-lint command with no arguments', () => {
    test
      .stdout()
      .command(['api-lint'])
      .exit(2)
      .it('Exits with an error when no file is specified');
  });

  describe('- run api-lint command with no validation errors', () => {
    test
      .stdout()
      .command([
        'api-lint',
        path.join(__dirname, '../data/pet-adoption-v1.0.0.yaml')
      ])
      .exit(0)
      .it(
        'Exits with a successful exit code when there are no validation errors'
      );
  });

  describe('- run api-lint command with validation errors', () => {
    test
      .stdout()
      .command([
        'api-lint',
        path.join(__dirname, '../data/pet-adoption-v1.0.0.error.yaml')
      ])
      .exit(ERRORS.SPEC_INVALID.exit)
      .it('Exits with a correct exit code when there are validation errors');
  });

  // describe(" - run api-lint command with the '--file' argument", () => {
  //   test
  //     .stdout()
  //     .command(["api-lint"])
  //     .it("runs api-lint --file petstore.yaml", ctx => {
  //       expect(ctx.stdout).to.contain("results:");
  //     });
  // });

  // describe(" - run api-lint command with the '-f' argument", () => {
  //   test
  //     .stdout()
  //     .command(["api-lint"])
  //     .it("runs api-lint -f petstore.yaml", ctx => {
  //       expect(ctx.stdout).to.contain("results:");
  //     });
  // });
});
