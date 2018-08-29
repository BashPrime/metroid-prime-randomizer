# Metroid Prime Item Randomizer

This application is an item randomizer for the video game Metroid Prime, powered by [Angular](https://angular.io), [TypeScript](https://www.typescriptlang.org), [Node.js](https://nodejs.org) and [Electron](https://electronjs.org).

[Visit website](https://randomizer.metroidprime.run)

## Install

To build from source, you will need to install [Node.js](https://nodejs.org) to install the application and its dependencies using `npm`.

First, install `node-gyp` globally on your system. [Follow the instructions](https://github.com/nodejs/node-gyp#installation) to install on your given operating system.

Run `npm install` to install the project dependencies.

**Note**: The randomprime native module (used for patching the randomized Metroid Prime .iso) will be built during the installation process.

## Build for Development

To run a development version of the application that auto-builds and auto-reloads as you make changes, run `npm start`. (Hot reloading does not work for the base Electron code at this time)

## Build for Production

To build the project for production, run one of the following commands depending on your operating system:

* Windows: `npm run electron:windows`
* macOS: `npm run electron:mac`
* Linux: `npm run electron:linux`

The randomizer application will be packaged in the `app-builds` directory.

## Special Thanks
* Pwootage, for providing significant contributions to this project
* AprilWade, for providing significant contributions to this project and for creating the [randomprime patcher](https://github.com/aprilwade/randomprime)
* LLCoolDave for creating the item filling algorithm used in this project
* Interslice, for help with the Hard mode logic as well as creating the Metroid Prime Seed Generator (for Claris's randomizer)
* Claris, for creating the first Metroid Prime/Metroid Prime 2 randomizer
* Rekameohs, for creating the Metroid Prime Randomizer Script
* The Metroid Prime speedrunning and randomizer communities for inspiration, support, and testing
* The Zelda: A Link to the Past, and Ocarina of Time randomizer communities for inspiration
