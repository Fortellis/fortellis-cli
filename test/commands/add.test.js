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
      .it("add --a=*", ctx => {
        expect(ctx.stdout).to.contain("has been added to the repository");
      });

    test
      .stdout()
      .command(["add", "-d=*"])
      .it("add --d=*", ctx => {
        expect(ctx.stdout).to.contain("has been added to the repository");
      });
    test
      .stdout()
      .command(["add", "-p=*"])
      .it("add --p=*", ctx => {
        expect(ctx.stdout).to.contain("has been added to the repository");
      });
  });
});
