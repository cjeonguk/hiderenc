#!/bin/bash

content="$(git log --format=%s $(git describe --tags --always --abbrev=0)..HEAD)"
echo $content
if [[ -z $content ]]
then
  echo "Nothing changed"
else
  yarn install --frozen-lockfile

  yarn test
  git config user.name "github-actions[bot]"
  git config user.email 41898282+github-actions[bot]@users.noreply.github.com

  changelog="$(echo -e "# $(date +'%Y-%m-%d')\n$content" | sed -e "s/^/\* /")"
  changelog="${changelog:3}"
  echo -e $changelog | cat - CHANGELOG.md > temp && mv temp CHANGELOG.md
  git add CHANGELOG.md

  version="$(node -e "console.log(require('./package.json').version);")"
  if [[ $content == *"feat("*"):"* ]]
  then
    yarn version --minor
  else
    yarn version --patch
  fi
  git push && git push --tags

  mkdir app
  yarn build
  yarn dist
  yarn dist:mac-arm64

  gh release create v$version --notes "$changelog" "dist/hider-v$version-win-x64.exe" "dist/hider-v$version-linux-x64.zip" "dist/hider-v$version-mac-x64.dmg" "dist/hider-v$version-mac-arm64.dmg"
fi
