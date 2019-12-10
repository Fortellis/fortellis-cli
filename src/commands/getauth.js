const { Command, flags } = require("@oclif/command");
// const https = require("https");
const axios = require("axios");

const userId = "00u4ssqo8mToRxhxK2p7";
const entityId = "";

async function getSessionId() {
  try {
    // set the url
    const url = "https://api.accounts-dev.fortellis.io/api/v1/authn?token=true";

    // request data object
    const data = {
      username: "daniel.eastland@cdk.com",
      password: "Development123!"
    };

    // set the headers
    const config = {
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "application/json",
        Host: "api.accounts-dev.fortellis.io",
        Accept: "application/json"
      }
    };

    const res = await axios.post(url, data, config);
    console.log(res.data);
    return res.data.payload.sid;
  } catch (err) {
    console.error(err);
  }
}

async function getToken(sessionId) {
  try {
    const url =
      "https://api.accounts-dev.fortellis.io/oauth2/aus1uel0vyWbHyGne2p7/v2/authorize";

    const config = {
      url: url,
      method: "get",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Cookie: `entityId=123; userId=${userId}; sidServer=api.accounts.fortellis.io; sid=${sessionId}`
      },
      params: {
        client_id: "0oa4qokpibPph9mnb2p7",
        nonce: "nonce",
        prompt: "none",
        redirect_uri: "https%3A%2F%2Fdeveloper-dev.fortellis.io%2F",
        response_mode: "fragment",
        response_type: "token",
        scope: "openid%20email%20profile",
        state: "state"
      }
    };

    console.log("PARAMS: ", config.params);

    const res = await axios(config);
    // const res = await axios.get(url, { params: parameters }, config);
    console.log("ReturnCode: ", res.status);
    console.log("HEADERS: ", res.headers);
  } catch (err) {
    console.error(err);
  }
}

class GetAuthTommand extends Command {
  async run() {
    const { flags } = this.parse(GetAuthTommand);

    const fullUrl = "https://api.accounts.fortellis.io/api/v1/authn?token=true";

    // let session_id = await this.getOktaSessionId();
    let session_id = await getSessionId();

    this.log("SessionID: ", session_id);

    await getToken(session_id);
  }
}

GetAuthTommand.description = `Describe the command here
...
Extra documentation goes here
`;

GetAuthTommand.flags = {
  name: flags.string({ char: "n", description: "name to print" })
};

module.exports = GetAuthTommand;
