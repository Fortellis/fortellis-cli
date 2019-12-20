const { expect, test } = require("@oclif/test");
const RepositoryService = require("../../src/services/repository.service");

describe("add", () => {
  after(() => {
    const repoService = new RepositoryService();
    repoService.deleteRepositoy();
    console.log("Cleaning up repository");
  });

  describe("- Add file with no repository...", () => {
    test
      .stdout()
      .command(["add", "-a=*"])
      .exit(2)
      .it("exits with status 2 when repo does not exist");
  });

  describe("- Add a file to a valid repo...", () => {
    test
      .stdout()
      .command(["init"])
      .it("init repo", ctx => {
        expect(ctx.stdout).to.contain("Initialized empty Fortellis repository");
      });

    test
      .stdout()
      .command(["add", "-a=*"])
      .it("add file with *", ctx => {
        expect(ctx.stdout).to.contain("has been added to the repository");
      });

    test
      .stdout()
      .command(["add", "-a=mySpec"])
      .it("add file with a file name", ctx => {
        expect(ctx.stdout).to.contain("has been added to the repository");
      });

    test
      .stdout()
      .command(["add", "-d=*"])
      .it("add documentation with *", ctx => {
        expect(ctx.stdout).to.contain("has been added to the repository");
      });

    test
      .stdout()
      .command(["add", "-d=myDocs.txt"])
      .it("add documentation with a file name", ctx => {
        expect(ctx.stdout).to.contain("has been added to the repository");
      });

    test
      .stdout()
      .command(["add", "-p=*"])
      .it("add permissions with a *", ctx => {
        expect(ctx.stdout).to.contain("has been added to the repository");
      });

    test
      .stdout()
      .command(["add", "-p=myPermissions.yaml"])
      .it("add permissions with a file name", ctx => {
        expect(ctx.stdout).to.contain("has been added to the repository");
      });

    test
      .stdout()
      .command(["add"])
      .exit(2)
      .it("add command with no flag");
  });
});
