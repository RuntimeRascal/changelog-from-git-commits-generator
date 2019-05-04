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
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var linq_1 = require("linq");
var version_1 = require("./version");
/**
    %H 	    Commit hash
    %h 	    Abbreviated commit hash
    %T  	Tree hash
    %t 	    Abbreviated tree hash
    %P 	    Parent hashes
    %p 	    Abbreviated parent hashes
    %an 	Author name
    %ae 	Author e-mail
    %ad 	Author date (format respects the --date= option)
    %ar 	Author date, relative
    %cn 	Committer name
    %ce 	Committer email
    %cd 	Committer date
    %cr 	Committer date, relative
    %s 	    Subject
*/
var SUBJECT_PATTERN_REGEX = /^(\w*)(?:\(([^)]*?)\)|):(.*?(?:\[([^\]]+?)\]|))\s*$/;
var ISSUE_REGEX = /#(\d+)/g;
var ISSUE_REGEX2 = /#(\d+)(?=[^\S\r\n]|[\n|\r\n]|,)/g;
var FORMATS = {
    NL: '%n',
    COMMIT_DETAILS_SEPARATOR: '===ENDCOMMIT===',
    HASH: '===HASH===',
    HASHABBREV: '===HASHABBREV===',
    COMMITTER: '===COMMITTER===',
    COMMITTER_DATE: '===COMMITTERDATE===',
    COMMITTER_EMAIL: '===COMMITTEREMAIL===',
    AUTHOR: '===AUTHOR===',
    AUTHOR_DATE: '===AUTHORDATE===',
    AUTHOR_EMAIL: '===AUTHOREMAIL===',
    SUBJECT: '===SUBJECT===',
    BODY: '===BODY===',
    BODY_END: '===ENDBODY===',
    ISSUE_DELIMINATOR: 'ISSUES CLOSED:',
    ISSUE_DELIMINATOR2: 'Closes'
};
var COMMIT_DETAILS_FORMAT = FORMATS.HASH + "%H" + FORMATS.NL
    + (FORMATS.HASHABBREV + "%h" + FORMATS.NL)
    + (FORMATS.AUTHOR + "%an" + FORMATS.NL)
    + (FORMATS.AUTHOR_DATE + "%ad" + FORMATS.NL)
    + (FORMATS.AUTHOR_EMAIL + "%ae" + FORMATS.NL)
    + (FORMATS.COMMITTER + "%cn" + FORMATS.NL)
    + (FORMATS.COMMITTER_DATE + "%cr" + FORMATS.NL)
    + (FORMATS.COMMITTER_EMAIL + "%ce" + FORMATS.NL)
    + (FORMATS.SUBJECT + "%s" + FORMATS.NL)
    + (FORMATS.BODY + "%b" + FORMATS.BODY_END + FORMATS.NL)
    + ("" + FORMATS.COMMIT_DETAILS_SEPARATOR);
var Commit = /** @class */ (function () {
    function Commit(hash, hashAbbrev, subject, body, type, category, author, authorDate, authorEmail, committer, committerDate, committerEmail, raw, workItems, unparsable, tag, version) {
        this.hash = hash;
        this.hashAbbrev = hashAbbrev;
        this.subject = subject;
        this.body = body;
        this.type = type;
        this.category = category;
        this.author = author;
        this.authorDate = authorDate;
        this.authorEmail = authorEmail;
        this.committer = committer;
        this.committerDate = committerDate;
        this.committerEmail = committerEmail;
        this.raw = raw;
        this.workItems = workItems;
        this.unparsable = unparsable;
        this.tag = tag;
        this.version = version;
        if (!workItems)
            this.workItems = new Array();
    }
    return Commit;
}());
function parseInCommit(assign, commit, tag, rawLines) {
    var line = linq_1.from(rawLines).firstOrDefault(function (l) { return l.startsWith(tag); });
    if (line) {
        rawLines = linq_1.from(rawLines).where(function (l) { return l != line; }).toArray();
        commit[assign] = line.replace(tag, '');
    }
}
function gitClosestTag() {
    return child_process_1.execSync('git describe --tags --abbrev=0').toString();
}
exports.gitClosestTag = gitClosestTag;
function gitAllCommits(options) {
    var rawGitTag = child_process_1.execSync('git tag --list').toString();
    var tags = rawGitTag.split('\n').filter(function (t) { return t; });
    var commits = [];
    if (tags.length == 0) {
        commits.push.apply(commits, __spread(gitCommits(null, null, options.version, options.version)));
    }
    else {
        var allCommits = child_process_1.execSync('git log --reverse --oneline').toString();
        var firstCommitLine = allCommits.split('\n').filter(function (t) { return t; })[0];
        var fromHash = firstCommitLine.split(' ')[0];
        var toTag = tags[0];
        if (toTag) // make sure its not empty
         {
            // push commits from first commit to the first tag
            commits.push.apply(commits, __spread(gitCommits(fromHash, toTag, '1.0.0', toTag)));
        }
        for (var index = 0; index < tags.length; index++) {
            var version = options.version;
            var to = 'HEAD';
            var from = tags[index];
            var next = index + 1;
            if (next < tags.length) {
                to = tags[index + 1];
                version = to;
            }
            commits.push.apply(commits, __spread(gitCommits(from, to, version, to)));
        }
    }
    return commits;
}
exports.gitAllCommits = gitAllCommits;
function gitCommits(from, to, latestVersion, tag) {
    var range = from && to ? " " + from + ".." + to : '';
    var rawGitCommits = child_process_1.execSync("git log" + range + " -E --format=" + COMMIT_DETAILS_FORMAT, {
        maxBuffer: Number.MAX_SAFE_INTEGER
    }).toString();
    if (!rawGitCommits)
        return [];
    // let versionRegex = /(\d+\.(\d+\.?(\d+\.?(\d+)?)))/;
    // let versionMatch = versionRegex.exec( latestVersion );
    // if ( versionMatch && versionMatch[ 0 ] )
    //     latestVersion = versionMatch[ 0 ];
    var ver = new version_1.default(latestVersion);
    var commits = rawGitCommits
        .split(FORMATS.COMMIT_DETAILS_SEPARATOR)
        .map(function (raw) {
        if (!raw)
            return null;
        var lines = raw.split('\n');
        var commit = new Commit();
        commit.tag = tag;
        commit.version = ver;
        for (var key in FORMATS)
            raw = raw.replace(FORMATS[key], '');
        commit.raw = raw;
        parseInCommit('hash', commit, FORMATS.HASH, lines);
        parseInCommit('hashAbbrev', commit, FORMATS.HASHABBREV, lines);
        parseInCommit('subject', commit, FORMATS.SUBJECT, lines);
        parseInCommit('author', commit, FORMATS.AUTHOR, lines);
        parseInCommit('authorDate', commit, FORMATS.AUTHOR_DATE, lines);
        parseInCommit('authorEmail', commit, FORMATS.AUTHOR_EMAIL, lines);
        parseInCommit('committer', commit, FORMATS.COMMITTER, lines);
        parseInCommit('committerDate', commit, FORMATS.COMMITTER_DATE, lines);
        parseInCommit('committerEmail', commit, FORMATS.COMMITTER_EMAIL, lines);
        if (commit.subject) {
            var parsed = commit.subject.match(SUBJECT_PATTERN_REGEX);
            if (!parsed || !parsed[1] || !parsed[3]) {
                commit.unparsable = true;
            }
            else {
                commit.type = parsed[1].toLowerCase();
                commit.category = parsed[2] || '';
                commit.subject = parsed[3];
                // if last line contains text 'breaking' then set type as breaking
                if (parsed[4]) {
                    parsed[4].toLowerCase().split(',').forEach(function (flag) {
                        flag = flag.trim();
                        switch (flag) {
                            case 'breaking':
                                commit.type = flag;
                                break;
                        }
                    });
                }
            }
        }
        else {
            commit.unparsable = true;
        }
        var bodyStartLine = linq_1.from(lines).firstOrDefault(function (l) { return l.startsWith(FORMATS.BODY); });
        var bodyEndLine = linq_1.from(lines).firstOrDefault(function (l) { return l.startsWith(FORMATS.BODY_END); });
        if (bodyStartLine && bodyEndLine) {
            var startIndex = linq_1.from(lines).indexOf(bodyStartLine);
            var endIndex = linq_1.from(lines).indexOf(bodyEndLine);
            var bodyLines = [];
            if ((endIndex + 1) <= lines.length)
                bodyLines = lines.slice(startIndex, endIndex + 1);
            else
                bodyLines = lines.slice(startIndex, endIndex);
            bodyLines = bodyLines.map(function (bl) { return bl.replace(FORMATS.BODY, '').replace(FORMATS.BODY_END, ''); });
            commit.body = bodyLines.join('\n');
            var tasksLines = linq_1.from(bodyLines)
                .where(function (line) { return line.trim().startsWith(FORMATS.ISSUE_DELIMINATOR) || line.trim().startsWith(FORMATS.ISSUE_DELIMINATOR2); })
                .toArray();
            var tasksString = bodyLines.join('\n');
            var tasks = [];
            var match = null;
            while (match = ISSUE_REGEX.exec(tasksString)) {
                if (match) {
                    tasks.push({
                        display: match.length > 0 ? match[0] : null,
                        id: match.length > 1 ? +match[1] : 0
                    });
                }
            }
            commit.workItems = tasks.filter(function (i) { return i.display; });
            if (tasksLines && tasksLines.length > 0) {
                commit.body = linq_1.from(bodyLines)
                    .where(function (line) { return !line.trim().startsWith(FORMATS.ISSUE_DELIMINATOR && !line.trim().startsWith(FORMATS.ISSUE_DELIMINATOR2)); })
                    .where(function (line) { return line; })
                    .select(function (line) { return line.trim(); })
                    .toArray()
                    .join('\n');
                //let tasksString = tasksLines.join( '\n' );
                //tasksString = tasksString.replace( '#171', '#171, #64 #1, #67\n' );
                // let tasks: WorkItem[] = [];
                // let match: RegExpExecArray = null;
                // while ( match = ISSUE_REGEX.exec( tasksString ) )
                // {
                //     if ( match )
                //     {
                //         tasks.push( {
                //             display: match.length > 0 ? match[ 0 ] : null,
                //             id: match.length > 1 ? +match[ 1 ] : 0
                //         } );
                //     }
                // }
                // commit.workItems = tasks.filter( i => i.display );
            }
        }
        return commit;
    }).filter(function (c) {
        if (!c)
            return false;
        return true;
    });
    return commits;
}
exports.gitCommits = gitCommits;
