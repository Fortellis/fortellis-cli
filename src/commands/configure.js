const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const prompt = require("prompt");
const ConfigManagementService = require("../services/config.management.service");
const RepositoryService = require("../services/repository.service");

class ConfigureCommand extends Command {
  async run() {
    const { flags } = this.parse(ConfigureCommand);

    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error("This is not a Fortellis repository.");
    }

    let username = "";
    let password = "";
    let organizationId = "";

    if (flags.username && flags.password) {
      // If username/password are given in flags, simply use them and accept the values.
      username = flags.username;
      password = flags.password;

      const configManagementService = new ConfigManagementService();
      configManagementService.loadConfig();
      configManagementService.setUsername(username);
      configManagementService.setPassword(password);
      configManagementService.setOrgId(organizationId);
      configManagementService.saveConfig();

      this.log("Configuration completed. See config file for stored values.");
    } else {
      // If you don't get both flags, then prompt for the values.
      const prompt_attributes = [
        {
          name: "username"
        },
        {
          name: "password",
          hidden: true
        },
        {
          name: "organizationId"
        }
      ];

      if (flags.username && flags.password) {
      }

      prompt.start();

      prompt.get(prompt_attributes, (err, result) => {
        if (err) {
          this.error(err);
        } else {
          username = result.username;
          password = result.password;
          organizationId = result.organizationId;
        }
        const configManagementService = new ConfigManagementService();
        configManagementService.loadConfig();
        configManagementService.setUsername(username);
        configManagementService.setPassword(password);
        configManagementService.setOrgId(organizationId);
        configManagementService.saveConfig();

        this.log("Configuration completed. See config file for stored values.");
      });
    }
  }
}

ConfigureCommand.description = `Configure the Fortellis repository.
...
Set up the repository so it can communicate with Fortellis. This command will edit the
config.yaml file, reflecting the data entered during configuration.
`;

ConfigureCommand.flags = {
  username: flags.string({ char: "u", description: "Fortellis username" }),
  password: flags.string({ char: "p", description: "Fortellis password" })
};

module.exports = ConfigureCommand;
