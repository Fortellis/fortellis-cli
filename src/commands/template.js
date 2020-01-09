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
class TemplateCommand extends Command {
  async run() {
    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error("This is not a Fortellis repository.");
    }

    fs.copyFile(
      `${__dirname}/../resources/sampleApiSpec.yaml`,
      "./sampleApiSpec.yaml",
      err => {
        if (err) {
          this.error("Error copying template API spec file:", err);
        }
      }
    );

    const configService = new ConfigManagementService();
    configService.loadConfig();
    configService.addSpecFile("sampleApiSpec.yaml");
    configService.saveConfig();

    this.log("Template Created: sampleApiSpec.yaml");
  }
}

TemplateCommand.description = `Put example template documents into an empty repository.
...
This creates sample spec, documentaiton, and permissions documents that the user can then modify for API development.
`;

module.exports = TemplateCommand;
