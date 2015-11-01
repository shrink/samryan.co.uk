var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var branch = require('metalsmith-branch');
var sass = require('metalsmith-sass');
var concat = require('metalsmith-concat');
var fingerprint = require('metalsmith-fingerprint');

var metalsmith = Metalsmith(__dirname);
    metalsmith
    .source('source')
    .destination('build')

    .use(branch('stylesheets/*.scss')
        .use(sass({
            outputDir: 'styles/'
        }))
        .use(concat({
            files: 'styles/*',
            output: 'site.css'
        }))
    )

    .use(fingerprint({pattern: ['site.css']}))

    .use(collections({
        pages: {
            pattern: '*.md'
        },
        projects: {
            pattern: '_projects/*.md'
        }
    }))

    .use(branch('_projects/*.md')
        .use(markdown())
    )

    .use(branch('*.md')
        .use(markdown())
        .use(layouts({
            engine: 'jade',
            directory: 'layouts',
            default: 'page.jade'
        }))
    )

    // delete any files that start with _, prevents projects files from being included in the build
    .use(function(files, metalsmith, done){
        for (var file in files) {
            if (file.substring(0, 1) === '_') delete files[file];
        }
        done();
    })

    .build(function(err){
        if (err) throw err;
    });