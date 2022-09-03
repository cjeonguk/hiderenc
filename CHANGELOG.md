## [3.0.1](https://github.com/cjeonguk/hider/compare/v3.0.0...v3.0.1) (2022-09-03)


### Bug Fixes

* **build:** Change license path ([d3d1d65](https://github.com/cjeonguk/hider/commit/d3d1d65b5ac92cca4159e9e91723c8498b456772))

# [3.0.0](https://github.com/cjeonguk/hider/compare/v2.0.0...v3.0.0) (2022-09-03)


### Code Refactoring

* **hider:** Change repo to monorepo ([a1f34c9](https://github.com/cjeonguk/hider/commit/a1f34c95a861b84ab683c3bca206496c0b45c61b))


### BREAKING CHANGES

* **hider:** Change repo to monorepo

# [2.0.0](https://github.com/cjeonguk/hider/compare/v1.4.1...v2.0.0) (2022-08-30)


### Bug Fixes

* **main:** Run update After program turned off ([ccf6cad](https://github.com/cjeonguk/hider/commit/ccf6cad39132d72ca91e52f75476e969aea4e928))
* **renderer:** Change password dialog title ([a9d5538](https://github.com/cjeonguk/hider/commit/a9d55383707a82cf8f3797ccb8529fd53ece5006))


### Features

* **main:** Use `tar` to encrypt files ([1d6dc7e](https://github.com/cjeonguk/hider/commit/1d6dc7e25ecf230188919ae9e680c8fe36694379))


### BREAKING CHANGES

* **main:** `encrypt` module changed a lot

## [1.4.1](https://github.com/cjeonguk/hider/compare/v1.4.0...v1.4.1) (2022-08-28)


### Bug Fixes

* **main:** Raise error if file is bigger than 2GB ([#22](https://github.com/cjeonguk/hider/issues/22)) ([30a9a62](https://github.com/cjeonguk/hider/commit/30a9a62a00561ecbcd8d3db6e62f8459bc573db1)), closes [#6](https://github.com/cjeonguk/hider/issues/6)


### Reverts

* Revert "chore(release): 1.4.1 [skip ci]" ([2f9acbd](https://github.com/cjeonguk/hider/commit/2f9acbd9a464b712117462b27c64a8dd6161a805))
* Revert "chore(release): 1.4.1 [skip ci]" ([cdd4ec3](https://github.com/cjeonguk/hider/commit/cdd4ec3c681f964ce13f11504692e375b7ae2a2f))
* Revert "chore(release): 1.4.1 [skip ci]" ([8d6f203](https://github.com/cjeonguk/hider/commit/8d6f203ce76f20ca2376ec1569e0f78455f17f92))
* Revert "chore(release): 1.4.1 [skip ci]" ([6baff59](https://github.com/cjeonguk/hider/commit/6baff597b171eb0c6fced67582029295df1ee153))
* Revert "chore(release): 1.4.1 [skip ci]" ([4a1412c](https://github.com/cjeonguk/hider/commit/4a1412c14fb374a7cbaf53845c636efe9be0bcff))
* Release ([ade6f0e](https://github.com/cjeonguk/hider/commit/ade6f0ea87b6241f48d4043f7ca9659d5461901d))

# [1.4.0](https://github.com/cjeonguk/hider/compare/v1.3.0...v1.4.0) (2022-08-27)

### Features

- **ipc:** File Associations check if \*.enc ([b088102](https://github.com/cjeonguk/hider/commit/b088102c8b8eb7fe382e90cd7dc8776ad5ebd54f))
- **main:** Add progressbar while encrypting ([1b72426](https://github.com/cjeonguk/hider/commit/1b72426ac4613419352653c590d15cd9564eb6f9))

### Reverts

- "chore(deps-dev): bump eslint-plugin-react from 7.30.1 to 7.31.0" ([#19](https://github.com/cjeonguk/hider/issues/19)) ([b5ce9f6](https://github.com/cjeonguk/hider/commit/b5ce9f6cd8bee690a9f891acb6d7164aeb7e4aef))
- "chore(deps-dev): bump typescript from 4.7.4 to 4.8.2" ([#18](https://github.com/cjeonguk/hider/issues/18)) ([01f7300](https://github.com/cjeonguk/hider/commit/01f73000c52ac456c72b939b7ca327ec1d7000cf))
- Release v1.4.0 ([3fe3714](https://github.com/cjeonguk/hider/commit/3fe3714ad146b7681747fe79c3bff39335ca653c))

# [1.3.0](https://github.com/cjeonguk/hider/compare/v1.2.5...v1.3.0) (2022-08-24)

### Bug Fixes

- **encrypt:** Show error message if password wrong ([9e3f90f](https://github.com/cjeonguk/hider/commit/9e3f90fbed7ab7beb63bce2e0595db7c712197bb))

### Features

- **autoUpdater:** Add progress bar while downloading ([6dcf09c](https://github.com/cjeonguk/hider/commit/6dcf09c7853f55b9eecb97a095e2804c5c8776f1))

# 1.2.5 (2022-08-21)

### Miscellaneous Tasks

- chore(workflows): Add stale.yml **(74f937d)**

- chore(ci): Remove prerelease **(60cfdc9)**

- chore(ci): Add latest.yml to release **(e86762c)**

# 1.2.4 (2022-08-21)

### Bug Fixes

- (autoUpdater): Change to checkForUpdates **(b975985)**

# 1.2.3 (2022-08-21)

### Miscellaneous Tasks

- chore(nsis): Set oneClick to false **(89c02fb)**

- chore(dependencies): Add dependabot.yml **(f821788)**

- chore(deps-dev): bump @typescript-eslint/parser from 5.33.0 to 5.33.1 **(c0a78b0)**

- chore(deps-dev): bump @swc/core from 1.2.232 to 1.2.241 **(61a9df1)**

- chore(deps-dev): bump @typescript-eslint/parser from 5.33.0 to 5.33.1 (#1) **(65e1a6e)**

- chore(deps-dev): bump @swc/core from 1.2.232 to 1.2.241 (#2) **(b1afa8a)**

- chore(deps-dev): bump @typescript-eslint/eslint-plugin **(7754a49)**

- Merge pull request #3 from cjeonguk/dependabot/npm_and_yarn/typescript-eslint/eslint-plugin-5.33.1 **(2f55539)**

- chore(deps-dev): bump @types/node from 18.7.3 to 18.7.8 **(635c6b7)**

- chore(deps): bump @mui/material from 5.10.0 to 5.10.1 (#5) **(838c1eb)**

- chore(ci): Changelog style change **(5296d9a)**

- chore(deps): Change dependency versions **(e5ed649)**

- chore(ci): Add symantic-pr.yml **(d569408)**

- chore(ci): Add labeler for pr and issue **(aebac1b)**

### Features

- (main): Add icon in code **(b4b6c22)**

# 1.2.2 (2022-08-21)

### Bug Fixes

- (autoUpdater): Remove unnecessity codes (0fee6da)

# 1.2.1 (2022-08-21)

### Miscellaneous Tasks

- chore(ci): Change prerelease (59c074a)

- chore(ci): Change how to detect prerelease (a9f384b)

- chore(ci): Change release-minor name (36c8b85)

- chore: Publish v1.2.1 (774180e)

- Revert "chore: Publish v1.2.1" (b2a466d)

- chore(ci): Fix JSON.parse error (47ec22c)

# 1.2.1-0 (2022-08-20)

### Miscellaneous Tasks

- chore: Change release notes (707dcef)

# 1.2.0-0 (2022-08-20)

### Miscellaneous Tasks

- chore: Add .gitmessage.txt (3538298)

- chore: Modify .gitmessage.txt (9fc3aaa)

- chore(ci): Change CHANGELOG.md format (7ba09f0)

- chore: Publish v (e8b69ad)

- Revert "chore: Publish v" (4b73ccc)

- chore(ci): Fix using `generate-changelog.sh` (2db6ab7)

### Refactor

- (main): Migrate JavaScript to TypeScript (5de4169)

- (renderer): Code splitting for webpack (d4641aa)

### Bug Fixes

- (autoUpdater): Add ErrorBox to display error (7f22dca)

# 1.1.0-0 (2022-08-17)

- 36ab094 (HEAD -> main, origin/main) feat(UI): Change passwd dialog to fullscreen

- e3202d6 chore(ci): Make pre-release type prerelease

- 4d1f30c style(CHANGELOG): Format changelog style

- d15bc2d style(ci): Change release note style

# 1.0.4-0 (2022-08-17)

- 82c81c9 (HEAD -> main, origin/main) style(ci): change `prerelease.yml` name

- fe3e9eb fix(autoUpdater): fix auto updater

- 6f615c9 chore(ci): Modify `ci.sh` and add `prerelease.sh`

- 1b2a252 style: Update changelog

- 8cc48eb chore: Update ci.sh about changelog

# 1.0.3 (2022-08-16)

- 85fd68f (HEAD -> main, origin/main) fix(encrypt): Fix .odt encoding problem

- 147608d chore: Update ci.sh about changelog

# 1.0.2 (2022-08-15)

- 9b55525 (HEAD -> main, origin/main) fix(package.json): Change Dependencies

- 9fb29c2 style: Add CI badge to README

- 41777a2 (tag: v1.0.1) chore: Publish v1.0.1

- 71a88a3 chore: Write changelog

# 1.0.1 (2022-08-15)

- 3be5611 (HEAD -> main, origin/main) chore: fix typo of ci.sh

- 46a4259 chore: Publish v1.0.1

- b3ea637 chore: Fix ci about changelog

- 4f86bc8 chore: Publish v1.0.1

- aad3b87 chore: Update ci to add changelog

- 3b90f66 chore: Publish v1.0.1

- 3ffe230 chore: Update ci

- 2f347c1 chore: test ci changelog

- 174d7c9 chore: Publish v1.0.2

- cc96ebc chore: Fix ci.sh

- 8f9cb5e chore: Publish v1.0.1

- 381f1ac chore: Fix ci.sh

- 7a20276 chore: Publish v1.0.0

- 041fbee chore: Fix CI

- 5b2daec chore: Publish v1.0.0

- 6ef8b16 chore: Fix CI

- 8d17a10 chore: Publish v1.0.1

- 817a452 chore: Fix typo of ci.yml

- 23d9d19 chore: Change CI checkout fetch-deps to 0

- bbf08e9 chore: Update ci.sh

- 79c916f chore: Change permission of ci.sh

- 08cdae5 chore: Update CI

- 1f6d575 chore: Fix CI

- af40b01 chore: Fix CI

- 8de980b chore: Update ci

- c4656ca chore: Update ci.yml

- c0f30b0 chore: Update ci.sh

- 6387314 chore: Create ci.sh

- 89c0fc5 chore: Update ci.yml

- 42b2a9a chore: Create ci.yml

- 0848fb1 Delete ci.yml

- d6f4fac fix: Update ci.yml

- d4ff25d chore: release

- d76ffbc feat: Add file associations

- 48a9262 feat: Add webpack-dev-server

- 2147bdb chore: Change minor version

- 165320f feat: Add auto update

- f263dc3 Update ci.yml

- a4d3b28 fix: Fix `artifactName` typo

- d8dc95d Update ci.yml

- c2f4d9b style: Change `artifactName`

- eeb4008 Update ci.yml

- 6895ac2 Update ci.yml

- 54dd2f5 Update ci.yml

- ca81396 Publish

- 24592d5 Publish

- 2658989 Publish

- a54732f Update ci.yml

- 5d47b30 Update ci.yml

- bab94c9 fix(icon): change size to 256x256

- ef21d20 Update ci.yml

- eac2f13 Update ci.yml

- 9b4667f Update ci.yml

- 33fc86f add icons

- 2e55994 Update ci.yml

- e1b729a Create ci.yml

- 700928d Add build script

- 5088a92 fix .gitignore

- 0f1eb1d Change layout

- 3efe68d Making main page

- 14121e9 (tag: v0.1.0) Initial commit
