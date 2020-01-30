const { expect, test } = require('@oclif/test');
const sinon = require('sinon');
const AuthorizationService = require('../../src/services/authorization.service');

describe('configure', () => {
  describe('- Configure repo...', () => {
    sinon.stub(AuthorizationService.prototype, 'getAuthToken').returns(
      {
        uid: 'test123',  
        token: 'token123'
      }
    );
    test
      .stdout()
      .command(['configure', '-u=username', '-p=password'])
      .it('runs config -u=username -p=password', ctx => {
        expect(ctx.stdout).to.contain('Configuration completed. See [$home/.fortellis/config.yaml] file for stored values.\n');
      });
  });
});
