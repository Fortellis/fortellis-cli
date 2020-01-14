const { Command, flags } = require('@oclif/command');
// const https = require("https");
const axios = require('axios');

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

async function getSessionId() {
  try {
    // set the url
    const sessionUrl = 'https://api.accounts-dev.fortellis.io/api/v1/authn';

    // request data object
    const data = {
      username: 'daniel.eastland@cdk.com',
      password: 'Development123!'
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

    let uid = res.data.payload._embedded.user.id;
    return res.data.payload.sessionToken;
  } catch (err) {
    console.error(err);
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

class GetAuthTommand extends Command {
  async run() {
    const { flags } = this.parse(GetAuthTommand);

    // let session_id = await this.getOktaSessionId();
    let session_id = await getSessionId();

    this.log('SessionID: ', session_id);

    let authToken = await getToken(session_id);

    this.log('AuthToken:', authToken);
  }
}

GetAuthTommand.description = `Test fetching an authorization token
...
Extra documentation goes here
`;

GetAuthTommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' })
};

module.exports = GetAuthTommand;
