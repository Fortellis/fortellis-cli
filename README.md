# fortellis-cli

Command Line for Fortellis API Specs

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/fortellis-cli.svg)](https://npmjs.org/package/fortellis-cli)
[![Downloads/week](https://img.shields.io/npm/dw/fortellis-cli.svg)](https://npmjs.org/package/fortellis-cli)
[![License](https://img.shields.io/npm/l/fortellis-cli.svg)](https://github.com/deastland/fortellis-cli/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g fortellis-cli
$ fortellis-cli COMMAND
running command...
$ fortellis-cli (-v|--version|version)
fortellis-cli/0.0.0 darwin-x64 node-v10.17.0
$ fortellis-cli --help [COMMAND]
USAGE
  $ fortellis-cli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`fortellis-cli help [COMMAND]`](#fortellis-cli-help-command)
- [`fortellis-cli init`](#fortellis-cli-init-command)
- [`fortellis-cli configure`](#fortellis-cli-configure-command)
- [`fortellis-cli template`](#fortellis-cli-template-command)
- [`fortellis-cli status`](#fortellis-cli-status-command)
- [`fortellis-cli add`](#fortellis-cli-add-command)

## `fortellis-cli init`

This creates a Fortellis repository in the current directory.

```
USAGE
  $ fortellis-cli init

OPTIONS

DESCRIPTION
  ...
  A fortellis repository is a directory containing a ./.fortellis sub-directory. In this
  sub-directory will be a config.yaml file which will eventually contain the configuration data
  for the repository.
```

_See code: [src/commands/init.js](https://github.com/deastland/fortellis-cli/blob/v0.0.0/src/commands/init.js)_

## `fortellis-cli configure`

Configure the Fortellis repository.

...
USAGE
\$ fortellis-cli configure

OPTIONS
--username=<username> Fortellis username
--password=<password> Fortellis password

DESCRIPTION
...
Set up the repository so it can communicate with Fortellis. This command will edit the
config.yaml file, reflecting the data entered during configuration.
...

_See code: [src/commands/configure.js](https://github.com/deastland/fortellis-cli/blob/v0.0.0/src/commands/configure.js)_

## `fortellis-cli help [COMMAND]`

display help for fortellis-cli

```
USAGE
  $ fortellis-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.2/src/commands/help.ts)_

<!-- commandsstop -->
