"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var linq_1 = require("linq");
var util_1 = require("util");
var interface_1 = require("./interface");
var version_1 = __importDefault(require("./version"));
var path_1 = require("path");
var fse = __importStar(require("fs-extra"));
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
var DATE_FORMAT = 'MMM DD YYYY, h:mm a';
function getMarkdown(options, commits) {
    var content = [];
    content.push("# [" + (options.projectName || 'Project Name') + "](" + util_1.format(links[options.repoType].home, options.repoUrl) + ")    ");
    content.push("");
    var pathTofile = path_1.join(__dirname, '../', '.changelogrc');
    var types = fse.readJSONSync(pathTofile).types;
    linq_1.from(commits)
        //.where( c => !c.unparsable && c.hash != null )  // filter out unparasable
        .where(function (c) { return c.hash != null; }) // filter out unparasable
        .groupBy(function (c) { return c.version.unparsed; }) // we group by version first
        .select(function (group) { return { key: new version_1.default(group.key()), value: group.toArray() }; })
        .toArray() // so we get js array sort()
        .sort(function (a, b) { return b.key.compare(a.key); }) // sort version largest to smallest
        .forEach(function (group) {
        var thisgroupContent = [];
        // Dont write version if there are not any commits under it
        if (options.hideEmptyVersions && group.value && group.value.length <= 0)
            return;
        thisgroupContent.push("");
        var firstCommit = linq_1.from(group.value).firstOrDefault();
        var date = firstCommit && firstCommit.authorDate
            ? require('moment')(firstCommit.authorDate).format(DATE_FORMAT)
            : require('moment')((new Date()).toLocaleString()).format(DATE_FORMAT);
        thisgroupContent.push("## [" + group.key.unparsed + "](" + util_1.format(links[options.repoType].tag, options.repoUrl, group.key) + ") *( " + date + " )* ");
        var thisGroupCommitsToWrite = 0;
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
            // Test to make sure we want to print these types of commits
            var hideOption = undefined;
            for (var key_1 in options) {
                if (options.hasOwnProperty(key_1)) {
                    var regex = new RegExp(commitType.key, 'i');
                    if (regex.test(key_1)) {
                        hideOption = options[key_1];
                        break;
                    }
                }
            }
            if (hideOption)
                return;
            // Write all commits for this given type group
            thisgroupContent.push("");
            thisgroupContent.push("- ### " + commitType.name + ":");
            byTypes.forEach(function (t) {
                if (!t.unparsable) {
                    var author = '';
                    if (!options.hideAuthorName)
                        author = "*[" + t.author + "](mailto:" + t.authorEmail + ")*";
                    //author = `*<font color="cyan">[${ t.author }](${ t.authorEmail })</font>*`;
                    thisGroupCommitsToWrite = thisGroupCommitsToWrite + 1;
                    thisgroupContent.push("   - " + author + "**`(" + t.category + ")`** " + t.subject + " [" + t.hashAbbrev + "](" + util_1.format(links[options.repoType].commit, options.repoUrl, t.hash) + ")");
                    if (t.workItems && t.workItems.length > 0) {
                        if (options.repoType == interface_1.RepoType.git)
                            thisgroupContent.push('      - *CLOSES ISSUES*');
                        else
                            thisgroupContent.push('      - *LINKED WORK ITEMS*');
                        t.workItems.forEach(function (wi) {
                            thisgroupContent.push("         > - [" + wi.display + "](" + util_1.format(links[options.repoType].issue, options.repoUrl, wi.id) + ")");
                        });
                    }
                }
            });
            thisgroupContent.push("");
        });
        // Write all unparsable commits
        if (!options.hideUnparsableCommit) {
            var unparsableCommits = linq_1.from(group.value).where(function (c) { return c.unparsable; }).toArray();
            if (unparsableCommits && unparsableCommits.length > 0) {
                thisgroupContent.push("");
                thisgroupContent.push("- ### Unparsable Commits");
                unparsableCommits.forEach(function (c) {
                    // thisGroupCommitsToWrite = thisGroupCommitsToWrite + 1;
                    var rawContent = (c.subject || 'empty commit subject') + " - " + (c.body || 'empty commit body');
                    thisgroupContent.push("   - " + rawContent);
                });
            }
        }
        if (thisGroupCommitsToWrite > 0)
            content.push.apply(content, __spread(thisgroupContent));
    });
    content.push("");
    return content.join('\n');
}
exports.getMarkdown = getMarkdown;
