import { execSync } from 'child_process';
import { from as linq } from 'linq';
import { IVersion, ICommit, WorkItem, IOptions } from './interface';
import Version from './version';

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

const SUBJECT_PATTERN_REGEX = /^(\w*)(?:\(([^)]*?)\)|):(.*?(?:\[([^\]]+?)\]|))\s*$/;
const ISSUE_REGEX = /#(\d+)(?=[^\S\r\n]|[\n|\r\n]|,)/g;
const FORMATS = {
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
    ISSUE_DELIMINATOR: 'ISSUES CLOSED:'
}
var COMMIT_DETAILS_FORMAT = `${ FORMATS.HASH }%H${ FORMATS.NL }`
    + `${ FORMATS.HASHABBREV }%h${ FORMATS.NL }`
    + `${ FORMATS.AUTHOR }%an${ FORMATS.NL }`
    + `${ FORMATS.AUTHOR_DATE }%ad${ FORMATS.NL }`
    + `${ FORMATS.AUTHOR_EMAIL }%ae${ FORMATS.NL }`
    + `${ FORMATS.COMMITTER }%cn${ FORMATS.NL }`
    + `${ FORMATS.COMMITTER_DATE }%cr${ FORMATS.NL }`
    + `${ FORMATS.COMMITTER_EMAIL }%ce${ FORMATS.NL }`
    + `${ FORMATS.SUBJECT }%s${ FORMATS.NL }`
    + `${ FORMATS.BODY }%b${ FORMATS.BODY_END }${ FORMATS.NL }`
    + `${ FORMATS.COMMIT_DETAILS_SEPARATOR }`;

class Commit implements ICommit
{
    constructor ( public hash?: string, public hashAbbrev?: string, public subject?: string,
        public body?: string, public type?: string, public category?: string, public author?: string, public authorDate?: string,
        public authorEmail?: string, public committer?: string, public committerDate?: string, public committerEmail?: string, public raw?: string, public workItems?: WorkItem[],
        public unparsable?: boolean, public tag?: string, public version?: IVersion )
    {
        if ( !workItems )
            this.workItems = new Array<WorkItem>();
    }
}

function parseInCommit ( assign: string, commit: Commit, tag: string, rawLines: string[] )
{
    let line = linq( rawLines ).firstOrDefault( l => l.startsWith( tag ) );
    if ( line )
    {
        rawLines = linq( rawLines ).where( l => l != line ).toArray();
        commit[ assign ] = line.replace( tag, '' );
    }
}

function gitClosestTag ()
{
    return execSync( 'git describe --tags --abbrev=0' ).toString();
}

function gitAllCommits ( options: IOptions )
{
    const rawGitTag = execSync( 'git tag --list' ).toString();
    var tags = rawGitTag.split( '\n' ).filter( t => t );
    let commits: Commit[] = [];

    if ( tags.length == 0 )
    {
        var newCommits = gitCommits( null, null, options.version );
        commits.push( ...newCommits );
    } else
    {
        for ( let index = 0; index < tags.length; index++ )
        {
            let latest = 'HEAD';
            let to = latest;
            let from = tags[ index ];
            var next = index + 1;
            if ( next < tags.length )
                to = tags[ index + 1 ];

            var newCommits = gitCommits( from, to, options.version );
            commits.push( ...newCommits );
        }
    }

    return commits;
}

function gitCommits ( from: string, to: string, latestVersion: string )
{
    let range = from && to ? ` ${ from }..${ to }` : '';
    const rawGitCommits = execSync( `git log${ range } -E --format=${ COMMIT_DETAILS_FORMAT }`,
        {
            maxBuffer: Number.MAX_SAFE_INTEGER
        } ).toString();

    if ( !rawGitCommits )
        return [];

    let version = to || latestVersion;
    if ( version == 'HEAD' )
        version = latestVersion;
    else
    {
        let versionRegex = /(\d+\.(\d+\.?(\d+\.?(\d+)?)))/;
        let versionMatch = versionRegex.exec( to );
        if ( versionMatch && versionMatch[ 0 ] )
            version = versionMatch[ 0 ];
    }

    let ver = new Version( version );

    const commits = rawGitCommits
        .split( FORMATS.COMMIT_DETAILS_SEPARATOR )
        .map( ( raw ) =>
        {
            if ( !raw ) return null;

            let lines = raw.split( '\n' );
            let commit = new Commit();
            commit.tag = to || latestVersion;
            commit.version = ver;

            for ( const key in FORMATS )
                raw = raw.replace( FORMATS[ key ], '' );

            commit.raw = raw;

            parseInCommit( 'hash', commit, FORMATS.HASH, lines );
            parseInCommit( 'hashAbbrev', commit, FORMATS.HASHABBREV, lines );
            parseInCommit( 'subject', commit, FORMATS.SUBJECT, lines );
            parseInCommit( 'author', commit, FORMATS.AUTHOR, lines );
            parseInCommit( 'authorDate', commit, FORMATS.AUTHOR_DATE, lines );
            parseInCommit( 'authorEmail', commit, FORMATS.AUTHOR_EMAIL, lines );
            parseInCommit( 'committer', commit, FORMATS.COMMITTER, lines );
            parseInCommit( 'committerDate', commit, FORMATS.COMMITTER_DATE, lines );
            parseInCommit( 'committerEmail', commit, FORMATS.COMMITTER_EMAIL, lines );

            if ( commit.subject )
            {
                var parsed = commit.subject.match( SUBJECT_PATTERN_REGEX );
                if ( !parsed || !parsed[ 1 ] || !parsed[ 3 ] )
                {
                    commit.unparsable = true;
                } else
                {
                    commit.type = parsed[ 1 ].toLowerCase();
                    commit.category = parsed[ 2 ] || '';
                    commit.subject = parsed[ 3 ];

                    // if last line contains text 'breaking' then set type as breaking
                    if ( parsed[ 4 ] )
                    {
                        parsed[ 4 ].toLowerCase().split( ',' ).forEach( function ( flag )
                        {
                            flag = flag.trim();

                            switch ( flag )
                            {
                                case 'breaking':
                                    commit.type = flag;
                                    break;
                            }
                        } );
                    }
                }
            }
            else
            {
                commit.unparsable = true;
            }

            let bodyStartLine = linq( lines ).firstOrDefault( l => l.startsWith( FORMATS.BODY ) );
            let bodyEndLine = linq( lines ).firstOrDefault( l => l.startsWith( FORMATS.BODY_END ) );
            if ( bodyStartLine && bodyEndLine )
            {
                let startIndex = linq( lines ).indexOf( bodyStartLine );
                let endIndex = linq( lines ).indexOf( bodyEndLine );

                let bodyLines = [];
                if ( ( endIndex + 1 ) <= lines.length )
                    bodyLines = lines.slice( startIndex, endIndex + 1 );
                else
                    bodyLines = lines.slice( startIndex, endIndex );

                bodyLines = bodyLines.map( bl => bl.replace( FORMATS.BODY, '' ).replace( FORMATS.BODY_END, '' ) );
                commit.body = bodyLines.join( '\n' );

                let tasksLines = linq( bodyLines ).where( line => line.startsWith( FORMATS.ISSUE_DELIMINATOR ) ).toArray();
                if ( tasksLines && tasksLines.length > 0 )
                {
                    commit.body = linq( bodyLines )
                        .where( line => !line.startsWith( FORMATS.ISSUE_DELIMINATOR ) )
                        .where( line => line )
                        .select( line => line.trim() )
                        .toArray()
                        .join( '\n' );

                    let tasksString = tasksLines.join( '\n' );
                    tasksString = tasksString.replace( '#171', '#171, #64 #1, #67\n' );

                    let tasks: WorkItem[] = [];
                    let match: RegExpExecArray = null;
                    while ( match = ISSUE_REGEX.exec( tasksString ) )
                    {
                        if ( match )
                            tasks.push( {
                                display: match.length > 0 ? match[ 0 ] : null,
                                id: match.length > 1 ? +match[ 1 ] : 0
                            } );
                    }
                    commit.workItems = tasks.filter( i => i.display );
                }
            }

            return commit;
        } ).filter( ( c ) => 
        {
            if ( !c )
                return false;

            return true;
        } )

    return commits;
}

export { gitAllCommits, gitCommits, gitClosestTag };