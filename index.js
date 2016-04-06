
'use strict';

const path        = require('path');
const packageJSON = require('./package.json');

module.exports = function (config, app) {

    this.name = 'gulp-plugin';
    this.title = 'Fractal Gulp tasks plugin';
    this.version = packageJSON.version;

    const console = app.console;
    let gulp;

    if (!config.gulp) {
        const gulpFile = require(path.join(process.cwd, 'gulpfile.js'));
        gulp = require('gulp');
    } else {
        gulp = config.gulp;
    }

    logEvents(gulp);
    
    this.command('gulp [task]', {
        description: 'Run the specified Gulp task.'
    }, (args, done) => {
        const task = args.task || 'default';
        console.log('-----');
        gulp.start(task, err => {
            this.console.log('-----');
            done();
        });
    });

    function logEvents(g) {
        g.on('task_start', function(e) {
            fractal.console.notice(`Starting ${e.task}...`);
        });
        g.on('task_stop', function(e) {
            fractal.console.notice(`Finished ${e.task}`);
        });
        g.on('task_error', function(e) {
            fractal.console.error(`There was a problem with the Gulp '${task}' task.`);
        });
        g.on('task_not_found', function(err) {
            fractal.console.error(`Task ${err.task} not found`)
        });
    }

};
