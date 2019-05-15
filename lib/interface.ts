export enum RepoType
{
    git = 'git',
    vsts = 'vsts'
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
    verbose?: boolean;
    version?: string;
    repoUrl?: string;
    repoType?: RepoType;
    file?: string;
    projectName?: string;
    hideAuthorName?: boolean;
    hideUnparsableCommit?: boolean;
    hideEmptyVersions?: boolean;
    hideFeatType?: boolean;
    hideFixType?: boolean;
    hidePerfType?: boolean;
    hideDocsType?: boolean;
    hideStyleType?: boolean;
    hideRefactorType?: boolean;
    hideTestType?: boolean;
    hideChoreType?: boolean;
    hideBreakingType?: boolean;
    hideBuildType?: boolean;
    hideCliType?: boolean;
    hideRevertType?: boolean;
    hideOtherType?: boolean;
    hideCommitBody?: boolean;
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