"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var git_1 = require("./git");
var fs_extra_1 = require("fs-extra");
var writer_1 = require("./writer");
var path_1 = require("path");
var interface_1 = require("./interface");
var package_1 = require("./package");
var chalkDep = require("chalk");
var chalk = chalkDep.default.constructor({ enabled: true, level: 1 });
var defaultOptions = {
    major: false,
    minor: false,
    patch: false,
    repoUrl: '',
    repoType: interface_1.RepoType.git,
    file: 'CHANGELOG.md',
    version: '0.0.0',
    showFeat: true,
    showFix: true,
    showPerf: true,
    showDocs: true,
    showStyle: true,
    showRefactor: true,
    showTest: true,
    showChore: true,
};
var log = function (message) { return console.info("[changelog-generator] => " + message); };
function generate(options, commitsList) {
    if (options === void 0) { options = defaultOptions; }
    if (commitsList === void 0) { commitsList = null; }
    package_1.getOptionsFromPackage(options);
    //TODO: gotta be a better way to merge these 2
    console.log("generate args: " + JSON.stringify(options));
    if (!options.file)
        options.file = defaultOptions.file;
    if (!options.repoUrl)
        options.repoUrl = defaultOptions.repoUrl;
    if (!options.repoType)
        options.repoType = defaultOptions.repoType;
    if (!options.version)
        options.version = defaultOptions.version;
    if (typeof options.showFeat == 'undefined')
        options.showFeat = defaultOptions.showFeat;
    if (typeof options.showFix == 'undefined')
        options.showFix = defaultOptions.showFix;
    if (typeof options.showPerf == 'undefined')
        options.showPerf = defaultOptions.showPerf;
    if (typeof options.showDocs == 'undefined')
        options.showDocs = defaultOptions.showDocs;
    if (typeof options.showStyle == 'undefined')
        options.showStyle = defaultOptions.showStyle;
    if (typeof options.showRefactor == 'undefined')
        options.showRefactor = defaultOptions.showRefactor;
    if (typeof options.showTest == 'undefined')
        options.showTest = defaultOptions.showTest;
    if (typeof options.showChore == 'undefined')
        options.showChore = defaultOptions.showChore;
    if (typeof options.showBreaking == 'undefined')
        options.showBreaking = defaultOptions.showBreaking;
    if (typeof options.showBuild == 'undefined')
        options.showBuild = defaultOptions.showBuild;
    if (typeof options.showCi == 'undefined')
        options.showCi = defaultOptions.showCi;
    if (typeof options.showRevert == 'undefined')
        options.showRevert = defaultOptions.showRevert;
    if (typeof options.showOther == 'undefined')
        options.showOther = defaultOptions.showOther;
    var commits = commitsList || git_1.gitAllCommits(options);
    if (commits && commits.length < 1) {
        log('found no commits to generate from');
        return;
    }
    var changelogPath = path_1.join(process.cwd(), options.file);
    var changelogDirectoryPath = path_1.dirname(changelogPath);
    if (!fs_extra_1.existsSync(changelogDirectoryPath)) {
        log("creating changelog directory at: '" + chalk.gray(changelogDirectoryPath) + "'");
        try {
            fs_extra_1.ensureDirSync(changelogDirectoryPath);
        }
        catch (error) {
            log(error);
        }
    }
    var md = writer_1.getMarkdown(options, commits);
    try {
        fs_extra_1.writeFileSync(changelogPath, md.trim());
    }
    catch (error) {
        log(error);
    }
    return Promise.resolve(changelogPath);
}
exports.default = generate;
generate();
