const AuthorizationService = require("../services/authorization.service");
const axios = require("axios");

// Returns a list of Organization objects { name: <org name>, id: <orgId>}
// for the user of the current repository.
class OrganizationService {
  constructor() {
    this.orgList = [];
  }

  async getOrganizations() {
    let authorizationService = new AuthorizationService();
    let userToken = await authorizationService.getAuthToken();

    // List organizations
    const url = `https://organizations-dev.fortellis.io/v1/organizations?userId=${userToken.uid}`;

    let options = {
      headers: {
        Authorization: `Bearer ${userToken.authToken}`
      }
    };

    let orgResponse = await axios.get(url, options);

    let fullOrgList = orgResponse.data.organizations;

    // console.log(fullOrgList);

    fullOrgList.forEach(element => {
      this.orgList.push({
        name: element.name,
        id: element.id
      });
    });

    return this.orgList;
  }
}

module.exports = OrganizationService;
