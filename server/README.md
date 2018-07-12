# Campbase Server

API server that powers CAMPBASE mobile apps and Community Manager web portal. It works in unison with [Band Protocol Blockchain](https://github.com/bandprotocol/bandprotocol).

## Stack

This Node.js server app is built on the following tech

- TypeScript
- Koa & Koa-Router
- Knex
- MySQL

This project uses [Knex](https://knexjs.org/) to help manage database executions and migrations. It also conveniently functions as an ORM.

We're following [AirBnB's React/JSX Style guide](https://github.com/airbnb/javascript/tree/master/react#basic-rules)

We also use [Prettier](https://github.com/prettier/prettier) to automagically format our code.

## Installation

_NOTE: Please consider adding Docker that manage the installation process for dev environment as you see fit_

First, install [MySQL](https://www.mysql.com/downloads/). Make sure the **root** user has no password set. Then get into mysql console with `mysql -u root -p` and create devlopment and test databases with the commands below:

```
CREATE DATABASE campbase_api_dev;
CREATE DATABASE campbase_api_test;
```

Then clone this repo, make sure you have [Node.js v8+](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/lang/en/docs/install/) install, and under `<PROJECT>/server` runs:

```
yarn install
```

Optionally, you'd probably want to install Knex CLI tool by running

```
npm i -g knex
```

We recommend [VSCode](https://code.visualstudio.com/) for smooth development experience. Devtools and guide will be added assuming you're using VSCode.

### VSCode Plugins

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Development

```
yarn start
```

## Database Migration

Knex provides great utilities for us:

```
knex migrate:latest --env development
knex seed:run --env development

or

yarn migrate-dev
yarn seed-dev
```

To create a new migration:

```
knex migrate:make <MIGRATION_NAME>
```

## Testing

In this backend repo, we're testing extensively to make sure things work the way they should. Most of the tests right now would be **integration tests** that make sure endpoints works correctly with the seed database.

You can start the tests by running:

```
yarn test
```

The test generates coverage summary in HTML format, which can be found in `<PROJECT_DIR>/coverage/index.html`. You can explore what's been included in the tests, and what's not.
