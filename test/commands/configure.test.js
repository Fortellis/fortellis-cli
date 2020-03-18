const configureCommand = require('../../src/commands/configure');
jest.mock('../../src/services/authorization.service', () => {
  let mockObj = {};
  function getMock(name) {
    if (!mockObj[name]) {
      mockObj[name] = jest.fn();
    }
    return mockObj[name];
  }
  return jest.fn().mockImplementation(() => {
    return {
      getAuthToken: getMock('getAuthToken')
    };
  });
});
const AuthorizationService = require('../../src/services/authorization.service');

describe.only('configure', () => {
  describe.only('- Configure repo...', () => {
    let stdout;
    afterEach(() => {
      jest.restoreAllMocks();
    });

    beforeEach(() => {
      stdout = [];
      jest
        .spyOn(process.stdout, 'write')
        .mockImplementation(val => stdout.push(val));
    });

    it.only('runs config -u=username -p=password', async () => {
      const authService = new AuthorizationService();
      authService.getAuthToken.mockResolvedValue({
        uid: 'test123',
        token: 'token123'
      });
      await configureCommand.run(['-u=username', '-p=password']);
      expect(stdout[0]).toMatch(
        'Configuration completed. See [$home/.fortellis/config.yaml] file for stored values.\n'
      );
    });
  });
});
