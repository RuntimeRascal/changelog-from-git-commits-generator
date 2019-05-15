#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var chalkDep = require("chalk");
var _1 = require(".");
var findup = require("find-up");
var fs_extra_1 = require("fs-extra");
var chalk = chalkDep.default.constructor({ enabled: true, level: 1 });
var log = function (message) { return console.info("[changelog-generator] => " + message); };
var error = function (message) { return console.error("[changelog-generator] => " + message); };
var packageJson = require('../package.json');
var configPath = findup.sync(['.changelog-from-git-rc', '.changelog-from-git-rc.json']);
var builder = yargs.help()
    .showHelpOnFail(true)
    .usage('changelog [options]');
if (configPath)
    builder.config(fs_extra_1.readJSONSync(configPath));
else
    builder.pkgConf('changelog-from-git');
var argv = builder
    .option('verbose', {
    alias: 'v',
    default: false,
    required: false,
    type: "boolean",
    description: 'Show verbose level detail in terminal output'
})
    .option('version', {
    alias: 'ver',
    default: false,
    required: false,
    type: "string",
    description: 'Current version - will get from \'package.json\' if not provided'
})
    .option('repoUrl', {
    alias: 'r',
    default: '',
    required: false,
    type: "string",
    description: 'Repository base url- will get from \'package.json\' if not provided'
})
    .option('repoType', {
    default: 'git',
    //choices: [ 'git', 'vsts' ],
    required: false,
    type: "string",
    description: 'Repository type (used for generating links) - will get from \'package.json\' if not provided'
})
    .option('file', {
    alias: 'f',
    default: 'CHANGELOG.md',
    required: false,
    type: "string",
    description: 'The output file name - can be path relative to root'
})
    .option('projectName', {
    alias: 'n',
    default: '',
    required: false,
    type: "string",
    description: 'The project name - will get from \'package.json\' if not provided'
})
    .option('hideEmptyVersions', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide entire version from output if version contains no commits'
})
    .option('hideUnparsableCommit', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits that do not follow the conventonal changelog commit pattern'
})
    .option('hideAuthorName', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide the author name email link from output'
})
    .option('hideFeat', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Feat\' from output'
})
    .option('hideFixType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Fix\' from output'
})
    .option('hidePerfType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Perf\' from output'
})
    .option('hideDocsType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Docs\' from output'
})
    .option('hideStyleType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Style\' from output'
})
    .option('hideRefactorType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Refactor\' from output'
})
    .option('hideTestType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Test\' from output'
})
    .option('hideChoreType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Chore\' from output'
})
    .option('hideBreakingType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Breaking\' from output'
})
    .option('hideBuildType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Build\' from output'
})
    .option('hideCliType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Cli\' from output'
})
    .option('hideRevertType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Revert\' from output'
})
    .option('hideOtherType', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide commits typed as \'Other\' from output'
})
    .option('hideCommitBody', {
    default: false,
    required: false,
    type: "boolean",
    description: 'Hide the commit body contents from output'
})
    .epilogue('for more information goto: https://github.com/simpert/changelog-from-git-commits-generator or https://www.npmjs.com/package/changelog-from-git-commits-generator')
    .version(packageJson.version)
    .example('changelog --file MY_CHANGELOG.md', 'Will create "MY_CHANGELOG.md" in root with all default settings')
    .fail(function (m, e) {
    if (m == null && e == null)
        return;
    if (e)
        error(e);
    log(chalk.cyan('Uh Oh!'));
    log("" + chalk.white.bgRed(m));
    log(chalk.bold.italic.cyan('HELP'));
    log(chalk.bold.italic.cyan('----------------------------'));
    yargs.showHelp();
}).argv;
if (argv.verbose) {
    log(chalk.cyan('Verbose mode on'));
    log("" + chalk.cyan('argv: ') + chalk.italic.gray(JSON.stringify(argv, null, 4)));
}
//TODO: maybe we should make new obj of the intersection of argv and IOptions
_1.default(argv).then(function (changelog) {
    log(chalk.green('successfully created changelog at:') + " '" + chalk.italic.gray(changelog) + "'");
});
