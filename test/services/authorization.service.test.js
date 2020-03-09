jest.mock('axios');
const axios = require('axios');
const AuthorizationService = require('../../src/services/authorization.service');

jest.mock('axios');

const sessionResponseGood = {
  status: 200,
  data: {
    payload: {
      _embedded: { user: { id: 'test.user@test.com' } },
      sessionToken: 'TOKEN'
    }
  }
};

const sessionResponseBadPassword = {
  status: 401,
  payload: {
    userStatus: 'ACTIVE'
  }
};

const sessionResponseBadUsername = {
  status: 404,
  message: 'Not found: Resource not found: test.user@test.com (User)'
};

const locationResponseGood = {
  status: 302,
  headers: {
    location:
      'https://developer-dev.fortellis.io/#access_token=abcdef123456&token_type=Bearer&expires_in=3600&scope=email+profile+openid&state=state'
  }
};

const tokenResponseGood = {
  token: 'abcdef123456',
  uid: 'test.user@test.com'
};

const authService = new AuthorizationService();

describe('authorizationService', () => {
  test('username and password correct', async () => {
    axios.post.mockImplementation(() => Promise.resolve(sessionResponseGood));

    axios.get.mockImplementation(() => Promise.resolve(locationResponseGood));

    // const authService = new AuthorizationService();
    expect(
      await authService.getAuthToken('test.user@test.com', 'testPassword')
    ).toStrictEqual(tokenResponseGood);

    // exit
  });

  test('username incorrect', async () => {
    axios.post.mockImplementation(() =>
      Promise.reject({
        response: sessionResponseBadUsername
      })
    );

    expect.assertions(1);
    return authService
      .getAuthToken('xx', 'testPassword')
      .catch(error => expect(error).toMatch('Username/password incorrect'));
  });

  test('password incorrect', async () => {
    axios.post.mockImplementation(() =>
      Promise.reject({
        response: sessionResponseBadPassword
      })
    );

    expect.assertions(1);
    return authService
      .getAuthToken('test.user@test.com', 'xx')
      .catch(error => expect(error).toMatch('Username/password incorrect'));
  });
});
