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
const ISSUE_REGEX = /#(\d+)/g;
const ISSUE_REGEX2 = /#(\d+)(?=[^\S\r\n]|[\n|\r\n]|,)/g;
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
    ISSUE_DELIMINATOR: 'ISSUES CLOSED:',
    ISSUE_DELIMINATOR2: 'Closes'
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
        commits.push( ...gitCommits( null, null, options.version, options.version ) );
    } else
    {
        const allCommits = execSync( 'git log --reverse --oneline' ).toString();
        const firstCommitLine = allCommits.split( '\n' ).filter( t => t )[ 0 ];
        const fromHash = firstCommitLine.split( ' ' )[ 0 ];

        let toTag = tags[ 0 ];
        if ( toTag ) // make sure its not empty
        {
            // push commits from first commit to the first tag
            commits.push( ...gitCommits( fromHash, toTag, '1.0.0', toTag ) );
        }

        for ( let index = 0; index < tags.length; index++ )
        {
            let version = options.version;
            let to = 'HEAD';
            let from = tags[ index ];
            var next = index + 1;
            if ( next < tags.length )
            {
                to = tags[ index + 1 ];
                version = to;
            }

            commits.push( ...gitCommits( from, to, version, to ) );
        }
    }

    commits = linq( commits ).distinct( c => c.hashAbbrev ).toArray();

    return commits;
}

function gitCommits ( from: string, to: string, latestVersion: string, tag: string )
{
    let range = from && to ? ` ${ from }..${ to }` : '';
    const rawGitCommits = execSync( `git log${ range } -E --format=${ COMMIT_DETAILS_FORMAT }`,
        {
            maxBuffer: Number.MAX_SAFE_INTEGER
        } ).toString();

    if ( !rawGitCommits )
        return [];

    // let versionRegex = /(\d+\.(\d+\.?(\d+\.?(\d+)?)))/;
    // let versionMatch = versionRegex.exec( latestVersion );
    // if ( versionMatch && versionMatch[ 0 ] )
    //     latestVersion = versionMatch[ 0 ];

    let ver = new Version( latestVersion );

    var commits: Commit[] = [];

    rawGitCommits
        .split( FORMATS.COMMIT_DETAILS_SEPARATOR )
        .forEach( ( raw ) =>
        {
            if ( !raw ) return;

            let lines = raw.split( '\n' );
            let commit = new Commit();
            commit.tag = tag;
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


                let tasksLines = linq( bodyLines )
                    .where( line => line.trim().startsWith( FORMATS.ISSUE_DELIMINATOR ) || line.trim().startsWith( FORMATS.ISSUE_DELIMINATOR2 ) )
                    .toArray();

                commit.body = linq( bodyLines )
                    .where( line => !line.trim().startsWith( FORMATS.ISSUE_DELIMINATOR ) && !line.trim().startsWith( FORMATS.ISSUE_DELIMINATOR2 ) )
                    .toArray().join( ' ' );

                let tasksString = bodyLines.join( '\n' );
                let tasks: WorkItem[] = [];
                let match: RegExpExecArray = null;
                while ( match = ISSUE_REGEX.exec( tasksString ) )
                {
                    if ( match )
                    {
                        tasks.push( {
                            display: match.length > 0 ? match[ 0 ] : null,
                            id: match.length > 1 ? +match[ 1 ] : 0
                        } );
                    }
                }
                commit.workItems = tasks.filter( i => i.display );

                if ( tasksLines && tasksLines.length > 0 )
                {
                    commit.body = linq( bodyLines )
                        .where( line => !line.trim().startsWith( FORMATS.ISSUE_DELIMINATOR && !line.trim().startsWith( FORMATS.ISSUE_DELIMINATOR2 ) ) )
                        .where( line => line )
                        .select( line => line.trim() )
                        .toArray()
                        .join( '\n' );
                }
            }
            var allready = commits.find( c => c.hashAbbrev == commit.hashAbbrev );
            if ( allready && allready.hashAbbrev )
                return;

            commits.push( commit );
        } );

    commits = commits.filter( ( c ) => 
    {
        if ( !c )
            return false;

        return true;
    } )

    return commits;
}

export { gitAllCommits, gitCommits, gitClosestTag };