# Contributing

## Development

### Install

> Clone the project on your computer, and install [Node](https://nodejs.org).
> This project also uses
> [nvm](https://github.com/springload/frontend-starter-kit/blob/master/docs/useful-tooling.md#nvm).

### Working on the project

> Everything mentioned in the installation process should already be done.

```sh
# Make sure you use the right node version.
nvm install
# Start the the development tools in watch mode.
yarn start
# Runs linting.
yarn lint
# Runs tests.
yarn test
```

### Run the demo

> Everything mentioned in the installation process should already be done.

```sh
# Make sure you use the right node version.
nvm use
# Start the server and the development tools.
yarn start-demo
```

### Publish

```sh
npm version [TYPE]
git push origin master --tags
npm publish
```
