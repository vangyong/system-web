#!/bin/bash

major_version=1
minor_version=0
build_version=0

project_name=system-web
pkg_name=$project_name-$major_version.$minor_version.$build_version

source_path=$(pwd)
spec_path=/root/rpmbuild/SPECS/$project_name.spec



# set npm environment
# npm config set registry http://10.4.5.88:8081/repository/npm-group
# export SASS_BINARY_PATH=/opt/linux-x64-64_binding.node

# build package
npm install
npm run build:prod

# Package resources into rpm-based source tarball
rm -rf $project_name-*
workdir=$pkg_name/opt/system-web

mkdir -p $workdir

cp -rf dist/* $workdir

tar czvf $pkg_name.tar.gz $pkg_name
mv $pkg_name.tar.gz /root/rpmbuild/SOURCES
rm -rf $pkg_name


# Execute rpmbuild
cp -f $source_path/$project_name.spec $spec_path

rpmbuild -bb $spec_path
