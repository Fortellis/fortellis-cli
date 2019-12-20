const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");
const ConfigManagementService = require("../../src/services/config.management.service");

describe("status", () => {
  // Once all tests are done, clear out the repo artifacts
  // after(() => {
  //   const repoService = new RepositoryService();
  //   repoService.deleteRepositoy();
  //   console.log("Cleaning up repository");
  // });

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
        expect(ctx.stdout).to.contain("Spec File:");
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
      .command(["template"])
      .it("create template files", ctx => {
        expect(ctx.stdout).to.contain("Template Created:");
      });

    test
      .stdout()
      .command(["status"])
      .it("runs status", ctx => {
        expect(ctx.stdout).to.contain("Spec File:\tsampleApiSpec.yaml");
      });
  });

  describe("- spec file status checks", () => {
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
      .command(["template"])
      .it("create template files", ctx => {
        expect(ctx.stdout).to.contain("Template Created:");
      });

    test
      .stdout()
      .command(["add", "-a=newStatus.yaml"])
      .it("change spec file in config that doesn't match file in repo", ctx => {
        expect(ctx.stdout).to.contain("newStatus.yaml has been added");
      });

    test
      .stdout()
      .command(["add", "-d=newDoc.txt"])
      .it("change doc file in config that doesn't match file in repo", ctx => {
        expect(ctx.stdout).to.contain("newDoc.txt has been added");
      });

    test
      .stdout()
      .command(["add", "-p=newAuth.yaml"])
      .it("change doc file in config that doesn't match file in repo", ctx => {
        expect(ctx.stdout).to.contain("newAuth.yaml has been added");
      });

    test
      .stdout()
      .command(["status"])
      .it("spec file will now show as deleted", ctx => {
        expect(ctx.stdout).to.contain("- DELETED");
      });

    it("alter config to remove spec file reference", function() {
      let configService = new ConfigManagementService();
      configService.saveConfig();
    });

    test
      .stdout()
      .command(["status"])
      .it("spec file will now show as added", ctx => {
        expect(ctx.stdout).to.contain("- ADDED");
      });
  });
});
