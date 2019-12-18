const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");

describe("add", () => {
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
    .command(["add", "-a=*"])
    .it("runs add --a=*", ctx => {
      expect(ctx.stdout).to.contain("has been added to the repository");
    });

  test
    .stdout()
    .command(["add", "-d=*"])
    .it("runs add --d=*", ctx => {
      expect(ctx.stdout).to.contain("has been added to the repository");
    });
  test
    .stdout()
    .command(["add", "-p=*"])
    .it("runs add --p=*", ctx => {
      expect(ctx.stdout).to.contain("has been added to the repository");
    });
});
