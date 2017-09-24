/**
 * Main file for unit test
 */

const TestLauncher = require('js-zrim-test-bootstrap').TestLauncher,
  TestLauncherConfigBuilder = require('js-zrim-test-bootstrap').TestLauncherConfigBuilder,
  util = require('util');

const testLauncher = new TestLauncher(),
  configBuilder = new TestLauncherConfigBuilder();

configBuilder
  .projectConfiguration()
  .rootDirectoryPath(__dirname + '/../..')
  .parentBuilder()
  .testConfiguration()
  .unitTest();

testLauncher.configure(configBuilder.build())
  .then(() => testLauncher.run())
  .catch(error => {
    process.stderr.write(util.format("Something goes wrong: %s\n%s", error.message, error.stack));
  });
