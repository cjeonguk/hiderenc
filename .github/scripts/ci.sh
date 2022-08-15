content="$(git log --format=%s $(git describe --tags --always --abbrev=0)..HEAD)"
if [[ -z $content ]]
then
  echo "Nothing changed"
else
  yarn test
  git config user.name "github-actions[bot]"
  git config user.email 41898282+github-actions[bot]@users.noreply.github.com

  # version=`git describe --tags --abbrev=0`
  # version="${version:1}"
  # echo $version

  changelog="# $(date +'%Y-%m-%d')\n\n$(echo $content | sed 's/\n/\n* /g')\n\n"
  sed -i "1s/^/$changelog/" CHANGELOG.md
  git add CHANGELOG.md

  version="$(node -e "console.log(require('./package.json').version);")"
  if [[ $version == *".0.0" ]]
  then
    if [[ $content == *"feat("*"):"* ]]
    then
      yarn version --minor
    else
      yarn version --patch
    fi
  else
    git commit -m "chore: Publish v$version"
    git tag -a v$version -m "v$version"
  fi
  git push && git push --tags

  mkdir app
  yarn build
  yarn dist
  yarn dist:mac-arm64

  gh release create v$version --notes $changelog "./dist/hider-v$version-win-x64.exe" "./dist/hider-v$version-linux-x64.zip" "./dist/hider-v$version-mac-x64.dmg" "./dist/hider-v$version-mac-arm64.dmg"
fi
