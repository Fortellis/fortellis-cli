const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");

describe("template", () => {
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
    .command(["template"])
    .it("runs template", ctx => {
      expect(ctx.stdout).to.contain("Template Created:");
    });
});
