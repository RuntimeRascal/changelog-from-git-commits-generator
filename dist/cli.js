#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var chalkDep = require("chalk");
var _1 = require(".");
var chalk = chalkDep.default.constructor({ enabled: true, level: 1 });
var log = function (message) { return console.info("[changelog-generator] => " + message); };
var error = function (message) { return console.error("[changelog-generator] => " + message); };
var argv = yargs.help()
    .option('verbose', {
    alias: 'v',
    default: false,
    required: false,
    type: "boolean"
})
    .option('version', {
    alias: 'ver',
    default: false,
    required: false,
    type: "string"
})
    .option('repoUrl', {
    alias: 'r',
    default: '',
    required: false,
    type: "string"
})
    .option('repoType', {
    default: 'git',
    choices: ['git', 'vsts'],
    required: false,
    type: "string"
})
    .option('file', {
    alias: 'f',
    default: 'CHANGELOG.md',
    required: false,
    type: "string"
})
    .option('projectName', {
    alias: 'n',
    default: '',
    required: false,
    type: "string"
})
    .option('hideEmptyVersions', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideUnparsableCommit', {
    default: true,
    required: false,
    type: "boolean"
})
    .option('hideFeat', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideAuthorName', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideFixType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hidePerfType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideDocsType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideStyleType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideRefactorType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideTestType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideChoreType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideBreakingType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideBuildType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideCiType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideRevertType', {
    default: false,
    required: false,
    type: "boolean"
})
    .option('hideOtherType', {
    default: false,
    required: false,
    type: "boolean"
})
    .epilogue('for more information goto: https://github.com/simpert/lingualizer')
    .version(require('../package.json').version)
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
    log("" + chalk.cyan('argv: ') + chalk.italic.gray(JSON.stringify(argv)));
}
//TODO: maybe we should make new obj of the intersection of argv and IOptions
_1.default(argv).then(function (changelog) {
    log(chalk.green('successfully created changelog at:') + " '" + chalk.italic.gray(changelog) + "'");
});
