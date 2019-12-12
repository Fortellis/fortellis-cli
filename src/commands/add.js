const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const ConfigManagementService = require("../services/config.management.service");
const RepositoryService = require("../services/repository.service");

class AddCommand extends Command {
  async run() {
    const { flags } = this.parse(AddCommand);

    const repositoryService = new RepositoryService();

    // Verify that this is a Fortellis repo
    if (!repositoryService.repoIsValid()) {
      this.error("This is not a Fortellis repository.");
      return 1;
    }

    const configManagementService = new ConfigManagementService();
    configManagementService.loadConfig();

    let fileName = "";

    if (flags.apispec) {
      // Save a new Spec file to the config
      fileName = flags.apispec;
      if (fileName == "*") {
        // If file name is '*', use the file in the directory.
        configManagementService.setSpecFile(
          repositoryService.getSpecInDirectory()
        );
      } else {
        // If the file name is specified, make sure it is a .yaml file.
        if (fileName.indexOf(".yaml") < 0) {
          fileName += ".yaml";
        }
        configManagementService.setSpecFile(fileName);
      }
    } else if (flags.documentation) {
      // Save a new Documentation file to the config
      fileName = flags.documentation;
      if (fileName == "*") {
        configManagementService.setDocFile(
          repositoryService.getDocsInDirectory()
        );
      } else {
        configManagementService.setDocFile(fileName);
      }
    } else if (flags.permission) {
      // Save a new Permissions file to the config
      fileName = flags.permission;
      if (fileName == "*") {
        configManagementService.setAuthFile(
          repositoryService.getAuthInDirectory()
        );
      } else {
        configManagementService.setAuthFile(fileName);
      }
    } else {
      this.log(
        "You must specifiy the type of flie to be added to the repository"
      );
      return 1;
    }

    configManagementService.saveConfig();

    // this.log(`${fileName} has been added to the repository.`);
  }
}

AddCommand.description = `Add an item to the Fortellis repository.
...
Add either an API Spec, API Docs, or Permissions file to the repository.

The file name can be specified, or if '*' is entered as a file name the
file which is in the proper diretory (specs/docs/permissions) will be added 
to the repository.
`;

AddCommand.flags = {
  apispec: flags.string({
    char: "a",
    description: "Add Spec file to the repostory"
  }),
  documentation: flags.string({
    char: "d",
    description: "Add Documentation file to the repository"
  }),
  permission: flags.string({
    char: "p",
    description: "Add Permissions file to the repository"
  })
};

module.exports = AddCommand;
