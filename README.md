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
* [fortellis-cli](#fortellis-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @fortellis/fortellis-cli
$ fortellis-cli COMMAND
running command...
$ fortellis-cli (-v|--version|version)
@fortellis/fortellis-cli/0.0.1-alpha.7 darwin-x64 node-v12.13.0
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
  - [`fortellis-cli add FILE`](#fortellis-cli-add-file)
  - [`fortellis-cli api-lint FILE`](#fortellis-cli-api-lint-file)
  - [`fortellis-cli api-template`](#fortellis-cli-api-template)
  - [`fortellis-cli configure`](#fortellis-cli-configure)
  - [`fortellis-cli help [COMMAND]`](#fortellis-cli-help-command)
  - [`fortellis-cli init`](#fortellis-cli-init)
  - [`fortellis-cli push`](#fortellis-cli-push)
  - [`fortellis-cli status`](#fortellis-cli-status)
  - [`fortellis-cli version`](#fortellis-cli-version)

## `fortellis-cli add FILE`

Add an item to the Fortellis repository.

```
USAGE
  $ fortellis-cli add FILE

ARGUMENTS
  FILE  Path of file to be pushed.

OPTIONS
  -s, --apispec  Add API Spec file to the repostory

DESCRIPTION
  ...
  Add a file to the repository.
  Currently supported file types:
    - API spec files (-s)
```

_See code: [src/commands/add.js](https://github.com/Fortellis/fortellis-cli/blob/v0.0.1-alpha.7/src/commands/add.js)_

## `fortellis-cli api-lint FILE`

Lints OpenAPI 2.0 specifications for correctness and style.

```
USAGE
  $ fortellis-cli api-lint FILE

ARGUMENTS
  FILE  Path of an Open API 2.0 specificaton file

OPTIONS
  --display-severity=error|warn|info|hint  [default: warn] Show only output greater than the specified severity level

  --safe                                   Check that the API spec has been added to the Fortellis repository before
                                           linting
```

_See code: [src/commands/api-lint.js](https://github.com/Fortellis/fortellis-cli/blob/v0.0.1-alpha.7/src/commands/api-lint.js)_

## `fortellis-cli api-template`

Writes a template Open API 2.0 document to the current directory.

```
USAGE
  $ fortellis-cli api-template

DESCRIPTION
  ...
  Writes a template Open API 2.0 document to the current directory that the user can then modify for API development.
```

_See code: [src/commands/api-template.js](https://github.com/Fortellis/fortellis-cli/blob/v0.0.1-alpha.7/src/commands/api-template.js)_

## `fortellis-cli configure`

Configure Fortellis CLI.

```
USAGE
  $ fortellis-cli configure

OPTIONS
  -p, --password=password  Fortellis password
  -u, --username=username  Fortellis username

DESCRIPTION
  ...
  Set up the credentials and other global settings for 
  the Fortellis CLI in this environment. This will allow it to 
  communicate with Fortellis Platform.
```

_See code: [src/commands/configure.js](https://github.com/Fortellis/fortellis-cli/blob/v0.0.1-alpha.7/src/commands/configure.js)_

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

OPTIONS
  -f, --force            Initialize directory even if it is already a repository.
  -i, --orgid=orgid      Organizatino ID
  -n, --orgname=orgname  Organization name

DESCRIPTION
  ...
  A fortellis repository is a directory containing API Specs and a config directory
  (/.fortellis) that holds the repo configuration file.
```

_See code: [src/commands/init.js](https://github.com/Fortellis/fortellis-cli/blob/v0.0.1-alpha.7/src/commands/init.js)_

## `fortellis-cli push`

Push specified file to fortellis.

```
USAGE
  $ fortellis-cli push

OPTIONS
  -f, --file=file
  -p, --password=password  Fortellis password
  -s, --apispec            Push API Spec file to Fortellis
  -u, --username=username  Fortellis username

DESCRIPTION
  ...
  Publish the file (spec, documentation, etc.) to Fortellis: either 
  an update of an existing file in DRAFT status, or a new version 
  in FINAL status.

  Pass in a username/password to explicitly publish with a given user. Otherwise
  the username/password configured in the enviromment (see fortellis-cli configure)
  will be used.

  A flag must be used to specify the kind of file to be pushed.
    -s --apispec
```

_See code: [src/commands/push.js](https://github.com/Fortellis/fortellis-cli/blob/v0.0.1-alpha.7/src/commands/push.js)_

## `fortellis-cli status`

Output the status of the fortellis repository.

```
USAGE
  $ fortellis-cli status

DESCRIPTION
  ...
  List all of the repository files and their status.
```

_See code: [src/commands/status.js](https://github.com/Fortellis/fortellis-cli/blob/v0.0.1-alpha.7/src/commands/status.js)_

## `fortellis-cli version`

Outputs the version of the fortellis cli.

```
USAGE
  $ fortellis-cli version

DESCRIPTION
  ...
  Outputs the version of the fortellis cli.
```

_See code: [src/commands/version.js](https://github.com/Fortellis/fortellis-cli/blob/v0.0.1-alpha.7/src/commands/version.js)_
<!-- commandsstop -->
