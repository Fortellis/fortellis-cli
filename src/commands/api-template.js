const { Command, flags } = require("@oclif/command");
const RepositoryService = require("../services/repository.service");
const ConfigManagementService = require("../services/config.management.service");
const fs = require("fs");

/**
 * Create a template repository, with a sample Spec, Doc, and Permissions file.
 *
 * This command should not be able to override files that have already been saved to the repository.
 * In fact, it should only be usable on an empty repo.
 *
 */
class ApiTemplateCommand extends Command {
  async run() {
    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error("This is not a Fortellis repository.");
    }

    // Check that the repo is empty
    if (
      repoService.getSpecInDirectory() ||
      repoService.getAuthInDirectory() ||
      repoService.getDocsInDirectory()
    ) {
      this.error(
        "Files are already saved in this repo. Create an empty repo for a template."
      );
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

    const configService = new ConfigManagementService();
    configService.loadConfig();
    configService.setAuthFile("samplePermissions.txt");
    configService.setDocFile("sampleDocumentation.md");
    configService.setSpecFile("sampleApiSpec.yaml");
    configService.saveConfig();

    this.log(
      "Template Created: [sampleApiSpec.yaml, sampleDocumentation.md, samplePermissions.txt]"
    );
  }
}

ApiTemplateCommand.description = `Put example template documents into an empty repository.
...
This creates sample spec, documentaiton, and permissions documents that the user can then modify for API development.
`;

module.exports = ApiTemplateCommand;
