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
    .option('patch', {
    alias: 'p',
    default: false,
    required: false,
    type: "boolean"
})
    .option('major', {
    alias: 'm',
    default: false,
    required: false,
    type: "boolean"
})
    .option('minor', {
    alias: 'i',
    default: false,
    required: false,
    type: "boolean"
})
    .option('repoUrl', {
    alias: 'r',
    default: '',
    required: false,
    type: "string"
})
    .option('file', {
    alias: 'f',
    default: '',
    required: false,
    type: "string"
})
    .option('projectName', {
    alias: 'n',
    default: '',
    required: false,
    type: "string"
})
    .option('showUnparsableCommit', {
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
