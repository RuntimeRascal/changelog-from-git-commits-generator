# [changelog-from-git-commits-generator](https://github.com/simpert/changelog-from-git-commits-generator/blob/master/README.md)    


## [1.0.4](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.4) (Wed Apr 24 16:42:51 2019 -0600) 

- ### Bug Fixes:
   - *(module)*  options show flags were inverted logic [76db222](https://github.com/simpert/changelog-from-git-commits-generator/commit/76db222dc7701e784fdb4eab8f18252f0c34f8db)
   - *(module)*  fix writer grouping versions incorrectly causing some versions to appear seperately [62e06d0](https://github.com/simpert/changelog-from-git-commits-generator/commit/62e06d076ac19222bfd8829809b294d5437f29ef)
   - *(module)*  version class will parse beta and alpha version if follow common version strings [b355b58](https://github.com/simpert/changelog-from-git-commits-generator/commit/b355b58a880aca170b761cf1dd41a595038c0111)


- ### Features:
   - *(module)*  filter out each commit type option and command line options [1addcd7](https://github.com/simpert/changelog-from-git-commits-generator/commit/1addcd77fa8daf8837bee451e5757dcaa21d8785)
   - *(module)*  added several new options to control what types of commits to show in output [905878f](https://github.com/simpert/changelog-from-git-commits-generator/commit/905878fde4e3eda1b3c7af1b69e7d8e185bee6b1)
   - *(module)*  write first commit date into version tag for each version [d3d36c6](https://github.com/simpert/changelog-from-git-commits-generator/commit/d3d36c665c98865420bd5393b5091522ae21c13f)


- ### Chores:
   - *(scripts)*  added shebang in cli to offer proper command [b1c3326](https://github.com/simpert/changelog-from-git-commits-generator/commit/b1c332660df6d6e554e8ab64d15e3865e7dfb134)


- ### Tests:
   - *(module)*  new version class unit tests [d668a5f](https://github.com/simpert/changelog-from-git-commits-generator/commit/d668a5f0368cafec2c16ee760f3e97a8717ad6e7)


## [1.0.3](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.3) (Tue Apr 16 11:21:00 2019 -0600) 

- ### Build Improvments:
   - *(scripts)*  cleanup npm scripts [a538f03](https://github.com/simpert/changelog-from-git-commits-generator/commit/a538f0331bbf1de91faaae5b1297d9b338e8e701)
   - *(package)*  update generated changelog [7eecaab](https://github.com/simpert/changelog-from-git-commits-generator/commit/7eecaab4aca32ec6835b017cb27dbccb0c0fc9b9)
   - *(scripts)*  modify publish sccript [246e1d4](https://github.com/simpert/changelog-from-git-commits-generator/commit/246e1d41e7a38e3dcd91b723f09ca6c4bb35e47f)


## [1.0.2](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.2) (Tue Apr 16 11:12:01 2019 -0600) 

- ### Bug Fixes:
   - *(package)*  when pass empty options default file needs to still be set along with other default op [ee9bf9c](https://github.com/simpert/changelog-from-git-commits-generator/commit/ee9bf9c463993cf1611d76663209be4efd4312f6)
   - *(package)*  sorting of versions should be largest version to smallest version [4cb40d7](https://github.com/simpert/changelog-from-git-commits-generator/commit/4cb40d7647a99dbf354051b988ddad8a25fd40f9)


- ### Build Improvments:
   - *(scripts)*  add new commit script and git hook to generate changelog on commit [73193db](https://github.com/simpert/changelog-from-git-commits-generator/commit/73193db7ac1bb859e2e313361e8e5e0bf1f153d2)


- ### Chores:
   - *(package)*  modified to get git commits from first commit to first tag to ensure all commits are [aeaf581](https://github.com/simpert/changelog-from-git-commits-generator/commit/aeaf581bb9fe1f44acc25d113a75ac2a298c99bf)


## [1.0.0](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.0) (Mon Apr 15 20:09:52 2019 -0600) 

- ### Chores:
   - *(module)*  bump version [39dd01d](https://github.com/simpert/changelog-from-git-commits-generator/commit/39dd01d3b93fa59e882c8b5e4d0f58bc41f9d817)
   - *(package)*  added cli and new tests [06e8f1b](https://github.com/simpert/changelog-from-git-commits-generator/commit/06e8f1b118ff1863c675c7f8629ac198786fc27c)
   - *(package)*  added Github repo support [12263d4](https://github.com/simpert/changelog-from-git-commits-generator/commit/12263d4a562ea1d839532786bfdaa48fa1300b82)


- ### Build Improvments:
   - *(resources)*  added a contributing document to explain the git commiting details [f4e280e](https://github.com/simpert/changelog-from-git-commits-generator/commit/f4e280eb551d864315d9432a005dcb5a0a804ff1)
   - *(scripts)*  initial project setup and git commit tooling configuration [4daa56e](https://github.com/simpert/changelog-from-git-commits-generator/commit/4daa56ee1786cec9f4216547ce4ca0cbd439ab20)