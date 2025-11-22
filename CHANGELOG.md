# Changelog

## [0.2.0](https://github.com/corderop/inkflux/compare/inkflux-v0.1.0...inkflux-v0.2.0) (2025-11-22)


### Features

* add a new favicon for the project ([181a70c](https://github.com/corderop/inkflux/commit/181a70c1691360f75a8db2a2b47ea38836c66cd8))
* add Dockerfile for the project ([b2fa729](https://github.com/corderop/inkflux/commit/b2fa7296903c100660fad1ffd13f8bf7d7d89467)), closes [#29](https://github.com/corderop/inkflux/issues/29)
* add Miniflux API client ([9f35eb9](https://github.com/corderop/inkflux/commit/9f35eb9953716f0f69d2435165a3597f6123cc0e))
* change URL and paging system ([938a9a8](https://github.com/corderop/inkflux/commit/938a9a88fa01b280e090f4745f163ee092aa4039)), closes [#7](https://github.com/corderop/inkflux/issues/7)
* clean URL introduced by the user to match the proper format ([c63638e](https://github.com/corderop/inkflux/commit/c63638e020cf44da3e668d0b7dedfeab2af74bf2)), closes [#20](https://github.com/corderop/inkflux/issues/20)
* create article page to dynamically show one or another ([bcd818b](https://github.com/corderop/inkflux/commit/bcd818b3ad306443851f9255daf306750c6ecb6c))
* create the first version of the article page ([8769111](https://github.com/corderop/inkflux/commit/8769111f5b9aefb58823a60614aa73a05b246e2f))
* create the first version of the nav component ([deb89a3](https://github.com/corderop/inkflux/commit/deb89a300ffffb1029d3bc42c0e12f55f85bc9b4))
* disable links inside the article ([ade6beb](https://github.com/corderop/inkflux/commit/ade6bebec860f86c354d7eff0bdf3597a51bfd85)), closes [#32](https://github.com/corderop/inkflux/issues/32)
* fix sizing to have more useful screen % ([5f1185b](https://github.com/corderop/inkflux/commit/5f1185b58c63bcca70181a1e16e0c5af4b69096d))
* implement login ([0e8873d](https://github.com/corderop/inkflux/commit/0e8873d6fdd3fc53548aa246fcc092c3ecb9dfca))
* implement mark as read button ([c4e9bf4](https://github.com/corderop/inkflux/commit/c4e9bf4721be0e2f2525ab3734a351d088f8516d)), closes [#14](https://github.com/corderop/inkflux/issues/14)
* implement paging system to read the article easily ([aa49d3c](https://github.com/corderop/inkflux/commit/aa49d3cbba9c14bc840abebd636d1fd62a0fc6b6))
* implement sign out button ([2480596](https://github.com/corderop/inkflux/commit/24805969beea275536d55c78fdf57e01dd164341)), closes [#5](https://github.com/corderop/inkflux/issues/5)
* implement validation of the credentials when login ([25eb937](https://github.com/corderop/inkflux/commit/25eb93781f78e155bb141259b67e8802588149d1))
* improve the display of figures and images ([9cc202d](https://github.com/corderop/inkflux/commit/9cc202de394510acb149a14cbab94c138fb48895))
* include feed title into the title section ([244dd34](https://github.com/corderop/inkflux/commit/244dd34ee4e978820c2e18754199c9adab4af7b3))
* initialize project ([f162365](https://github.com/corderop/inkflux/commit/f162365322f7ad0e510f294ff78600974f535b04))
* make entries to appear in desc order and only unreads ([7fe555f](https://github.com/corderop/inkflux/commit/7fe555f48b7ba69b650257ff506e207b3a85d6bf))
* make the nav sticky on scroll ([af0ccdc](https://github.com/corderop/inkflux/commit/af0ccdcd14cc6e0d0207c137659b40658a1f1b2e))
* redirect root page to unreads automatically ([fc429ce](https://github.com/corderop/inkflux/commit/fc429ce228f9d7db28dcf9aa1c130cc545f1788f))
* redirect to login on auth failures and to articles if already logged ([f834bf0](https://github.com/corderop/inkflux/commit/f834bf0ad14fb4af6c1784580493ff0246181464)), closes [#3](https://github.com/corderop/inkflux/issues/3)


### Bug Fixes

* add prod to only install prod packages in the Dockerfile ([6ed08c1](https://github.com/corderop/inkflux/commit/6ed08c1c6fe344fef9615ce70231c5b406c2bf8a))
* article page and mark as read button broken after rework ([6a7733b](https://github.com/corderop/inkflux/commit/6a7733b5ba7ab4b1d40b9686bedfe26c2893d0f6)), closes [#31](https://github.com/corderop/inkflux/issues/31)
* disable backward link for the first article ([acf9710](https://github.com/corderop/inkflux/commit/acf97104d8c509c3f9881d77f3b79eac6c6dfabc))
* fix bug while navigating through articles ([d828968](https://github.com/corderop/inkflux/commit/d82896886d2926c851f382771cfc777affc404d7))
* horizontal images not showing up properly ([e655d6a](https://github.com/corderop/inkflux/commit/e655d6aa4ea30d71642f1f930117ecbcd0278c7a))
* make the code to be properly formatted ([707861b](https://github.com/corderop/inkflux/commit/707861b1cf169f8ea3697555967011ec3f302e7b))
* remove read/unread button ([0e17a03](https://github.com/corderop/inkflux/commit/0e17a03b981b1518c5cc798ab9a297d00cb16408))
* run workflow to create the github version and the tag after merging ([525b98d](https://github.com/corderop/inkflux/commit/525b98d2ac8b016f3ec84617eaf6beaf6d175ad2))
* see older post first for unreads ([63c3539](https://github.com/corderop/inkflux/commit/63c3539e6b7512b63f52e59dbad2827bf47685f4))

## [0.1.0](https://github.com/corderop/inkflux/compare/inkflux-v0.0.1...inkflux-v0.1.0) (2025-11-22)


### Features

* add a new favicon for the project ([181a70c](https://github.com/corderop/inkflux/commit/181a70c1691360f75a8db2a2b47ea38836c66cd8))
* add Dockerfile for the project ([b2fa729](https://github.com/corderop/inkflux/commit/b2fa7296903c100660fad1ffd13f8bf7d7d89467)), closes [#29](https://github.com/corderop/inkflux/issues/29)
* add Miniflux API client ([9f35eb9](https://github.com/corderop/inkflux/commit/9f35eb9953716f0f69d2435165a3597f6123cc0e))
* change URL and paging system ([938a9a8](https://github.com/corderop/inkflux/commit/938a9a88fa01b280e090f4745f163ee092aa4039)), closes [#7](https://github.com/corderop/inkflux/issues/7)
* clean URL introduced by the user to match the proper format ([c63638e](https://github.com/corderop/inkflux/commit/c63638e020cf44da3e668d0b7dedfeab2af74bf2)), closes [#20](https://github.com/corderop/inkflux/issues/20)
* create article page to dynamically show one or another ([bcd818b](https://github.com/corderop/inkflux/commit/bcd818b3ad306443851f9255daf306750c6ecb6c))
* create the first version of the article page ([8769111](https://github.com/corderop/inkflux/commit/8769111f5b9aefb58823a60614aa73a05b246e2f))
* create the first version of the nav component ([deb89a3](https://github.com/corderop/inkflux/commit/deb89a300ffffb1029d3bc42c0e12f55f85bc9b4))
* disable links inside the article ([ade6beb](https://github.com/corderop/inkflux/commit/ade6bebec860f86c354d7eff0bdf3597a51bfd85)), closes [#32](https://github.com/corderop/inkflux/issues/32)
* fix sizing to have more useful screen % ([5f1185b](https://github.com/corderop/inkflux/commit/5f1185b58c63bcca70181a1e16e0c5af4b69096d))
* implement login ([0e8873d](https://github.com/corderop/inkflux/commit/0e8873d6fdd3fc53548aa246fcc092c3ecb9dfca))
* implement mark as read button ([c4e9bf4](https://github.com/corderop/inkflux/commit/c4e9bf4721be0e2f2525ab3734a351d088f8516d)), closes [#14](https://github.com/corderop/inkflux/issues/14)
* implement paging system to read the article easily ([aa49d3c](https://github.com/corderop/inkflux/commit/aa49d3cbba9c14bc840abebd636d1fd62a0fc6b6))
* implement sign out button ([2480596](https://github.com/corderop/inkflux/commit/24805969beea275536d55c78fdf57e01dd164341)), closes [#5](https://github.com/corderop/inkflux/issues/5)
* implement validation of the credentials when login ([25eb937](https://github.com/corderop/inkflux/commit/25eb93781f78e155bb141259b67e8802588149d1))
* improve the display of figures and images ([9cc202d](https://github.com/corderop/inkflux/commit/9cc202de394510acb149a14cbab94c138fb48895))
* include feed title into the title section ([244dd34](https://github.com/corderop/inkflux/commit/244dd34ee4e978820c2e18754199c9adab4af7b3))
* initialize project ([f162365](https://github.com/corderop/inkflux/commit/f162365322f7ad0e510f294ff78600974f535b04))
* make entries to appear in desc order and only unreads ([7fe555f](https://github.com/corderop/inkflux/commit/7fe555f48b7ba69b650257ff506e207b3a85d6bf))
* make the nav sticky on scroll ([af0ccdc](https://github.com/corderop/inkflux/commit/af0ccdcd14cc6e0d0207c137659b40658a1f1b2e))
* redirect root page to unreads automatically ([fc429ce](https://github.com/corderop/inkflux/commit/fc429ce228f9d7db28dcf9aa1c130cc545f1788f))
* redirect to login on auth failures and to articles if already logged ([f834bf0](https://github.com/corderop/inkflux/commit/f834bf0ad14fb4af6c1784580493ff0246181464)), closes [#3](https://github.com/corderop/inkflux/issues/3)


### Bug Fixes

* add prod to only install prod packages in the Dockerfile ([6ed08c1](https://github.com/corderop/inkflux/commit/6ed08c1c6fe344fef9615ce70231c5b406c2bf8a))
* article page and mark as read button broken after rework ([6a7733b](https://github.com/corderop/inkflux/commit/6a7733b5ba7ab4b1d40b9686bedfe26c2893d0f6)), closes [#31](https://github.com/corderop/inkflux/issues/31)
* disable backward link for the first article ([acf9710](https://github.com/corderop/inkflux/commit/acf97104d8c509c3f9881d77f3b79eac6c6dfabc))
* fix bug while navigating through articles ([d828968](https://github.com/corderop/inkflux/commit/d82896886d2926c851f382771cfc777affc404d7))
* horizontal images not showing up properly ([e655d6a](https://github.com/corderop/inkflux/commit/e655d6aa4ea30d71642f1f930117ecbcd0278c7a))
* make the code to be properly formatted ([707861b](https://github.com/corderop/inkflux/commit/707861b1cf169f8ea3697555967011ec3f302e7b))
* remove read/unread button ([0e17a03](https://github.com/corderop/inkflux/commit/0e17a03b981b1518c5cc798ab9a297d00cb16408))
* run workflow to create the github version and the tag after merging ([525b98d](https://github.com/corderop/inkflux/commit/525b98d2ac8b016f3ec84617eaf6beaf6d175ad2))
* see older post first for unreads ([63c3539](https://github.com/corderop/inkflux/commit/63c3539e6b7512b63f52e59dbad2827bf47685f4))
