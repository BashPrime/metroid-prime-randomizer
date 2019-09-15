# Metroid Prime Randomizer

This application is an item randomizer for the video game Metroid Prime, powered by [Angular](https://angular.io), [TypeScript](https://www.typescriptlang.org), [Node.js](https://nodejs.org) and [Electron](https://electronjs.org).

[Visit website](https://randomizer.metroidprime.run)

## How it works

This program takes a disc image of Metroid Prime and shuffles the locations of all 100 items in the game world, allowing for a new and highly replayable gaming experience. Items are placed using a logic system to ensure that every seed is possible to complete, and additional checks can be enabled to minimize the risk of softlocking.

The randomizer is currently option-based, allowing the user to enable or disable restrictions and sequence breaking tricks as they wish.

## Install

This section is to build the randomizer application from source. If you just want to use the randomizer and start playing randomized seeds, you can download it from the [Releases page](https://github.com/etaylor8086/metroid-prime-randomizer/releases).

To build from source, you will need to install the 64-bit version of [Node.js](https://nodejs.org) to install the application and its dependencies using `npm`. 32-bit builds of the randomizer are not supported currently.

You will need to [install Rust](https://www.rust-lang.org/install.html). I recommend installing it via [Rustup](https://rustup.rs/).

Install `node-gyp` globally on your system. [Follow the instructions](https://github.com/nodejs/node-gyp#installation) to install it on your given operating system.

The RandomPrime patcher requires the `powerpc-unknown-linux-gnu` target installed to build correctly. Run the following two `rustup` commands to install them.

```
rustup toolchain install nightly
rustup target add --toolchain nightly powerpc-unknown-linux-gnu
```


Once the above prerequisites are installed, run `npm install` to install the project dependencies and build the `randomprime` native Node module.

## Build for Development

To run a development version of the application that auto-builds and auto-reloads as you make changes, run `npm start`. (Hot reloading does not work for the base Electron code at this time)

## Build for Production

To build the project for production, run one of the following commands depending on your operating system:

* Windows: `npm run electron:windows`
* macOS: `npm run electron:mac`
* Linux: `npm run electron:linux`

The randomizer application will be packaged in the `release` directory.

## Special Thanks
* Syncathetic, for providing significant contributions to this project and for creating the [randomprime patcher](https://github.com/aprilwade/randomprime) that this project uses.
* Pwootage, for providing significant contributions to this project.
* The [URDE](https://gitlab.axiodl.com/AxioDL/urde) development team.
* LLCoolDave for creating the item filling algorithm used in a variety of randomizers (including this one).
* Interslice, for help with the Hard mode logic as well as creating the Metroid Prime Seed Generator (for Claris's randomizer).
* Claris, for creating the first Metroid Prime/Metroid Prime 2 randomizer.
* Rekameohs, for creating the Metroid Prime Randomizer Script.
* The Metroid Prime speedrunning and randomizer communities for thir inspiration, support, and testing.
* The Zelda: A Link to the Past, and Ocarina of Time randomizer communities for their support and design inspiration.
