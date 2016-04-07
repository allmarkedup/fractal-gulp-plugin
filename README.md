# Gulp tasks plugin for Fractal.

A helper command to run your Gulp tasks from within Fractal's interactive CLI.

## Installation

Install via NPM:

```shell
npm i @allmarkedup/fractal-gulp-plugin --save
```

In your `gulpfile.js`, export the gulp instance that you have added your tasks to. For example:

```js
const gulp = require('gulp');

// ...

module.exports = gulp; // Export the gulp instance
```

Then configure the plugin in your `fractal.js` file:

```js
const fractal = require('@frctl/fractal');

fractal.plugin('@allmarkedup/fractal-gulp-plugin', {
    gulp: require('./gulpfile')
});
```

## Usage

This plugin exposes a single `gulp` command when you are using the [Fractal interactive CLI](https://github.com/frctl/fractal/blob/master/docs/commands.md#the-fractal-interactive-cli-sparkles).

Any gulp task in your `gulpfile.js` can be run using the familiar `gulp [task]` format, without having to leave the Fractal CLI. For example:

```
gulp
gulp css
gulp js:build
```
