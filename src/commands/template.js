const { Command, flags } = require("@oclif/command");
const RepositoryService = require("../services/repository.service");
const fs = require("fs");

/**
 * Create a template repository, with a sample Spec, Doc, and Permissions file.
 *
 * This command should not be able to override files that have already been saved to the repository.
 * In fact, it should only be usable on an empty repo.
 *
 */
class TemplateCommand extends Command {
  async run() {
    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error("This is not a valid Fortellis repository.");
      return 1;
    }

    // Check that the repo is empty
    if (
      repoService.getSpecInDirectory() ||
      repoService.getAuthInDirectory() ||
      repoService.getDocsInDirectory()
    ) {
      this.error(
        "Files are alread saved in this repo. Create an empty repo for a template."
      );
      return 1;
    }

    fs.copyFile(
      `${__dirname}/../resources/sampleApiSpec.yaml`,
      "./specs/sampleApiSpec.yaml",
      err => {
        if (err) {
          this.error("Error copying template API spec file");
        }
      }
    );

    fs.copyFile(
      `${__dirname}/../resources/sampleDocumentation.md`,
      "./docs/sampleDocumentation.md",
      err => {
        if (err) {
          this.error("error copying template documentation file.");
        }
      }
    );

    fs.copyFile(
      `${__dirname}/../resources/samplePermissions.txt`,
      "./permissions/samplePermissions.txt",
      err => {
        if (err) {
          this.err("error copying template permissions file.");
        }
      }
    );

    this.log(
      "Template Created: [sampleApiSpec.yaml, sampleDocumentation.md, samplePermissions.txt]"
    );
  }
}

module.exports = TemplateCommand;
