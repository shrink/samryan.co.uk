var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var branch = require('metalsmith-branch');
var sass = require('metalsmith-sass');
var concat = require('metalsmith-concat');
var fingerprint = require('metalsmith-fingerprint-ignore');
var ignore = require('metalsmith-ignore');
var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

var metalsmith = Metalsmith(__dirname);
  metalsmith
  .source('source')
  .destination('build')

  .use(branch('*.scss')
    .use(sass())
  )

  .use(fingerprint({pattern: ['style.css', 'favicon.ico']}))

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
      default: 'page.jade',
      pretty: true
    }))
  )

  .use(ignore(['projects/*']))

  .build(function(err){
    if (err) throw err;
    console.log('Build successful!');

    if (process.argv[2] != 'without-preview') startPreviewServer();
  });

function startPreviewServer() {
  http.createServer(function(req, res){
    var done = finalhandler(req, res)
    var serve = serveStatic('build', {'index': ['index.html'], 'extensions': ['html']})
    serve(req, res, done)
  }).listen(7926)

  console.log('A local webserver has been launched, visit localhost:7926 in your browser to preview your build.');
  console.log('Exit this process to kill the webserver :-)');
  console.log('To build without the local webserver use `node build without-preview`');
}
