#!/usr/bin/env sh
mkdir temp_web

git config --global user.name "lynzz"
git config --global user.email "lynzz168@gmail.com"

if [ "$ROT_TOKEN" = "" ]; then
  echo "Bye~"
  exit 0
fi

# release
if [ "$TRAVIS_TAG" ]; then

  # 生成静态文件
  npm run docs:build
  cd temp_web
  git clone --depth 1 -b gh-pages --single-branch https://$ROT_TOKEN@github.com/wayejs/waye.git && cd waye
  # build sub folder
  echo $TRAVIS_TAG

  SUB_FOLDER='2.10'
  mkdir $SUB_FOLDER
  rm -rf *.html components assets
  rm -rf $SUB_FOLDER/**
  cp -rf ../../docs/.vuepress/dist/** .
  cp -rf ../../docs/.vuepress/dist/** $SUB_FOLDER/
  git add -A .
  git commit -m "$TRAVIS_COMMIT_MSG"
  git push origin gh-pages
  cd ../..

  echo "DONE, Bye~"
  exit 0
fi
