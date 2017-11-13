# Gravity Boost

## Synopsis

Gravity Boost is a web deployable game built within the HTML5 canvas structure that's based loosely on the mechanism of planet formation. The objective is to successfully pilot a ship through the chaos as a group of asteroids (or protoplanets) feel the pull of each other's gravity and start clumping together. When they clump together and form a single cohesive structure, you can land and become the God of a brand new world :wink:

## Motivation

I thought it would be interesting to experiment with HTML5 canvas without any sort of framework or game engine involved (eg. phaser.io which I've used in the past). I never like experimenting with new technology without direction, so Gravity Boost as a game was born as an end goal.

## Getting Started

### Prerequisites

This project requires Node.js and the Node package manager (npm). Install them [here](https://nodejs.org/en/) if you don't have them on your system.

### Running in Development

The code in development requires a bundling process to transform it into browser ready production JavaScript, and this bundling is done here using Gulp, Browserify, and Babel for transpilation of ES6+ features.

Gulp, browserify, and all the other necessary dependencies can be installed with

```bash
npm i
```

To run the bundling in development mode, run

```bash
npm run dev
```

Now your bundling process will be watching the `src/` directory for changes

## Deployment

To package the frontend assets for production, run

```bash
npm run initialize
```

## Built With

* [Gulp](https://gulpjs.com/) - Task runner
* [Browserify](http://browserify.org/) - Frontend asset bundling
* [Babel](https://babeljs.io/) - Transpiling for cross browser ES6 compatibility

## Authors

**Ananth Rao** (@ananthamapod)

## License

**MIT**, for more information, see [LICENSE](LICENSE)
