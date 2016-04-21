# Samryan.co.uk

A static personal website for anyone to use! Generated with [Metalsmith](http://metalsmith.io)
and optional automatic deployment by [CircleCI](https://circleci.com/).

## How to use

Requirements: `nodejs` and `npm`

1. Fork the repository and edit the Markdown files to describe yourself and your
projects
2. Run `npm install` to  pull in all required dependencies
3. Run `node build` to generate a build

You're ready to go, navigate to [localhost:7926](http://localhost:7926) to preview
the build and once you're happy with it upload the contents of `build/` to your web
server.

## How to deploy with CircleCI

To build and deploy automatically to your server on every commit the project comes
with a circle.yml configuration and a deploy script. You will need:

1. Your websites domain, eg: samryan.co.uk
2. Your servers hostname, eg: web.samryan.co.uk
3. Access to add new users to your server
4. Control over your webserver configuration
5. An account on CircleCI with your project added (click `Build project` on the `Add Projects` page)

Perform the following steps:

1. Add a directory to your server for your website to live in, eg `/srv/www/samryan.co.uk`
2. Configure your webserver to use a subdirectory `live` as the webroot, eg `root /srv/www/samryan.co.uk/live`
3. Add a new deploy user to your server with key based authentication and grant write permissions on the website directory
4. Visit `Project Settings > SSH Permissions` and add the private key for your deploy user at your hostname
5. Navigate to `Project Settings > Environment Variables` and set the following values:

Name | Example | Description
---- | ----- | -----------
MY_REPOSITORY | samryan.co.uk | Your GitHub repository name, default: samryan.co.uk
MY_DIRECTORY | /srv/www/samryan.co.uk | Your website directory
DEPLOY_TARGET | circle@web.samryan.co.uk | Your deploy user @ your hostname

You're ready to go, any commit to the `master` brand of your repository will now trigger a build and deploy by CircleCI.

Any problems? Create an issue and I'll do what I can to help you out.

## License

```
The MIT License (MIT)

Copyright (c) 2016 Samuel Ryan <sam@samryan.co.uk>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
