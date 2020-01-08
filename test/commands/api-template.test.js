const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");

describe("api-template command", () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteRepositoy();
    console.log("Cleaning up repository");
  });

  describe("Create template where there is no repo", () => {
    test
      .stdout()
      .command(["api-template"])
      .exit(1)
      .it("exits with status 2 when repo does not exist");
  });

  describe("Create template in a fresh repo", () => {
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

  describe("Create template in a repo already populated", () => {
    test
      .stdout()
      .command(["template"])
      .exit(2)
      .it("create template");
  });
});
