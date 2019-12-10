const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const prompt = require("prompt");
const ConfigManagementService = require("../services/config.management.service");

class ConfigureCommand extends Command {
  async run() {
    const configDir = "./.fortellis";
    if (!fs.existsSync(configDir)) {
      this.error("This is not a Fortellis repository.");
      return 1;
    }

    const prompt_attributes = [
      {
        name: "username"
      },
      {
        name: "password",
        hidden: true
      },
      {
        name: "apiSpecName"
      },
      {
        name: "environment"
      }
    ];

    prompt.start();

    prompt.get(prompt_attributes, (err, result) => {
      if (err) {
        console.log(err);
        return 1;
      } else {
        let username = result.username;
        let password = result.password;
        let environment = result.environment;
        let apiSpecName = result.apiSpecName;

        let environmentUrl = "";
        if (environment == "prod" || environment == "production") {
          environmentUrl = "https://fortellis.io";
        } else {
          environmentUrl = "https://fortellis-dev.io";
        }

        let apiSpecFileName = apiSpecName;
        if (apiSpecFileName.indexOf(".yaml") < 0) {
          apiSpecFileName += ".yaml";
        }

        const configManagementService = new ConfigManagementService(
          username,
          password,
          apiSpecFileName
        );
        configManagementService.setConfig();

        this.log("Configuration completed. See config file for stored values.");
      }
    });
  }
}

ConfigureCommand.description = `Configure the Fortellis repository.
...
Set up the repository so it can communicate with Fortellis.
`;

// InitCommand.flags = {
//   name: flags.string({ char: "n", description: "name to print" })
// };

module.exports = ConfigureCommand;
