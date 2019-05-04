# [changelog-from-git-commits-generator](https://github.com/simpert/changelog-from-git-commits-generator/blob/master/README.md)    


## [v1.0.7](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.7) (Thursday, April 25th 2019, 4:06:03 pm) 

- ### Bug Fixes:
   - <tsimper> `(module)`  version can not be prefixed with a v [0368a09](https://github.com/simpert/changelog-from-git-commits-generator/commit/0368a096d21644078c4fa64090457a0c67db712a)


## [v1.0.6](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.6) (Wednesday, April 24th 2019, 5:01:34 pm) 

- ### Build Improvments:
   - <tsimper> `(npm)`  add config file to npm package [6a9d3ca](https://github.com/simpert/changelog-from-git-commits-generator/commit/6a9d3caac616f59247f0061ceb529a4fb71ebe24)


## [v1.0.5](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.5) (Wednesday, April 24th 2019, 4:49:23 pm) 

- ### Bug Fixes:
   - <tsimper> `(module)`  remove testing code in version file [8281458](https://github.com/simpert/changelog-from-git-commits-generator/commit/8281458eb00afe0b2b255c31f45a8e8b44a85eda)


## [v1.0.4](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.4) (Wednesday, April 24th 2019, 4:42:51 pm) 

- ### Bug Fixes:
   - <tsimper> `(module)`  options show flags were inverted logic [76db222](https://github.com/simpert/changelog-from-git-commits-generator/commit/76db222dc7701e784fdb4eab8f18252f0c34f8db)
   - <tsimper> `(module)`  fix writer grouping versions incorrectly causing some versions to appear seperately [62e06d0](https://github.com/simpert/changelog-from-git-commits-generator/commit/62e06d076ac19222bfd8829809b294d5437f29ef)
   - <tsimper> `(module)`  version class will parse beta and alpha version if follow common version strings [b355b58](https://github.com/simpert/changelog-from-git-commits-generator/commit/b355b58a880aca170b761cf1dd41a595038c0111)


- ### Features:
   - <tsimper> `(module)`  filter out each commit type option and command line options [1addcd7](https://github.com/simpert/changelog-from-git-commits-generator/commit/1addcd77fa8daf8837bee451e5757dcaa21d8785)
   - <tsimper> `(module)`  added several new options to control what types of commits to show in output [905878f](https://github.com/simpert/changelog-from-git-commits-generator/commit/905878fde4e3eda1b3c7af1b69e7d8e185bee6b1)
   - <tsimper> `(module)`  write first commit date into version tag for each version [d3d36c6](https://github.com/simpert/changelog-from-git-commits-generator/commit/d3d36c665c98865420bd5393b5091522ae21c13f)


- ### Chores:
   - <tsimper> `(scripts)`  added shebang in cli to offer proper command [b1c3326](https://github.com/simpert/changelog-from-git-commits-generator/commit/b1c332660df6d6e554e8ab64d15e3865e7dfb134)


- ### Tests:
   - <tsimper> `(module)`  new version class unit tests [d668a5f](https://github.com/simpert/changelog-from-git-commits-generator/commit/d668a5f0368cafec2c16ee760f3e97a8717ad6e7)


## [v1.0.3](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.3) (Tuesday, April 16th 2019, 11:21:00 am) 

- ### Build Improvments:
   - <tsimper> `(scripts)`  cleanup npm scripts [a538f03](https://github.com/simpert/changelog-from-git-commits-generator/commit/a538f0331bbf1de91faaae5b1297d9b338e8e701)
   - <tsimper> `(package)`  update generated changelog [7eecaab](https://github.com/simpert/changelog-from-git-commits-generator/commit/7eecaab4aca32ec6835b017cb27dbccb0c0fc9b9)
   - <tsimper> `(scripts)`  modify publish sccript [246e1d4](https://github.com/simpert/changelog-from-git-commits-generator/commit/246e1d41e7a38e3dcd91b723f09ca6c4bb35e47f)


## [v1.0.2](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.2) (Tuesday, April 16th 2019, 11:12:01 am) 

- ### Bug Fixes:
   - <tsimper> `(package)`  when pass empty options default file needs to still be set along with other default op [ee9bf9c](https://github.com/simpert/changelog-from-git-commits-generator/commit/ee9bf9c463993cf1611d76663209be4efd4312f6)
   - <tsimper> `(package)`  sorting of versions should be largest version to smallest version [4cb40d7](https://github.com/simpert/changelog-from-git-commits-generator/commit/4cb40d7647a99dbf354051b988ddad8a25fd40f9)


- ### Build Improvments:
   - <tsimper> `(scripts)`  add new commit script and git hook to generate changelog on commit [73193db](https://github.com/simpert/changelog-from-git-commits-generator/commit/73193db7ac1bb859e2e313361e8e5e0bf1f153d2)


- ### Chores:
   - <tsimper> `(package)`  modified to get git commits from first commit to first tag to ensure all commits are [aeaf581](https://github.com/simpert/changelog-from-git-commits-generator/commit/aeaf581bb9fe1f44acc25d113a75ac2a298c99bf)


## [1.0.0](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.0) (Monday, April 15th 2019, 8:09:52 pm) 

- ### Chores:
   - <tsimper> `(module)`  bump version [39dd01d](https://github.com/simpert/changelog-from-git-commits-generator/commit/39dd01d3b93fa59e882c8b5e4d0f58bc41f9d817)
   - <tsimper> `(package)`  added cli and new tests [06e8f1b](https://github.com/simpert/changelog-from-git-commits-generator/commit/06e8f1b118ff1863c675c7f8629ac198786fc27c)
   - <tsimper> `(package)`  added Github repo support [12263d4](https://github.com/simpert/changelog-from-git-commits-generator/commit/12263d4a562ea1d839532786bfdaa48fa1300b82)


- ### Build Improvments:
   - <tsimper> `(resources)`  added a contributing document to explain the git commiting details [f4e280e](https://github.com/simpert/changelog-from-git-commits-generator/commit/f4e280eb551d864315d9432a005dcb5a0a804ff1)
   - <tsimper> `(scripts)`  initial project setup and git commit tooling configuration [4daa56e](https://github.com/simpert/changelog-from-git-commits-generator/commit/4daa56ee1786cec9f4216547ce4ca0cbd439ab20)