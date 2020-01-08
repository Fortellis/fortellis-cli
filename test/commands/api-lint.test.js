const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");

describe("api-lint", () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteRepositoy();
    console.log("Cleaning up repository");
  });

  describe("- run api-lint command with no arguments", () => {
    test
      .stdout()
      .command(["api-lint"])
      .it("runs api-lint", ctx => {
        expect(ctx.stdout).to.contain("run 'fortellis api-lint --help' for more information");
      });
  });

  describe(" - run api-lint command with the '--file' argument", () => {
    test
      .stdout()
      .command(["api-lint"])
      .it("runs api-lint --file petstore.yaml", ctx => {
        expect(ctx.stdout).to.contain("results:");
      });
  });

  describe(" - run api-lint command with the '-f' argument", () => {
    test
      .stdout()
      .command(["api-lint"])
      .it("runs api-lint -f petstore.yaml", ctx => {
        expect(ctx.stdout).to.contain("results:");
      });
  });
});
