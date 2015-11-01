build="build-${CIRCLE_BUILD_NUM}"
sudo mkdir ~/${build}
sudo cp -R ~/samryan.co.uk/build/. ~/${build}
echo "Deploying ${build} to ${DEPLOY_TARGET}"
rsync -r -l ~/${build} ${DEPLOY_TARGET}:/srv/www/samryan.co.uk
ssh ${DEPLOY_TARGET} "ln -sfn /srv/www/samryan.co.uk/${build} /srv/www/samryan.co.uk/live"
echo "Build deployed and pushed live"