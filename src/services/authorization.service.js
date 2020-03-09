/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
const axios = require('axios');
const ConfigManagementService = require('./config.management.service');
const constants = require('../utils/constants');

const parseLocationHeader = function(header) {
  let urlRegEx = /^(.*)\:\/\/([a-zA-Z0-9\.-]*)(\:(\d+))?\/?([a-zA-Z0-9\.\/-]*)\??(.*)/;

  let matches = urlRegEx.exec(header);

  let query = {};

  if (Array.isArray(matches) && matches.length >= 7) {
    let args = matches[6];
    let argList = args.split('&');
    argList.forEach(item => {
      let keyValuePair = item.split('=');
      query[keyValuePair[0]] = keyValuePair[1];
    });
    return query;
  }
};

async function getSessionId(authUsername, authPassword) {
  try {
    // set the url
    const sessionUrl = `${constants.getSessionUrl}`;

    // request data object
    const data = {
      username: authUsername,
      password: authPassword
    };

    // set the headers
    const config = {
      headers: {
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        Host: 'api.accounts-dev.fortellis.io',
        Accept: '*/*'
      }
    };

    let res = await axios.post(sessionUrl, data, config);

    let returnValue = {
      uid: res.data.payload._embedded.user.id,
      sessionId: res.data.payload.sessionToken
    };

    return returnValue;
  } catch (error) {
    let message = '';
    if (error.response.status === 404) {
      // Username not found.
      message = 'Username/password incorrect.';
    } else if (error.response.status === 401) {
      // Password for user is incorrect.
      message = 'Username/password incorrect.';
    } else {
      message = error.response.status + ': ' + error.response.statusText;
    }
    throw message;
  }
}

async function getToken(sessionToken, entityId) {
  try {
    const tokenUrl = `${constants.authTokenUrl}?client_id=0oa4qokpibPph9mnb2p7&nonce=nonce&prompt=none&redirect_uri=https%3A%2F%2Fdeveloper-dev.fortellis.io%2F&response_mode=fragment&response_type=token&scope=openid%20email%20profile&state=state&sessionToken=${sessionToken}`;

    let myHeaders = {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    };

    // If there is an entity, add it to the Cookie header.
    if (entityId) {
      myHeaders['Cookie'] = `entityId=${entityId}`;
    }

    config = {
      headers: myHeaders,
      maxRedirects: 0
    };

    let locationHeader = await axios
      .get(tokenUrl, config)
      .then(response => {
        if (response.status === 302) {
          return response.headers.location;
        }
      })
      .catch(error => {
        response = error.response;
        if (response.status === 302) {
          return response.headers.location;
        }
      });

    let queries = parseLocationHeader(locationHeader);

    return queries['#access_token'];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

class AuthorizationService {
  constructor() {
    this.authToken = '';
  }

  async getAuthToken(username, password) {
    let configManagementService = new ConfigManagementService();
    configManagementService.loadLocalConfig();

    // Get the okta sessionID
    let userSession = '';
    if (username && password) {
      try {
        userSession = await getSessionId(username, password);
      } catch (error) {
        throw error;
      }
    } else {
      configManagementService.loadGlobalConfig();
      userSession = await getSessionId(
        configManagementService.username,
        configManagementService.password
      );
    }

    // Get the auth token
    let token = '';
    if (configManagementService.orgId) {
      token = await getToken(
        userSession.sessionId,
        configManagementService.orgId
      );
    } else {
      token = await getToken(userSession.sessionId);
    }

    return {
      uid: userSession.uid,
      token: token
    };
  }
}

module.exports = AuthorizationService;
