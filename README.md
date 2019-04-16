# Changelog From Git Commits Generator
A simple module that generates a changelog in markdown from all your projects git commits

*This project was influenced by https://github.com/lob/generate-changelog#readme*  

> There are a ton of changelog generators out there and I tried many before decideing to create one. Where others failed fort was with accomodating Azure-DevOps repositories. The generators create links to issues (work items in devops) as well links to commits and tags and such. Most generators failed to create proper links for devops. Github, bitbucket, vsts, etc. use a different url and naming to access things in the repository. Also, a bit more control on what to write to the changelog seemed rational.  

## Using
This will generate from all commmits in your repository. NOT JUST SINCE LAST TAG. There are plans to offer major, minor and patch flags to control wether to just append to the an existing file limited commits.  

Currently, the command is run from the `post-commit` `git hook`. This ensures that the changlog is always up to date.  

The hook is registered via `Husky`. I dont know much about `git` or hooks but this seems to work well.  


## Structure
- `lib/git.ts` gets all the `git` commit data from your repo.
- `lib/writer.ts` generates the changelog contents and writes it to disk
- `lib/cli.ts` generates the help and options avail on command line
