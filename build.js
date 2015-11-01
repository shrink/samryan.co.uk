var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var branch = require('metalsmith-branch');
var sass = require('metalsmith-sass');
var concat = require('metalsmith-concat');
var fingerprint = require('metalsmith-fingerprint-ignore');
var ignore = require('metalsmith-ignore');

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

    .use(fingerprint({pattern: ['site.css', 'favicon.ico']}))

    .use(collections({
        pages: {
            pattern: '*.md'
        },
        projects: {
            pattern: 'projects/*.md'
        }
    }))

    .use(branch('projects/*.md')
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

    .use(ignore(['projects/*']))

    .build(function(err){
        if (err) throw err;
        console.log('Build successful!');
    });