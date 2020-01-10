const { Command, flags } = require("@oclif/command");

class PushCommand extends Command {
  async run() {
    const { flags } = this.parse(ConfigureCommand);

    const repoService = new RepositoryService();
    if (!repoService.repoIsValid()) {
      this.error("This is not a Fortellis repository.");
    }
  }
}

PushCommand.description = `Push specified api spec to fortellis.
...
Publish the API spec to Fortellis: either an update of an existing spec
in DRAFT status, or a new version of a spec in FINAL status.
`;

PushCommand.flags = {
  file: flags.string({
    char: "f"
  })
};

module.exports = PushCommand;
