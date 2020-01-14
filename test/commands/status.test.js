const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");
const ConfigManagementService = require("../../src/services/config.management.service");
const fs = require("fs");

describe("status", () => {
  // Once all tests are done, clear out the repo artifacts
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteRepositoy();
    if (fs.existsSync("./sampleApiSpec.yaml")) {
      fs.unlinkSync("./sampleApiSpec.yaml");
    }
    console.log("Cleaning up repository");
  });

  describe("- status of a non-repo directory", () => {
    test
      .stdout()
      .command(["status"])
      .exit(2)
      .it("exits with status 2 when repo does not exist");
  });

  describe("- status with a created directory", () => {
    after(() => {
      const repoService = new RepositoryService();
      repoService.deleteRepositoy();
      console.log("Cleaning up repository");
    });

    test
      .stdout()
      .command(["init"])
      .it("creating repo", ctx => {
        expect(ctx.stdout).to.contain("Initialized empty Fortellis repository");
      });

    test
      .stdout()
      .command(["status"])
      .it("run status", ctx => {
        expect(ctx.stdout).to.contain("Spec Files:");
      });
  });

  describe("- status after using template to create repo files", () => {
    after(() => {
      const repoService = new RepositoryService();
      repoService.deleteRepositoy();
      console.log("Cleaning up repository");
    });

    test
      .stdout()
      .command(["init"])
      .it("creating repo", ctx => {
        expect(ctx.stdout).to.contain("Initialized empty Fortellis repository");
      });

    test
      .stdout()
      .command(["api-template"])
      .it("create template files", ctx => {
        expect(ctx.stdout).to.contain("Template Created:");
      });

    test
      .stdout()
      .command(["status"])
      .it("runs status", ctx => {
        expect(ctx.stdout).to.contain("sampleApiSpec.yaml");
      });
  });
});
