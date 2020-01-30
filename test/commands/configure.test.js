const { expect, test } = require('@oclif/test');
const AuthorizationService = require('../../src/services/authorization.service');

describe('configure', () => {
  describe('- Configure repo...', () => {
    const mockAuth = {
      uid: 'test123',
      token: 'token123'
    };
    test
      .stdout()
      .stub(AuthorizationService.prototype, 'getAuthToken', () => mockAuth)
      .command(['configure', '-u=username', '-p=password'])
      .it('runs config -u=username -p=password', ctx => {
        expect(ctx.stdout).to.contain('Configuration completed. See [$home/.fortellis/config.yaml] file for stored values.\n');
      });
  });
});
