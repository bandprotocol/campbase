# Campbase App

[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

~~See me at https://campbase.app~~ 

## Stack

This React Native app is built on the following tech

- [Create React Native App](https://github.com/react-community/create-react-native-app)
- [React Navigation](https://reactnavigation.org)
- [React-Redux](https://github.com/reduxjs/react-redux)
- [Styled Components](https://www.styled-components.com/docs/basics#react-native)

We're using TypeScript. [This guide](https://github.com/piotrwitek/react-redux-typescript-guide) provides comprehensive walkthrough and examples of how to use TypeScript with React & Redux. For the style guide, we're following [AirBnB's React/JSX Style guide](https://github.com/airbnb/javascript/tree/master/react#basic-rules) and use [Prettier](https://github.com/prettier/prettier) for auto-formatting.

## Installation

Make sure you have `Node.js v9.0+` and `yarn` installed, then run:

```sh
$> cd app
$> yarn install
```

We recommend [VSCode](https://code.visualstudio.com/) for smooth development experience. Devtools and guide will be added assuming you're using VSCode.

### VSCode Plugins

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- [Sort Typescript Imports](https://marketplace.visualstudio.com/items?itemName=miclo.sort-typescript-imports)

## Development

Create React Native App uses [Expo](https://expo.io/) as a base, so get that on your phone. Start a dev server by running:

```sh
$> cd app
$> yarn start
```

Once you get it running, go to Expo app on your phone and scan the QR code.

You can install `npm install -g react-devtools` to get inspection tool as well.

## Build & Deploy

Make sure you have `exp` installed (via `npm i -g exp`). Login as `innocationteam@gmail.com` and run:

```sh
$> cd app
$> exp publish
```
## Contribution

Main contributors would be Band Protocol Core development team for now. However, please feel free to fork and send in a pull-request at any time.

## Known Issues

- Docker is known to mess up with the network configuration of expo. See [this Github issue](https://github.com/react-community/create-react-native-app/issues/270).

## LICENSE

[Apache 2.0](LICENSE.md)