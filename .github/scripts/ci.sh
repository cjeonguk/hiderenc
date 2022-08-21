#!/bin/bash

content="$(git log --format=%s $(git describe --tags --always --abbrev=0)..HEAD)"
is-prerelease="$(node ./.github/scripts/check-prerelease.js `gh api -H "Accept: application/vnd.github+json" /repos/cjeonguk/hider/releases/latest`)"
if [[ -z $content ]] || [[ is-prerelease == "false" ]]; then
  echo "Nothing changed"
else
  yarn install --frozen-lockfile

  yarn test
  git config user.name "github-actions[bot]"
  git config user.email 41898282+github-actions[bot]@users.noreply.github.com

  yarn version --patch --no-git-tag-version

  source ./.github/scripts/generate-changelog.sh

  echo -e "$changelog\n\n$(cat CHANGELOG.md)" > CHANGELOG.md
  git add CHANGELOG.md package.json
  git commit -m "chore: Publish v$version"

  git push

  yarn build
  yarn dist:win
  yarn dist:linux
  yarn dist:mac:both

  gh release create v$version --notes "$(echo -e $changelog)" "dist/hider-v$version-win-x64.exe" "dist/hider-v$version-linux-x64.zip" "dist/hider-v$version-mac-x64.dmg" "dist/hider-v$version-mac-arm64.dmg" "dist/latest.yml" "dist/latest-mac.yml"
fi
