const { Command, flags } = require("@oclif/command");
const OrganizationService = require("../services/organization.service");
const AuthorizationService = require("../services/authorization.service");
const axios = require("axios");

class ListCommand extends Command {
  async run() {
    // let authorizationService = new AuthorizationService();
    // let userToken = await authorizationService.getAuthToken();

    // console.log("AuthToken:", userToken);

    // // Test to list organizations
    // const url = `https://organizations-dev.fortellis.io/v1/organizations?userId=${userToken.uid}`;

    // let options = {
    //   headers: {
    //     Authorization: `Bearer ${userToken.authToken}`
    //   }
    // };

    // let orgList = await axios.get(url, options);

    let orgService = new OrganizationService();
    await orgService.getOrganizations();

    console.log("Organizations:", orgService.orgList);
  }
}

ListCommand.description = `List all specs for the current organization.
...
`;

module.exports = ListCommand;
