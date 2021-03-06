var path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    es = require('event-stream'),
    _ = require('underscore'),
    template = require('gulp-template'),
    argv = require('yargs').argv,
    semver = require('semver');
var runSequence = require('run-sequence');
var Dgeni = require('dgeni');
var exec = require('child_process').exec;
var insert = require('gulp-insert-lines');
var rename = require("gulp-rename");

var paths = {
    js: [
        './src/components/**/*.js',
        './src/lib/controller/*.js',
        './src/lib/service/*.js',
        './src/lib/utils/*.js'
    ],
    templates: [
        './src/components/**/*.html',
        './config/**/*.html'
    ],
    docStyles: ['./config/styles/**/*.scss']
};

var arg = {
    version: function () {
        var version = argv.version;
        if (_.isUndefined(version)) {
            console.error("Error: Version is not given. 'gulp setup-meteor-doc-project --version=<version>'");
            process.exit(1);
        } else if (!semver.valid(version)) {
            // Check if version is valid.
            console.error("Error: Invalid semver format for --version argument.");
            process.exit(1);
        }

        return version;
    }
};

gulp.task('dgeni-clean', function(cb) {
    exec('rm -rf doc/client/partials', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('dgeni', ['dgeni-clean'], function(done) {
    var dgeni = new Dgeni([ require('./config/dgeni-meteoric')({
        include: paths.js,
        exclude: [
            './src/lib/service/modal.js',
            './src/lib/service/popover.js',
            './src/lib/service/popup.js',
            './src/lib/service/actionSheet.js',
            './src/lib/service/backdrop.js',
            './src/lib/service/loading.js'
        ],
        dest: './doc/client',
        version: arg.version()  // todo: not used atm, but I'm sure will be used in the future.
    })]);

    dgeni.generate().then(function() { done(); });
});

gulp.task('doc-styles', function() {
    return gulp.src('config/templates/meteor/styles/main.scss')
        .pipe(gulp.dest('doc/client/styles'));
});

gulp.task('create-meteor-doc-project', function(cb) {
    exec('meteor create meteoric-doc', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        console.log('Renaming meteoric-doc to doc ...');
        exec('rm -rf doc', function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);

            exec('mv meteoric-doc doc', function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                console.log('done.');
                cb(err);
            });
        });
    });
});

gulp.task('setup-meteor-doc-project-packages', function() {
    gulp.src('config/templates/meteor/packages.template')
        .pipe(rename('packages'))
        .pipe(gulp.dest('doc/.meteor'));
});

gulp.task('_setup-meteor-doc-project-templates', function() {
    return gulp.src([
        'config/templates/meteor/client/**/*',
        '!./config/templates/meteor/client/**/*.template.*'
    ]).pipe(gulp.dest('doc/client'));
});

gulp.task('setup-meteor-doc-project-templates', function(cb) {
    return runSequence('_setup-meteor-doc-project-templates', 'dgeni', cb);
});

gulp.task('clean-up-meteor-doc-project', function(cb) {
    exec([  'rm',
            '-rf',
            'doc/server',
            'doc/client',
            'doc/lib' +
            'doc/.meteor/packages' +
            'doc/public' ].join(' '),
        function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
});


gulp.task('create-router-meteor-doc-project', function() {
    var docPath = 'doc/client/partials/api/meteoric';
    var modules = [];

    return new Promise(function(resolve) {
        gulp.src([
            docPath + '/{directive,object,service,utility,page,provider}/**/*.{md,html,markdown}'
        ]).pipe(es.map(function(file, callback) {
            // Grab relative path from ionic-site root
            var relpath = file.path.replace(RegExp('^.*?' + docPath + '/'), '');
            modules.push(relpath);

            callback();
        })).on('end', function() {
            modules = modules.map(function(m) {
                var routeName = m.split('.html')[0].split('/');
                routeName = routeName[routeName.length - 1];

                var routePath = 'api/' + m.split('.html')[0];

                // get rid of .html,
                var new_m = {
                    routePath: routePath,
                    routeName: routeName
                };

                return new_m;
            });

            gulp.src('config/templates/meteor/router.template.js')
                .pipe(template({modules: modules}))
                .pipe(rename('router.js'))
                .pipe(gulp.dest('doc/lib'))
                .on('end', function() {

                    gulp.src('config/templates/meteor/helpers.template.js')
                        .pipe(template({version: arg.version()}))
                        .pipe(rename('helpers.js'))
                        .pipe(gulp.dest('doc/client/lib'))
                        .on('end', function() {
                            resolve();
                        });
                });
        });
    });
});

gulp.task('copy-meteor-doc-public-files', function() {
    return gulp.src('config/templates/meteor/public/**/*')
        .pipe(gulp.dest('doc/public'));
});

gulp.task('setup-meteor-doc-project', function(cb) {
    runSequence(
        'clean-up-meteor-doc-project',
        'copy-meteor-doc-public-files',
        'setup-meteor-doc-project-templates',
        'setup-meteor-doc-project-packages',
        'create-router-meteor-doc-project',
        'doc-styles', cb);
});

gulp.task('doc', function(cb) {
    runSequence('create-meteor-doc-project', 'setup-meteor-doc-project', cb);
});

// Watcher section.
gulp.task('watchers', function () {
    gulp.watch(paths.js, ['setup-meteor-doc-project']);
    gulp.watch(paths.templates, ['setup-meteor-doc-project']);
    gulp.watch(paths.docStyles, ['setup-meteor-doc-project']);
});

gulp.task('default', ['setup-meteor-doc-project', 'watchers']);