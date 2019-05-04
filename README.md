# Changelog From Git Commits Generator
A simple module that generates a changelog in markdown from all your projects git commits

*This project was influenced by https://github.com/lob/generate-changelog#readme*  

> There are a ton of changelog generators out there and I tried many before decideing to create one. Where others failed fort was with accomodating Azure-DevOps repositories. The generators create links to issues (work items in devops) as well links to commits and tags and such. Most generators failed to create proper links for devops. Github, bitbucket, vsts, etc. use a different url and naming to access things in the repository. Also, a bit more control on what to write to the changelog seemed rational.  

## Structure
- `lib/git.ts` gets all the `git` commit data from your repo.
- `lib/writer.ts` generates the changelog contents and writes it to disk
- `lib/cli.ts` generates the help and options avail on command line


## Using
This will generate from all commmits in your repository. NOT JUST SINCE LAST TAG. There are plans to offer major, minor and patch flags to control wether to just append to the an existing file limited commits.  

I had a difficult time figuring out how to display the current commits from the last tag to the current head so I ended up probing the version from the `package.json` and placing all commits from last known tag under the current version. This is where it got difficult for me to append to an existing `changelog` file since after we bump the version and make a new tag the commits previously put in the top of changlog would then need to be compared and possible moved if the tag was different.

Currently, the command is run from the `post-commit` `git hook`. This ensures that the changlog is always up to date.  

The hook is registered via `Husky`. I dont know much about `git` or hooks but this seems to work well.  

> So far, there are links for a git repo that I tested with this repo in `Github` and also `Azure DevOps` formely known as `Vsts`. The links are quite a bit different between different source control providers but this was wrote for a vsts project. To provide links to such as issues or work items and commits or tags there is a constant object called `links` in the `writer.ts` file. Just determine the link format and add another section to provide links for another source control site. Also, add the repo type in the `RepoType` enum in the `interfaces.ts` file.  


execute `--help` to see available options  


> if you dont like provided tons of command line arguments to configure the command, you can place a config section in your `package.json` or provid the configuration in a `.changelog-from-git-rc` file 

`package.json`: 
```
  "changelog-from-git": {
    "verbose": false,
    "version": "",
    "repoUrl": "",
    "repoType": "git",
    "file": "CHANGELOG.md",
    "projectName": "",
    "hideEmptyVersions": false,   
    "hideUnparsableCommit": false,
    "hideAuthorName": false,
    "hideFeatType": false,
    "hideFixType": false,
    "hidePerfType": false,
    "hideDocsType": false,
    "hideStyleType": false,
    "hideRefactorType": false,
    "hideTestType": false,
    "hideChoreType": false,
    "hideBreakingType": false,
    "hideBuildType": false,
    "hideCliType": false,
    "hideRevertType": false,  
    "hideOtherType": false
}
```

`.changelog-from-git-rc`: 
```
{
    "verbose": false,
    "version": "",
    "repoUrl": "",
    "repoType": "git",
    "file": "CHANGELOG.md",
    "projectName": "",
    "hideEmptyVersions": false,   
    "hideUnparsableCommit": false,
    "hideAuthorName": false,
    "hideFeatType": false,
    "hideFixType": false,
    "hidePerfType": false,
    "hideDocsType": false,
    "hideStyleType": false,
    "hideRefactorType": false,
    "hideTestType": false,
    "hideChoreType": false,
    "hideBreakingType": false,
    "hideBuildType": false,
    "hideCliType": false,
    "hideRevertType": false,  
    "hideOtherType": false
}
```

