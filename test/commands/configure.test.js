/* eslint-disable no-undef */
/* eslint-disable no-console */
const { expect, test } = require('@oclif/test');

describe('configure', () => {
  describe('- Configure repo...', () => {
    test
      .stdout()
      .command(['configure', '-u=username', '-p=password'])
      .it('runs config -u=username -p=password', ctx => {
        expect(ctx.stdout).to.be.empty;
      });
  });
});
