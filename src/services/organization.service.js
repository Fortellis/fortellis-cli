const axios = require('axios');
const constants = require('../utils/constants');
const ConfigManagementService = require('../services/config.management.service');

// Returns a list of Organization objects { name: <org name>, id: <orgId>}
// for the user of the current repository.
class OrganizationService {
  constructor() {
    this.orgList = [];
  }

  async getUserOrganizations() {
    // Get the auth token from the global config.
    let configService = new ConfigManagementService();
    configService.loadGlobalConfig();

    const url = `${constants.orgListUrl}?userId=${configService.token.uid}`;

    let options = {
      headers: {
        Authorization: `Bearer ${configService.token.token}`
      }
    };

    try {
      let orgResponse = await axios.get(url, options);

      let fullOrgList = orgResponse.data.organizations;

      fullOrgList.forEach(element => {
        this.orgList.push({
          name: element.name,
          id: element.id
        });
      });

      return this.orgList;
    } catch (error) {
      console.log('Error fetching organization list:', error);
    }
  }
}

module.exports = OrganizationService;
