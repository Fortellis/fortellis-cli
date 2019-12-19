const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const inquirer = require("inquirer");
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
      // This literal list of organizations needs to eventually be a list created
      // by a call to Fortellis with the provided username/password. It will then
      // display the names, but save the organizationId
      let organizationList = [
        "Fortellis-DNP",
        "Tirith Used Cars",
        "CDK Global"
      ];
      const questions = [
        {
          type: "input",
          name: "fortellisUsername",
          message: "username:"
        },
        {
          type: "password",
          name: "fortellisPassword",
          message: "password:"
        },
        {
          type: "list",
          name: "organization",
          message: "Select organization:",
          choices: organizationList
        }
      ];

      inquirer.prompt(questions).then(answers => {
        this.log(answers);

        const configManagementService = new ConfigManagementService();
        configManagementService.loadConfig();
        configManagementService.setUsername(answers.fortellisUsername);
        configManagementService.setPassword(answers.fortellisPassword);
        configManagementService.setOrgId(answers.organization);
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
