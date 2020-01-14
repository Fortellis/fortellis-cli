const axios = require('axios');
const ConfigManagementService = require('./config.management.service');

const parseLocationHeader = function(header) {
  let urlRegEx = /^(.*)\:\/\/([a-zA-Z0-9\.-]*)(\:(\d+))?\/([a-zA-Z0-9\.\/-]*)\??(.*)/;

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
    const sessionUrl = 'https://api.accounts-dev.fortellis.io/api/v1/authn';

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
    if (error.response.status === 404) {
      return '';
    }
    console.error(error);
  }
}

async function getToken(sessionToken) {
  try {
    const tokenUrl = `https://api-dev.identity.fortellis.io/oauth2/aus1ni5i9n9WkzcYa2p7/v1/authorize?client_id=0oa4qokpibPph9mnb2p7&nonce=nonce&prompt=none&redirect_uri=https%3A%2F%2Fdeveloper-dev.fortellis.io%2F&response_mode=fragment&response_type=token&scope=openid%20email%20profile&state=state&sessionToken=${sessionToken}`;

    const config = {
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
        // Host: "api.accounts-dev.fortellis.io"
      },
      maxRedirects: 0
    };

    let locationHeader = await axios
      .get(tokenUrl, config)
      .then(response => {
        if (response.status === 302) {
        }
      })
      .catch(err => {
        response = err.response;
        if (response.status === 302) {
          return response.headers.location;
        }
      });

    let queries = parseLocationHeader(locationHeader);

    return queries['#access_token'];
  } catch (err) {
    console.error(err);
  }
}

class AuthorizationService {
  constructor() {
    this.authToken = '';
  }

  async getAuthToken() {
    let configManagementService = new ConfigManagementService();
    configManagementService.loadConfig();
    let username = configManagementService.username;
    let password = configManagementService.password;

    let userSession = await getSessionId(username, password);

    let token = await getToken(userSession.sessionId);

    return {
      uid: userSession.uid,
      authToken: token
    };
  }
}

module.exports = AuthorizationService;
