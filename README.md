# Samryan.co.uk

A personal website with project listing built using [Metalsmith](http://metalsmith.io) and
[Skeleton](http://getskeleton.com/). Deployment is handled via [CircleCI](https://circleci.com/).

Run `npm install`, `bower install` and then `node build` to build the project. Deploy by putting the contents
of the `build` directory somewhere web accessible.

## How to deploy with CircleCI

To deploy to a web server on changes to the repository you can use CircleCI,
the deployment scripts makes assumptions about the server configuration:

- The websites root directory is /srv/www/samryan.co.uk
- The vhost points to /srv/www/samryan.co.uk/live

After the project is created in the CircleCI dashboard you will need to add an
Environment Variable `DEPLOY_TARGET`, example value `circle@samryan.co.uk`. Then
you will need to create a user on the target server named `circle` and enter the
private key for that user into the SSH Permissions page on the CircleCI dashboard.