const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");

describe("lint", () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteRepositoy();
    console.log("Cleaning up repository");
  });

  test
    .stdout()
    .command(["lint"])
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
    .command(["template"])
    .it("runs template", ctx => {
      expect(ctx.stdout).to.contain("Template Created:");
    });

  test
    .stdout()
    .command(["lint"])
    .it("runs lint", ctx => {
      expect(ctx.stdout).to.contain("Linting Spec File: sampleApiSpec.yaml");
    });

  test
    .stdout()
    .command(["lint", "-i"])
    .it("runs lint -i", ctx => {
      expect(ctx.stdout).to.contain("Linting Spec File: sampleApiSpec.yaml");
    });
});
