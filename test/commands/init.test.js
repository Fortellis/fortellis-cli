const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");

describe("init", () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteRepositoy();
    console.log("Cleaning up repository");
  });

  test
    .stdout()
    .command(["init"])
    .it("runs init", ctx => {
      expect(ctx.stdout).to.contain("Initialized empty Fortellis repository");
    });

  test
    .stdout()
    .command(["init"])
    .exit(2)
    .it("exit with status 2 if repo already exists");
});
