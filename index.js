
'use strict';

const path        = require('path');
const ptime       = require('pretty-hrtime');
const chalk       = require('chalk');
const packageJSON = require('./package.json');

module.exports = function (config, app) {

    this.name = 'gulp-plugin';
    this.title = 'Fractal Gulp tasks plugin';
    this.version = packageJSON.version;

    if (!config.gulp) {
        throw new Error('You must pass a Gulp instance as part of the configuration');
    }

    const console = app.console;
    const gulp = config.gulp;
    const opts = {
        description: 'Run the specified Gulp task.'
    };

    gulp.on('task_start',     e => console.notice(`Starting ${chalk.cyan(e.task)} task`));
    gulp.on('task_stop',      e => console.notice(`Finished ${chalk.cyan(e.task)} in ${chalk.magenta(ptime(e.hrDuration))}`));
    gulp.on('task_err',       e => console.error(`Task '${chalk.bold(e.task)}' errored after ${ptime(e.hrDuration)}.`));
    gulp.on('task_not_found', e => console.error(`Task ${chalk.bold(e.task)} not found`));

    this.command('gulp [task]', opts, (args, done) => {
        const task = args.task || 'default';
        console.log('-----');
        gulp.start(task, e => {
            if (e) {
                console.error(`→ ${formatError(e)}`);
            }
            console.log('-----');
            done();
        });
    });

    function formatError(e) {
        if (!e.err) {
            return e.message;
        }
        if (typeof e.err.showStack === 'boolean') {
            return e.err.toString();
        }
        if (e.err.stack) {
            return e.err.stack;
        }
        return new Error(String(e.err)).stack;
    }

};
