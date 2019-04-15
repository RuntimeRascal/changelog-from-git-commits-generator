"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var linq_1 = require("linq");
function getRemoteCommitLink(repo, hash) {
    /**
     * https://dev.azure.com/{organization}/{project}/_apis/git/repositories/{repositoryId}/commits?searchCriteria.historyMode={searchCriteria.historyMode}&searchCriteria.includePushData={searchCriteria.includePushData}&searchCriteria.includeUserImageUrl={searchCriteria.includeUserImageUrl}&searchCriteria.includeWorkItems={searchCriteria.includeWorkItems}&searchCriteria.includeLinks={searchCriteria.includeLinks}&searchCriteria.$top={searchCriteria.$top}&searchCriteria.$skip={searchCriteria.$skip}&searchCriteria.excludeDeletes={searchCriteria.excludeDeletes}&searchCriteria.itemPath={searchCriteria.itemPath}&searchCriteria.author={searchCriteria.author}&searchCriteria.user={searchCriteria.user}&searchCriteria.toCommitId={searchCriteria.toCommitId}&searchCriteria.fromCommitId={searchCriteria.fromCommitId}&searchCriteria.compareVersion.versionOptions={searchCriteria.compareVersion.versionOptions}&searchCriteria.compareVersion.version={searchCriteria.compareVersion.version}&searchCriteria.compareVersion.versionType={searchCriteria.compareVersion.versionType}&searchCriteria.itemVersion.versionOptions={searchCriteria.itemVersion.versionOptions}&searchCriteria.itemVersion.version={searchCriteria.itemVersion.version}&searchCriteria.itemVersion.versionType={searchCriteria.itemVersion.versionType}&searchCriteria.toDate={searchCriteria.toDate}&searchCriteria.fromDate={searchCriteria.fromDate}&searchCriteria.ids={searchCriteria.ids}&api-version=5.0
     */
    return repo + "/_git/application/commit/" + hash;
}
function getWorkItemLink(repo, id) {
    /**
     * https://dev.azure.com/{organization}/{project}/_workitems/edit/170
     */
    return repo + "/_workitems/edit/" + id.toString();
}
function groupBy(list, keyGetter) {
    var e_1, _a;
    var map = new Map();
    list.forEach(function (item) {
        var key = keyGetter(item);
        var collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        }
        else {
            collection.push(item);
        }
    });
    var group = [];
    try {
        for (var _b = __values(map.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            group.push({ key: key, value: map.get(key) });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return group;
}
function getMarkdown(repo, version, commits) {
    var content = [];
    // const commitsUrl = `${ repo }/_apis/git/repositories/application/commits?api-version=5.0`;
    // const diffUrl = `${ repo }/_apis/git/repositories/application/diffs/commits?api-version=5.0`;
    // const refListUrl = `${ repo }/_apis/git/repositories/application/refs?api-version=5.0`;
    var groups = groupBy(linq_1.from(commits).where(function (c) { return !c.unparsable && c.hash != null; }).toArray(), function (c) { return c.version; });
    groups = groups.sort(function (a, b) {
        return b.key.compare(a.key);
    });
    console.log("keys: \n" + groups.map(function (g) { return g.key.toString(); }).join('\n'));
    groups.forEach(function (group) {
        var key = group.key;
        var tagUrl = repo + "/_git/application?version=GT" + key;
        var diffUrl = repo + "/_apis/git/repositories/application/diffs/commits?baseVersion=1.0.1-second&baseVersionType=tag&targetVersion=1.0.10&targetVersionType=tag&api-version=5.0";
        content.push("");
        content.push("## [" + key + "](" + tagUrl + ") (2019-04-09) ");
        var types = groupBy(group.value, function (c) { return c.type; });
        types.forEach(function (t) {
            content.push("");
            content.push("- ### " + t.key + ":");
            t.value
                .forEach(function (t) {
                content.push("   - (" + t.category + ") " + t.subject + " [" + t.hashAbbrev + "](" + getRemoteCommitLink(repo, t.hash) + ")");
                if (t.workItems && t.workItems.length > 0) {
                    t.workItems.forEach(function (wi) {
                        content.push("      > - WORK ITEM: [" + wi.display + "](" + getWorkItemLink(repo, wi.id) + ")");
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
