#!/bin/bash

content="$(git log --format=%s $(git describe --tags --always --abbrev=0)..HEAD)"
if [[ -z $content ]]; then
  echo "Nothing changed"
else
  yarn install --frozen-lockfile

  yarn test
  git config user.name "github-actions[bot]"
  git config user.email 41898282+github-actions[bot]@users.noreply.github.com

  yarn version --minor --no-git-tag-version

  source ./.github/scripts/generate-changelog.sh

  echo -e "$changelog\n\n$(cat CHANGELOG.md)" > CHANGELOG.md
  git add CHANGELOG.md package.json
  git commit -m "chore: Publish v$version"

  git push

  mkdir app
  yarn build
  yarn dist
  yarn dist:mac-arm64

  gh release create v$version --notes "$(echo -e $changelog)" "dist/hider-v$version-win-x64.exe" "dist/hider-v$version-linux-x64.zip" "dist/hider-v$version-mac-x64.dmg" "dist/hider-v$version-mac-arm64.dmg"
fi
