
'use strict';

const path        = require('path');
const packageJSON = require('./package.json');

module.exports = function (config, app) {

    this.name = 'gulp-plugin';
    this.title = 'app Gulp tasks plugin';
    this.version = packageJSON.version;

    const console = app.console;
    let gulp;

    if (!config.gulp) {
        const gulpFile = require(path.join(process.cwd(), 'gulpfile.js'));
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
            console.log('-----');
            done();
        });
    });

    function logEvents(g) {
        g.on('task_start', function(e) {
            console.notice(`Starting ${e.task}...`);
        });
        g.on('task_stop', function(e) {
            console.notice(`Finished ${e.task}`);
        });
        g.on('task_error', function(e) {
            console.error(`There was a problem with the Gulp '${task}' task.`);
        });
        g.on('task_not_found', function(err) {
            console.error(`Task ${err.task} not found`)
        });
    }

};
