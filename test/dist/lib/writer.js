"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linq_1 = require("linq");
var util_1 = require("util");
var links = {
    git: {
        home: "%s/blob/master/README.md",
        tag: "%s/tags/%s",
        issue: "%s/issues/%s",
        commit: "%s/commit/%s"
    }, vsts: {
        home: "%s/blob/master/README.md",
        tag: "%s/_git/application?version=GT%s",
        issue: "%s/_workitems/edit/%s",
        commit: "%s/_git/application/commit/%s"
    }
};
function getMarkdown(options, commits) {
    var content = [];
    content.push("# [" + (options.projectName || 'Project Name') + "](" + util_1.format(links[options.repoType].home, options.repoUrl) + ")    ");
    content.push("");
    linq_1.from(commits)
        .where(function (c) { return !c.unparsable && c.hash != null; }) // filter out unparasable
        .groupBy(function (c) { return c.version; }) // we group by version first
        .select(function (group) { return { key: group.key(), value: group.toArray() }; })
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
            content.push("");
            content.push("- ### " + byTypes.key() + ":");
            byTypes.forEach(function (t) {
                content.push("   - (" + t.category + ") " + t.subject + " [" + t.hashAbbrev + "](" + util_1.format(links[options.repoType].commit, options.repoUrl, t.hash) + ")");
                if (t.workItems && t.workItems.length > 0) {
                    t.workItems.forEach(function (wi) {
                        content.push("      > - WORK ITEM: [" + wi.display + "](" + util_1.format(links[options.repoType].issue, options.repoUrl, wi.id) + ")");
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
