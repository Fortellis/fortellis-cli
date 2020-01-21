# fortellis-cli

## Geting started

`git clone ssh://git@stash.cdk.com/cexchng/fortellis-cli.git`

`cd fortellis-cli`

`npm install`

In order for the "fortellis-cli" command to work on a machine where it is installed, you need to link the command with the follwoing command.

`npm link`

Command Line for Fortellis API Specs

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/fortellis-cli.svg)](https://npmjs.org/package/fortellis-cli)
[![Downloads/week](https://img.shields.io/npm/dw/fortellis-cli.svg)](https://npmjs.org/package/fortellis-cli)
[![License](https://img.shields.io/npm/l/fortellis-cli.svg)](https://github.com/deastland/fortellis-cli/blob/master/package.json)

<!-- toc -->
* [fortellis-cli](#fortellis-cli)
* [Usage](#usage)
* [Commands](#commands)
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
* [`fortellis-cli add`](#fortellis-cli-add)
* [`fortellis-cli api-lint FILE`](#fortellis-cli-api-lint-file)
* [`fortellis-cli api-template`](#fortellis-cli-api-template)
* [`fortellis-cli configure`](#fortellis-cli-configure)
* [`fortellis-cli getauth`](#fortellis-cli-getauth)
* [`fortellis-cli help [COMMAND]`](#fortellis-cli-help-command)
* [`fortellis-cli init`](#fortellis-cli-init)
* [`fortellis-cli status`](#fortellis-cli-status)

## `fortellis-cli add`

Add an item to the Fortellis repository.

```
USAGE
  $ fortellis-cli add

OPTIONS
  -a, --apispec=apispec              Add Spec file to the repostory
  -d, --documentation=documentation  Add Documentation file to the repository
  -p, --permission=permission        Add Permissions file to the repository

DESCRIPTION
  ...
  Add either an API Spec, API Docs, or Permissions file to the repository.

  The file name can be specified, or if '*' is entered as a file name the
  file which is in the proper diretory (specs/docs/permissions) will be added 
  to the repository.
```

_See code: [src/commands/add.js](https://github.com/deastland/fortellis-cli/blob/v0.0.0/src/commands/add.js)_

## `fortellis-cli api-lint FILE`

Lints OpenAPI 2.0 specifications for correctness and style.

```
USAGE
  $ fortellis-cli api-lint FILE

ARGUMENTS
  FILE  path of an Open API 2.0 specificaton file
```

_See code: [src/commands/api-lint.js](https://github.com/deastland/fortellis-cli/blob/v0.0.0/src/commands/api-lint.js)_

## `fortellis-cli api-template`

Put example template documents into an empty repository.

```
USAGE
  $ fortellis-cli api-template

DESCRIPTION
  ...
  This creates sample spec, documentaiton, and permissions documents that the user can then modify for API development.
```

_See code: [src/commands/api-template.js](https://github.com/deastland/fortellis-cli/blob/v0.0.0/src/commands/api-template.js)_

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
  config.yaml file, reflecting the data entered during configuration.
```

_See code: [src/commands/configure.js](https://github.com/deastland/fortellis-cli/blob/v0.0.0/src/commands/configure.js)_

## `fortellis-cli getauth`

Test fetching an authorization token

```
USAGE
  $ fortellis-cli getauth

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/getauth.js](https://github.com/deastland/fortellis-cli/blob/v0.0.0/src/commands/getauth.js)_

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

Create a Fortellis repository in the current directory.

```
USAGE
  $ fortellis-cli init

DESCRIPTION
  ...
  A fortellis repository is a directory containing a spec, docs, permissions, and .fortellis sub-directory. 
  In the .fortellis sub-directory will be a config.yaml file which will contain the configuration data
  for the repository.
```

_See code: [src/commands/init.js](https://github.com/deastland/fortellis-cli/blob/v0.0.0/src/commands/init.js)_

## `fortellis-cli status`

List the status of the fortellis repository.

```
USAGE
  $ fortellis-cli status

DESCRIPTION
  ...
  List all of the repository files and their status.
```

_See code: [src/commands/status.js](https://github.com/deastland/fortellis-cli/blob/v0.0.0/src/commands/status.js)_
<!-- commandsstop -->
