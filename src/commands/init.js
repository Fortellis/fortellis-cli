const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const ConfigManagementService = require("../services/config.management.service");

class InitCommand extends Command {
  async run() {
    const configDir = "./.fortellis";
    const specDir = "./specs";

    if (fs.existsSync(configDir)) {
      this.error("This directory is already a Fortellis repository.");
      return 1;
    }
    fs.mkdirSync(configDir);

    if (!fs.existsSync(specDir)) {
      fs.mkdirSync(specDir);
    }

    let configData = {
      authorization: {
        username: "",
        password: ""
      },
      specification: {
        apiSpecFile: "",
        apiDocsFile: "",
        apiAuthFile: ""
      },
      fortellisServer: "https://fortellis-dev.io"
    };

    const configManagementService = new ConfigManagementService("", "", "");
    configManagementService.setConfig();

    this.log(
      `Initialized empty Fortellis repository in ${process.cwd()}/.fortellis/`
    );
  }
}

InitCommand.description = `Initialize a Fortellis repository in the current directory.
...
This creates a .fortellis directory and creates a default config.yaml file.
`;

module.exports = InitCommand;
