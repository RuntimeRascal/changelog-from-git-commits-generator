"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linq_1 = require("linq");
var util_1 = require("util");
var version_1 = require("./version");
var path_1 = require("path");
var fse = require("fs-extra");
var links = {
    git: {
        home: "%s/blob/master/README.md",
        tag: "%s/tags/%s",
        issue: "%s/issues/%s",
        commit: "%s/commit/%s"
    }, vsts: {
        home: "%s",
        tag: "%s/_git/application?version=GT%s",
        issue: "%s/_workitems/edit/%s",
        commit: "%s/_git/application/commit/%s"
    }
};
function getMarkdown(options, commits) {
    var content = [];
    content.push("# [" + (options.projectName || 'Project Name') + "](" + util_1.format(links[options.repoType].home, options.repoUrl) + ")    ");
    content.push("");
    var pathTofile = path_1.join(__dirname, '../', '.changelogrc');
    var types = fse.readJSONSync(pathTofile).types;
    linq_1.from(commits)
        .where(function (c) { return !c.unparsable && c.hash != null; }) // filter out unparasable
        .groupBy(function (c) { return c.version.unparsed; }) // we group by version first
        .select(function (group) { return { key: new version_1.default(group.key()), value: group.toArray() }; })
        .toArray() // so we get js array sort()
        .sort(function (a, b) { return b.key.compare(a.key); }) // sort version largest to smallest
        .forEach(function (group) {
        var key = group.key;
        content.push("");
        var firstCommit = linq_1.from(group.value).firstOrDefault();
        var date = '';
        if (firstCommit && firstCommit.authorDate)
            date = firstCommit.authorDate;
        else
            date = (new Date()).toLocaleString();
        content.push("## [" + key.unparsed + "](" + util_1.format(links[options.repoType].tag, options.repoUrl, key) + ") (" + date + ") ");
        linq_1.from(group.value)
            .groupBy(function (commit) { return commit.type; }) // then we group by type
            .forEach(function (byTypes) {
            var key = byTypes.key();
            var matches = types.filter(function (c) { return c.key == key; });
            if (matches.length == 0)
                return;
            var commitType = matches[0];
            if (typeof commitType == 'undefined' || !commitType.key)
                return;
            if (commitType.key == 'feat' && !options.showFeat)
                return;
            if (commitType.key == 'fix' && !options.showFix)
                return;
            if (commitType.key == 'perf' && !options.showPerf)
                return;
            if (commitType.key == 'docs' && !options.showDocs)
                return;
            if (commitType.key == 'style' && !options.showStyle)
                return;
            if (commitType.key == 'refactor' && !options.showRefactor)
                return;
            if (commitType.key == 'test' && !options.showTest)
                return;
            if (commitType.key == 'chore' && !options.showChore)
                return;
            if (commitType.key == 'breaking' && !options.showBreaking)
                return;
            if (commitType.key == 'build' && !options.showBuild)
                return;
            if (commitType.key == 'ci' && !options.showCi)
                return;
            if (commitType.key == 'revert' && !options.showRevert)
                return;
            if (commitType.key == 'other' && !options.showOther)
                return;
            content.push("");
            content.push("- ### " + commitType.name + ":");
            byTypes.forEach(function (t) {
                content.push("   - `(" + t.category + ")` " + t.subject + " [" + t.hashAbbrev + "](" + util_1.format(links[options.repoType].commit, options.repoUrl, t.hash) + ")");
                if (t.workItems && t.workItems.length > 0) {
                    content.push('   - *CLOSES*');
                    t.workItems.forEach(function (wi) {
                        content.push("      > - [" + wi.display + "](" + util_1.format(links[options.repoType].issue, options.repoUrl, wi.id) + ")");
                    });
                }
            });
            content.push("");
        });
    });
    content.push("");
    return content.join('\n');
}
exports.getMarkdown = getMarkdown;
