# fortellis-cli

## Getting started

`git clone https://github.com/Fortellis/fortellis-cli.git`

`cd fortellis-cli`

`npm install`

In order for the "fortellis-cli" command to work on a machine where it is installed, you need to link the command with the following command.

`npm link`

Command Line for Fortellis API Specs

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/fortellis-cli.svg)](https://npmjs.org/package/@fortellis/fortellis-cli)
[![Downloads/week](https://img.shields.io/npm/dw/fortellis-cli.svg)](https://npmjs.org/package/@fortellis/fortellis-cli)
[![License](https://img.shields.io/npm/l/fortellis-cli.svg)](https://github.com/Fortellis/fortellis-cli/blob/master/package.json)

<!-- toc -->

- [fortellis-cli](#fortellis-cli)
  - [Getting started](#getting-started)
- [Usage](#usage)
- [Commands](#commands)
  - [`fortellis-cli push`](#fortellis-cli-push)
  - [`fortellis-cli add`](#fortellis-cli-add)
  - [`fortellis-cli api-lint FILE`](#fortellis-cli-api-lint-file)
  - [`fortellis-cli api-template`](#fortellis-cli-api-template)
  - [`fortellis-cli configure`](#fortellis-cli-configure)
  - [`fortellis-cli help [COMMAND]`](#fortellis-cli-help-command)
  - [`fortellis-cli init`](#fortellis-cli-init)
  - [`fortellis-cli status`](#fortellis-cli-status)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g fortellis-cli
$ fortellis-cli COMMAND
running command...
$ fortellis-cli (-v|--version|version)
fortellis-cli/0.0.0 darwin-x64 node-v12.13.0
$ fortellis-cli --help [COMMAND]
USAGE
  $ fortellis-cli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [fortellis-cli](#fortellis-cli)
  - [Getting started](#getting-started)
- [Usage](#usage)
- [Commands](#commands)
  - [`fortellis-cli push`](#fortellis-cli-push)
  - [`fortellis-cli add`](#fortellis-cli-add)
  - [`fortellis-cli api-lint FILE`](#fortellis-cli-api-lint-file)
  - [`fortellis-cli api-template`](#fortellis-cli-api-template)
  - [`fortellis-cli configure`](#fortellis-cli-configure)
  - [`fortellis-cli help [COMMAND]`](#fortellis-cli-help-command)
  - [`fortellis-cli init`](#fortellis-cli-init)
  - [`fortellis-cli status`](#fortellis-cli-status)

## `fortellis-cli push`

Push an item to Fortellis platform
...
USAGE
\$ fortellis-cli push

OPTIONS
-u, --username Fortellis username
-p, --password Fortellis password
-s, --apispec Specify file type as API Spec
-f, --file Path to file to be pushed.

DESCRIPTION
...
Publish a file to Fortellis: either an update of an
existing file in DRAFT status, or a new file.

Pass in a username/password to explicitly publish with a given
Fortellis user. Otherwise the credentials configured in the global
settings will be used to communicate with Fortellis.
...

_See code: [src/commands/push.js](https://github.com/Fortellis/fortellis-cli/blob/master/src/commands/push.js)_

## `fortellis-cli add`

Add an item to the Fortellis repository.

```
USAGE
  $ fortellis-cli add FILE

OPTIONS
  -a, --apispec=apispec              Add Spec file to the repository
  -d, --documentation=documentation  Add Documentation file to the repository
  -p, --permission=permission        Add Permissions file to the repository

DESCRIPTION
  ...
  Add an API Spec file to the local repository.

  Once in the repository, the file will be eligible to be pushed to Fortellis.
```

_See code: [src/commands/add.js](https://github.com/Fortellis/fortellis-cli/blob/master/src/commands/add.js)_

## `fortellis-cli api-lint FILE`

Lints OpenAPI 2.0 specifications for correctness and style.

```
USAGE
  $ fortellis-cli api-lint FILE

ARGUMENTS
  FILE  path of an Open API 2.0 specification file
```

_See code: [src/commands/api-lint.js](https://github.com/Fortellis/fortellis-cli/blob/master/src/commands/api-lint.js)_

## `fortellis-cli api-template`

Put example template documents into an empty repository.

```
USAGE
  $ fortellis-cli api-template

DESCRIPTION
  ...
  This creates a sample API Spec that the user can have as a template for further development.
```

_See code: [src/commands/api-template.js](https://github.com/Fortellis/fortellis-cli/blob/master/src/commands/api-template.js)_

## `fortellis-cli configure`

Configure the Fortellis repository.

```
USAGE
  $ fortellis-cli configure

OPTIONS
  -p, --password=password  Fortellis password
  -u, --username=username  Fortellis username

DESCRIPTION
  ...
  Set up the repository so it can communicate with Fortellis. This command will edit the
  global config.yaml file, reflecting the permissions granted by the provided credentials.
```

_See code: [src/commands/configure.js](https://github.com/Fortellis/fortellis-cli/blob/master/src/commands/configure.js)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `fortellis-cli init`

Initialize (create) a Fortellis repository in the current directory.

```
USAGE
  $ fortellis-cli init

DESCRIPTION
  ...
  This command will set up a Fortellis repository and associated it with one of the
  organizations linked to the credentials used in the global config.

  A Fortellis repository is a directory containing API Specs and the .fortellis/ sub-directory.
  In the .fortellis sub-directory will be a config.yaml file which will contain the configuration data
  for the repository.
```

_See code: [src/commands/init.js](https://github.com/Fortellis/fortellis-cli/blob/master/src/commands/init.js)_

## `fortellis-cli status`

List the status of the Fortellis repository.

```
USAGE
  $ fortellis-cli status

DESCRIPTION
  ...
  List the repository organization name, organization ID, and all API Spec files registered in the directory.
```

_See code: [src/commands/status.js](https://github.com/Fortellis/fortellis-cli/blob/master/src/commands/status.js)_

<!-- commandsstop -->