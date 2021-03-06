# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.2](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.3.1...v0.3.2) (2021-01-17)


### Bug Fixes

* **css:** remove unnecessary grid ([58a92dc](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/58a92dc3e30e3c16485c17df4fba554830f81b08))
* **css:** use border instead of grid-gap ([ff6ea40](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/ff6ea40f4dd5f5ac8c87c99777429d4e78da8d7f))
* **table:** fix duration sorting ([20b3cf4](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/20b3cf494d435f12d542988b3142ce201ac68f42))
* **table:** fix grid layout ([16093b4](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/16093b4c6775f53e27208b3cb585812cc8b9106d))
* **table:** hide created by column from playlists table on channel page ([d789580](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/d7895800d8c10b569d320d773aa01b61798ff348))
* **url:** rename getVideoUrl to getPlaylistItemUrl & add getVideoUrl ([aa1c453](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/aa1c453732f72b82618a590be64419c3b8f5d74d))

### [0.3.1](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.3.0...v0.3.1) (2021-01-07)


### Bug Fixes

* **expanded:** increase player size ([44e83c4](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/44e83c48b548049d5e9965b9fade9ea1224c54c4))
* **url:** update getChannelUrl & getPlaylistUrl ([59a15b6](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/59a15b60a7ef932e1667279ab4a797f3dcd4792c))

## [0.3.0](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.2.1...v0.3.0) (2021-01-06)


### ⚠ BREAKING CHANGES

* Google auth scope changed from readonly to standard

### Features

* add remove video flow ([d303474](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/d30347444f2b52a315beebfee794a7c2548b2641))


### Bug Fixes

* **head:** remove unnecessary meta tag ([a5c4ac6](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/a5c4ac6d2c4e344faf7ae16bb25be03c6ca81168))
* **table:** don't autoReset GroupBy, SortBy, Expanded on data change ([1967203](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/1967203f93fa91c867a5afc5e109f14fc329c311))
* **table:** reverse multiSort order for WikiPedia-like sorting ([80c5c86](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/80c5c86cc267d1f7cae26b9a2f2bc29ff93f5786))
* **table:** update duration output for playlistItemsView ([868b08f](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/868b08fc90b5d68ec6e6ec896e4b3c829fcb9a3e))

### [0.2.1](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.2.0...v0.2.1) (2021-01-04)


### Features

* **table:** add expand to play ([d892262](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/d8922626f45655617479f69b855dac7738f07d45))
* **table:** add groupBy ([8c22d12](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/8c22d12c58fc8c83b2d494265900ef2a0bf3c2a1))
* **table:** add sortBy ([65d8af2](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/65d8af2557a2367b99b776071d76ccf3ff8f29c4))


### Bug Fixes

* **query:** enable refetch stale queries on mount ([86d5acf](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/86d5acf7800b24e3eddc20a1874bee506d802ed3))

## [0.2.0](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.1.9...v0.2.0) (2021-01-03)


### Features

* **api:** add react-query ([eae6352](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/eae63521f3dc0ab7fdd43be055eb8c0034a5a64b))
* **head:** add react-helmet-async for custom page titles ([dfc6185](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/dfc61857215fc1f667cb9f195c681559b0e6b888))
* **refactor:** add react-router ([3ddf096](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/3ddf096db107d33427e2fa7745ad21e0137059f0))
* **table:** add links ([522f848](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/522f848da86df136438ced443581acbca0dc68c8))

### [0.1.9](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.1.8...v0.1.9) (2021-01-01)


### Bug Fixes

* **user:** improve user flow ([35ff778](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/35ff7789993efc7e5b0fd89206456a750b8a6b74))

### [0.1.8](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.1.7...v0.1.8) (2020-12-28)


### Features

* **api:** show error toasts ([cb6c731](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/cb6c73130e9141ffabbc14130741c4018e2d059a))
* **user:** add signIn/signOut flow ([4b493d2](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/4b493d293799621dfc44140f47713fafaf582493))


### Bug Fixes

* **api:** re-add error handling ([54c8a7d](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/54c8a7d8b332ee392d9490093245e0dc4ca39b30))

### [0.1.7](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.1.6...v0.1.7) (2020-12-27)


### Features

* **api:** support fetching user playlists ([10726aa](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/10726aad9b4eecfcb460c086fd71c0b9116f4c2f))


### Bug Fixes

* **url:** use RegExp for isChannelUrl/getChannelId ([fce1068](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/fce1068f097b1106472a62ae61509562755e2222))

### [0.1.6](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.1.5...v0.1.6) (2020-12-26)


### Features

* add table for channel info ([ec7a532](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/ec7a532708c018f947fc444f29e6ea94161748ec))
* add table for playlist info ([6990275](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/69902750b59591c2effbb2658f0eeb489d27ef37))
* support channel urls ([9198c7f](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/9198c7ff2f99df0ac7977d5f68005b55a6c31a13))


### Bug Fixes

* **api:** update API key ([0dc1e53](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/0dc1e53a4f36407f859644165f930502d9831abf))

### [0.1.5](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.1.4...v0.1.5) (2020-12-22)


### Features

* add scroll to fetch more items ([1f79db7](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/1f79db7b8668509ee01f3af5978e458459daca5a))


### Bug Fixes

* remove material-ui ([1df137b](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/1df137bb85b8cc996ba7fb69328067ab362c459c))

### [0.1.4](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.1.3...v0.1.4) (2020-12-20)


### Features

* add google analytics ([c46cde6](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/c46cde61e33ec4eb8fbbb0e7c50b4b3759e4434f))
* **url:** trigger on enter key ([140d17f](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/140d17f902514b0d9a6a80c21853b18abf77d14a))


### Bug Fixes

* **css:** add more padding at page bottom ([52de590](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/52de590e9fafdcc76e97d52b59ac306e40bf8469))
* **css:** fix header width on mobile ([5067da5](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/5067da59904738d30d3a769f3a80fddbae10e31a))
* **table:** add missing getTableBodyProps and add prop-types ([29cfb2a](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/29cfb2aa198bcb7aaa9d0a5c5430a7c40f0ab990))

### [0.1.3](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.1.2...v0.1.3) (2020-12-19)


### Features

* **header:** add github link ([8cda695](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/8cda695a3f4af539d4adfd9982f2871e5c1c629e))
* **url:** allow refreshing ([c094a2a](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/c094a2a2943cff5b6e08bc57310849fe93f1d0b5))


### Bug Fixes

* **table:** channel title != added by ([55bfedc](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/55bfedc47cf4bfe56cf3cdf6ffc592392de9de6d))

### [0.1.2](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.1.1...v0.1.2) (2020-12-18)


### Features

* **redux:** persist to localStorage ([c9be31a](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/c9be31a3964ae6bce3da3dc4cb77313da66a0b4e))


### Bug Fixes

* **css:** remove unnecessary css ([5f090ee](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/5f090eeb6c37a342d69f06790c211d2d426ad42c))

### [0.1.1](https://github.com/utkarshgupta137/youtube-playlist-manager/compare/v0.1.0...v0.1.1) (2020-12-18)


### Bug Fixes

* **css:** use rem for padding and add table font-size ([3eb595f](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/3eb595f506861d36174705803dfa03b7dc37d6fb))
* **redux:** only update playlistItemsList after fetching video info ([f65792b](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/f65792b9129fc2a103a4a25560d62a62261a3729))
* **url:** allow all urls with list param for isPlaylistUrl ([2d2208c](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/2d2208cf2e3d1a3b950ad8fddd39a609e75879d0))

## 0.1.0 (2020-12-17)


### Features

* playlistItems flow working ([bbfd338](https://github.com/utkarshgupta137/youtube-playlist-manager/commit/bbfd338043acca7fdab2975a16215fd427ac0c4f))
