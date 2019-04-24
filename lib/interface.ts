export enum RepoType
{
    git,
    vsts
}

export type version = {
    major: number;
    minor: number;
    build: number;
    revision: number;
}

export type WorkItem = {
    display: string;
    id: number;
}

export interface IOptions
{
    patch?: boolean;
    major?: boolean;
    minor?: boolean;
    version?: string;
    repoUrl?: string;
    repoType?: RepoType;
    file?: string;
    projectName?: string;
    showUnparsableCommit?: boolean;
    showFeat?: boolean;
    showFix?: boolean;
    showPerf?: boolean;
    showDocs?: boolean;
    showStyle?: boolean;
    showRefactor?: boolean;
    showTest?: boolean;
    showChore?: boolean;
    showBreaking?: boolean;
    showBuild?: boolean;
    showCi?: boolean;
    showRevert?: boolean;
    showOther?: boolean;
}

export interface IVersion
{
    major: number;
    minor: number;
    build: number;
    revision: number;
    unparsed: string;
    valid (): boolean;
    parse ( version: string ): version;
    compare ( version: IVersion ): number;
    toString (): string;
}

export interface ICommit
{
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
    version?: IVersion;
}