# Gulp tasks plugin for Fractal.

A helper command to run your Gulp tasks from within Fractal's interactive CLI.

## Installation

Install via NPM:

```shell
npm i @allmarkedup/fractal-gulp-plugin --save
```

In your `gulpfile.js`, export the gulp instance that you have added your tasks to. For example:

```js
// gulpfile.js
'use strict';

const gulp = require('gulp');
const del  = require('del');

gulp.task('clean', function() {
    return del(['./public','./another/directory']);
});

module.exports = gulp; // Export the gulp instance
```

Then configure the plugin in your `fractal.js` file:

```js
// fractal.js
'use strict';

const fractal = require('@frctl/fractal');

fractal.plugin('@allmarkedup/fractal-gulp-plugin', {
    gulp: require('./gulpfile')
});
```

## Usage

This plugin exposes a single `gulp` command when you are using the [Fractal interactive CLI](https://github.com/frctl/fractal/blob/master/docs/commands.md#the-fractal-interactive-cli-sparkles).

Any gulp task in your `gulpfile.js` can then be run using the familiar `gulp [task]` format, without having to leave the Fractal CLI.
