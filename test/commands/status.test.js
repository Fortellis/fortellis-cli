const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");

describe("status", () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteRepositoy();
    console.log("Cleaning up repository");
  });

  test
    .stdout()
    .command(["status"])
    .exit(2)
    .it("exits with status 2 when repo does not exist");

  test
    .stdout()
    .command(["init"])
    .it("runs init", ctx => {
      expect(ctx.stdout).to.contain("Initialized empty Fortellis repository");
    });

  test
    .stdout()
    .command(["status"])
    .it("runs status", ctx => {
      expect(ctx.stdout).to.contain("Spec File:");
    });
});
