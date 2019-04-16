import { IVersion, ICommit, WorkItem, IOptions } from './interface';
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
    version?: IVersion;
    constructor(hash?: string, hashAbbrev?: string, subject?: string, body?: string, type?: string, category?: string, author?: string, authorDate?: string, authorEmail?: string, committer?: string, committerDate?: string, committerEmail?: string, raw?: string, workItems?: WorkItem[], unparsable?: boolean, tag?: string, version?: IVersion);
}
declare function gitClosestTag(): string;
declare function gitAllCommits(options: IOptions): Commit[];
declare function gitCommits(from: string, to: string, latestVersion: string): Commit[];
export { gitAllCommits, gitCommits, gitClosestTag };
