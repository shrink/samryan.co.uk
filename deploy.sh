build="build-${CIRCLE_BUILD_NUM}"
sudo mkdir ~/${build}
sudo cp -R ~/${MY_REPOSITORY}/build/. ~/${build}
echo "Deploying ${build} to ${DEPLOY_TARGET}"
rsync -r -l ~/${build} ${DEPLOY_TARGET}:${MY_DIRECTORY}
ssh ${DEPLOY_TARGET} "ln -sfn ${MY_DIRECTORY}/${build} ${MY_DIRECTORY}/live"
echo "Build deployed and pushed live"
