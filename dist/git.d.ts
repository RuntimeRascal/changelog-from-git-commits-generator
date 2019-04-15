declare type WorkItem = {
    display: string;
    id: number;
};
interface ICommit {
    hash?: string;
    hashAbbrev?: string;
    subject?: string;
    body?: string;
    type?: string;
    category?: string;
    author?: string;
    authorDate?: string;
    authorEmail?: string;
    committer?: string;
    committerDate?: string;
    committerEmail?: string;
    workItems?: WorkItem[];
    raw?: string;
    unparsable?: boolean;
    tag?: string;
    version?: Version;
}
declare type version = {
    major: number;
    minor: number;
    build: number;
    revision: number;
};
declare class Version {
    _version: version;
    constructor(version?: string);
    readonly major: number;
    readonly minor: number;
    readonly build: number;
    readonly revision: number;
    valid(): boolean;
    parse(version: string): version;
    /**
     * compare this version with another
     *
     * @param {Version} version
     * @returns {number} will return 0 if both versions are equal or will be truthy or 1 if left is greater than right
     * else will return -1
     * @memberof Version
     */
    compare(version: Version): number;
    toString(): string;
}
declare class Commit implements ICommit {
    hash?: string;
    hashAbbrev?: string;
    subject?: string;
    body?: string;
    type?: string;
    category?: string;
    author?: string;
    authorDate?: string;
    authorEmail?: string;
    committer?: string;
    committerDate?: string;
    committerEmail?: string;
    raw?: string;
    workItems?: WorkItem[];
    unparsable?: boolean;
    tag?: string;
    version?: Version;
    constructor(hash?: string, hashAbbrev?: string, subject?: string, body?: string, type?: string, category?: string, author?: string, authorDate?: string, authorEmail?: string, committer?: string, committerDate?: string, committerEmail?: string, raw?: string, workItems?: WorkItem[], unparsable?: boolean, tag?: string, version?: Version);
}
declare function gitClosestTag(): string;
declare function gitAllCommits(latestVersion: string): Commit[];
declare function gitCommits(from: string, to: string, latestVersion: string): Commit[];
export { Version, version, gitAllCommits, gitCommits, Commit, ICommit, gitClosestTag };
