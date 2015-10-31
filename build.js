var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var branch = require('metalsmith-branch');
var sass = require('metalsmith-sass');
var concat = require('metalsmith-concat');

var metalsmith = Metalsmith(__dirname);
    metalsmith
    .source('source')
    .destination('build')

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

    .use(branch('stylesheets/*.scss')
        .use(sass({
            outputDir: 'styles/'
        }))
        .use(concat({
            files: 'styles/*',
            output: 'styles/app.css'
        }))
    )

    .build(function(err){
        if (err) throw err;
    });