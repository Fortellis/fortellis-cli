const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");

describe("configure", () => {
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
    .command(["configure", "-u=username", "-p=password"])
    .it("runs config -u=username -p=password", ctx => {
      expect(ctx.stdout).to.contain("Configuration completed.");
    });
});
