#!/bin/bash

log="$(git log --format="%s (%h)" $(git describe --tags --abbrev=0)..HEAD)"
version="$(node -e "console.log(require('./package.json').version);")"

title="# $version ($(date +'%Y-%m-%d'))\n\n"
changelog="$title"

while read -r line
do
  if [[ $line == "feat"* ]]; then # Problem: cannot read $changelog in if statement
    message=${line:4}
    if [[ $changelog != *"### Features"* ]]; then
      changelog="$changelog### Features\n\n"
    fi
    changelog=${changelog/"### Features\n\n"/"### Features\n\n- $message\n\n"}
  elif [[ $line == "fix"* ]]; then
    message=${line:3}
    if [[ $changelog != *"### Bug Fixes"* ]]; then
      changelog="$changelog### Bug Fixes\n\n"
    fi
    changelog=${changelog/"### Bug Fixes\n\n"/"### Bug Fixes\n\n- $message\n\n"}
  elif [[ $line == "test"* ]]; then
    message=${line:4}
    if [[ $changelog != *"### Testing"* ]]; then
      changelog="$changelog### Testing\n\n"
    fi
    changelog=${changelog/"### Testing\n\n"/"### Testing\n\n- $message\n\n"}
  elif [[ $line == "refactor"* ]]; then
    message=${line:8}
    if [[ $changelog != *"### Refactor"* ]]; then
      changelog="$changelog### Refactor\n\n"
    fi
    changelog=${changelog/"### Refactor\n\n"/"### Refactor\n\n- $message\n\n"}
  elif [[ $line == "docs"* ]];  then
    message=${line:4}
    if [[ $changelog != *"### Documentation"* ]]; then
      changelog="$changelog### Documentation\n\n"
    fi
    changelog=${changelog/"### Documentation\n\n"/"### Documentation\n\n- $message\n\n"}
  else
    if [[ $changelog != *"### Miscellaneous Tasks"* ]]; then
      changelog="$changelog### Miscellaneous Tasks\n\n"
    fi
    changelog=${changelog/"### Miscellaneous Tasks\n\n"/"### Miscellaneous Tasks\n\n- $line\n\n"}
  fi
done < <(echo "$log")

echo -e $changelog