const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");

describe("lint", () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteRepositoy();
    console.log("Cleaning up repository");
  });

  describe("- lint where there is no repo", () => {
    test
      .stdout()
      .command(["lint"])
      .exit(2)
      .it("exits with status 2 when repo does not exist");
  });

  describe(" - lint where there is a repo, but no spec file", () => {
    test
      .stdout()
      .command(["init"])
      .it("runs init", ctx => {
        expect(ctx.stdout).to.contain("Initialized empty Fortellis repository");
      });

    test
      .stdout()
      .command(["lint"])
      .exit(2)
      .it("lint non-existing file");
  });

  describe(" - lint where there is a repo and a file to check", () => {
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
});
