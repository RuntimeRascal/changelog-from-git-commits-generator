# [changelog-from-git-commits-generator](https://github.com/simpert/changelog-from-git-commits-generator/blob/master/README.md)    


## [v1.0.20](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.20) *( May 15 2019, 3:29 pm )* 

- ### Chores:
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  fixed bug filtering issues from bod [86008a7](https://github.com/simpert/changelog-from-git-commits-generator/commit/86008a76715b45f48c5c181e9a68a770172ca726)


- ### Unparsable Commits
   - 1.0.20 

## [v1.0.19](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.19) *( May 15 2019, 2:38 pm )*  

- ### Chores:
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  remove empty double spaces from commit body and remove newlines with single space [a29b92d](https://github.com/simpert/changelog-from-git-commits-generator/commit/a29b92d0a756f81032a5a9a44d1987884a3b69e2)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  filter out 'ISSUE' lines from commit body [e3f16b5](https://github.com/simpert/changelog-from-git-commits-generator/commit/e3f16b54c74b3f4235639051973f8eb7bb6e6b87)
      > ```
      >When the body contains work item links or issue numbers these line needed to not show in body in output  
      > ```
      - *CLOSES ISSUES*
         > - [#21](https://github.com/simpert/changelog-from-git-commits-generator/issues/21)


- ### Unparsable Commits
   - 1.0.19 

## [v1.0.18](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.18) *( May 15 2019, 1:27 pm )* 

- ### Chores:
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  cleanup commit body output and remove the empty body delimeter in unparsable commits [a8bac54](https://github.com/simpert/changelog-from-git-commits-generator/commit/a8bac5472e94071c4e1ef2fae08363e0d8832ef9)


- ### Unparsable Commits
   - 1.0.18 

## [v1.0.17](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.17) *( May 15 2019, 12:11 pm )* 

- ### Features:
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  filter out any duplicates commits that overlap tags [c29bae5](https://github.com/simpert/changelog-from-git-commits-generator/commit/c29bae57b83adfc14db846d96d2508c3021b2488)
      > ```
      >some commits were showing up twice under a tag range as well between last tag and head these duplicate commits are now removed so commit is only added if not allready in the all commits array  
      > ```


- ### Unparsable Commits
   - 1.0.17 

## [v1.0.16](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.16) *( May 04 2019, 5:52 pm )* 

- ### Bug Fixes:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(module)`**  create tag url from unparsed version [dab4c3a](https://github.com/simpert/changelog-from-git-commits-generator/commit/dab4c3af98f29f9ccd4ab0e80217306b111aaa66)


- ### Unparsable Commits
   - 1.0.16 

## [v1.0.15](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.15) *( May 04 2019, 5:35 pm )* 

- ### Bug Fixes:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(module)`**  logical bug where hideEmptyVersions set to `true` was preventing all commits from showi [a2efc41](https://github.com/simpert/changelog-from-git-commits-generator/commit/a2efc41efbd01d7a2ccc41948ae10cdab2fbb3df)


- ### Unparsable Commits
   - 1.0.15 

## [v1.0.14](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.14) *( May 04 2019, 4:58 pm )* 

- ### Features:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(module)`**  added feat to allow placing all command options in `package.json` or a seperate '.chan [2f7b11b](https://github.com/simpert/changelog-from-git-commits-generator/commit/2f7b11b313851f444acfd701f4905f198aaea33e)


- ### Unparsable Commits
   - 1.0.14 

## [v1.0.13](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.13) *( May 04 2019, 3:34 pm )* 

- ### Chores:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(module)`**  add mailto link for author email when hideAuthor is set to false [f46b2a0](https://github.com/simpert/changelog-from-git-commits-generator/commit/f46b2a00deb88602f4bc266ebc513afef2552cde)


- ### Unparsable Commits
   - 1.0.13 

## [v1.0.12](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.12) *( May 04 2019, 3:20 pm )* 

- ### Chores:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(module)`**  change date format to less info [08c7ec6](https://github.com/simpert/changelog-from-git-commits-generator/commit/08c7ec6e217567ed4e634a3b52672970576741c0)
   - *[tsimper](mailto:tommy@gmetrix.net)***`(module)`**  parse all linked issues in entire body [888fcd0](https://github.com/simpert/changelog-from-git-commits-generator/commit/888fcd08a1d397bce3e6a74fbfadeb526397f477)


- ### Unparsable Commits
   - 1.0.12 

## [v1.0.11](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.11) *( May 04 2019, 2:54 pm )* 

- ### Chores:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(module)`**  update issue regex [d58b135](https://github.com/simpert/changelog-from-git-commits-generator/commit/d58b135268ce18b9094a4fe794f7dac4214855eb)


- ### Unparsable Commits
   - 1.0.11 

## [v1.0.10](https://github.com/simpert/changelog-from-git-commits-generator/tags/v1.0.10) *( May 04 2019, 2:30 pm )* 

- ### Bug Fixes:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(module)`**  added new issue delimeter to catch closes issue number lines in body [bd3661f](https://github.com/simpert/changelog-from-git-commits-generator/commit/bd3661fc4add2887bf9181f8baf749b602729894)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  version can not be prefixed with a v [0368a09](https://github.com/simpert/changelog-from-git-commits-generator/commit/0368a096d21644078c4fa64090457a0c67db712a)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  remove testing code in version file [8281458](https://github.com/simpert/changelog-from-git-commits-generator/commit/8281458eb00afe0b2b255c31f45a8e8b44a85eda)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  options show flags were inverted logic [76db222](https://github.com/simpert/changelog-from-git-commits-generator/commit/76db222dc7701e784fdb4eab8f18252f0c34f8db)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  fix writer grouping versions incorrectly causing some versions to appear seperately [62e06d0](https://github.com/simpert/changelog-from-git-commits-generator/commit/62e06d076ac19222bfd8829809b294d5437f29ef)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  version class will parse beta and alpha version if follow common version strings [b355b58](https://github.com/simpert/changelog-from-git-commits-generator/commit/b355b58a880aca170b761cf1dd41a595038c0111)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(package)`**  when pass empty options default file needs to still be set along with other default op [ee9bf9c](https://github.com/simpert/changelog-from-git-commits-generator/commit/ee9bf9c463993cf1611d76663209be4efd4312f6)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(package)`**  sorting of versions should be largest version to smallest version [4cb40d7](https://github.com/simpert/changelog-from-git-commits-generator/commit/4cb40d7647a99dbf354051b988ddad8a25fd40f9)


- ### Chores:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(module)`**  update author output markdown [8a462fc](https://github.com/simpert/changelog-from-git-commits-generator/commit/8a462fcd9555a4651791f9e29d6588666711e3fd)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(scripts)`**  added shebang in cli to offer proper command [b1c3326](https://github.com/simpert/changelog-from-git-commits-generator/commit/b1c332660df6d6e554e8ab64d15e3865e7dfb134)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(package)`**  modified to get git commits from first commit to first tag to ensure all commits are [aeaf581](https://github.com/simpert/changelog-from-git-commits-generator/commit/aeaf581bb9fe1f44acc25d113a75ac2a298c99bf)


- ### Features:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(cli)`**  added many more cli options to control the written ouput [407280d](https://github.com/simpert/changelog-from-git-commits-generator/commit/407280ddd4ef76ae9f0cb7a4cac66b7fd5f05654)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  filter out each commit type option and command line options [1addcd7](https://github.com/simpert/changelog-from-git-commits-generator/commit/1addcd77fa8daf8837bee451e5757dcaa21d8785)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  added several new options to control what types of commits to show in output [905878f](https://github.com/simpert/changelog-from-git-commits-generator/commit/905878fde4e3eda1b3c7af1b69e7d8e185bee6b1)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  write first commit date into version tag for each version [d3d36c6](https://github.com/simpert/changelog-from-git-commits-generator/commit/d3d36c665c98865420bd5393b5091522ae21c13f)


- ### Build Improvments:
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(npm)`**  add config file to npm package [6a9d3ca](https://github.com/simpert/changelog-from-git-commits-generator/commit/6a9d3caac616f59247f0061ceb529a4fb71ebe24)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(scripts)`**  cleanup npm scripts [a538f03](https://github.com/simpert/changelog-from-git-commits-generator/commit/a538f0331bbf1de91faaae5b1297d9b338e8e701)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(package)`**  update generated changelog [7eecaab](https://github.com/simpert/changelog-from-git-commits-generator/commit/7eecaab4aca32ec6835b017cb27dbccb0c0fc9b9)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(scripts)`**  modify publish sccript [246e1d4](https://github.com/simpert/changelog-from-git-commits-generator/commit/246e1d41e7a38e3dcd91b723f09ca6c4bb35e47f)
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(scripts)`**  add new commit script and git hook to generate changelog on commit [73193db](https://github.com/simpert/changelog-from-git-commits-generator/commit/73193db7ac1bb859e2e313361e8e5e0bf1f153d2)


- ### Tests:
   - *[tsimper](mailto:tommysimper@hotmail.com)***`(module)`**  new version class unit tests [d668a5f](https://github.com/simpert/changelog-from-git-commits-generator/commit/d668a5f0368cafec2c16ee760f3e97a8717ad6e7)


- ### Unparsable Commits
   - 1.0.10 
   - 1.0.9 
   - 1.0.8 
   - 1.0.7 
   - 1.0.6 
   - 1.0.5 
   - 1.0.4 
   - 1.0.3 
   - 1.0.2 
   - Merge tag '1.0.1' into develop initial release with cli

## [1.0.0](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.0) *( Apr 15 2019, 8:10 pm )* 

- ### Chores:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(module)`**  bump version [39dd01d](https://github.com/simpert/changelog-from-git-commits-generator/commit/39dd01d3b93fa59e882c8b5e4d0f58bc41f9d817)
   - *[tsimper](mailto:tommy@gmetrix.net)***`(package)`**  added cli and new tests [06e8f1b](https://github.com/simpert/changelog-from-git-commits-generator/commit/06e8f1b118ff1863c675c7f8629ac198786fc27c)
   - *[tsimper](mailto:tommy@gmetrix.net)***`(package)`**  added Github repo support [12263d4](https://github.com/simpert/changelog-from-git-commits-generator/commit/12263d4a562ea1d839532786bfdaa48fa1300b82)


- ### Build Improvments:
   - *[tsimper](mailto:tommy@gmetrix.net)***`(resources)`**  added a contributing document to explain the git commiting details [f4e280e](https://github.com/simpert/changelog-from-git-commits-generator/commit/f4e280eb551d864315d9432a005dcb5a0a804ff1)
   - *[tsimper](mailto:tommy@gmetrix.net)***`(scripts)`**  initial project setup and git commit tooling configuration [4daa56e](https://github.com/simpert/changelog-from-git-commits-generator/commit/4daa56ee1786cec9f4216547ce4ca0cbd439ab20)


- ### Unparsable Commits
   - Merge branch 'release/1.0.1'