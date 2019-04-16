import { gitAllCommits } from './git';
import { writeFileSync, ensureDirSync, existsSync } from 'fs-extra';
import { getMarkdown } from './writer';
import { join, dirname } from 'path';
import { IOptions, RepoType, ICommit } from './interface';
import { getOptionsFromPackage } from './package';
import * as chalkDep from 'chalk';
const chalk: chalkDep.Chalk = chalkDep.default.constructor( { enabled: true, level: 1 } );

const defaultOptions = {
    major: false,
    minor: false,
    patch: false,
    repoUrl: '',
    repoType: RepoType.git,
    file: 'CHANGELOG.md',
    version: '0.0.0'
};

const log = ( message: string ) => console.info( `[changelog-generator] => ${ message }` );

function generate ( options: IOptions = defaultOptions, commitsList: ICommit[] = null ): Promise<string>
{
    getOptionsFromPackage( options );

    if ( !options.file )
        options.file = defaultOptions.file;

    const commits = commitsList || gitAllCommits( options );
    if ( commits && commits.length < 1 )
    {
        log( 'found no commits to generate from' );
        return;
    }

    let changelogPath = join( process.cwd(), options.file );
    var changelogDirectoryPath = dirname( changelogPath );
    if ( !existsSync( changelogDirectoryPath ) )
    {
        log( `creating changelog directory at: '${ chalk.gray( changelogDirectoryPath ) }'` );
        try
        {
            ensureDirSync( changelogDirectoryPath );
        } catch ( error )
        {
            log( error );
        }

    }
    let md = getMarkdown( options, commits );

    try
    {
        writeFileSync( changelogPath, md.trim() );
    } catch ( error )
    {
        log( error );
    }

    return Promise.resolve( changelogPath );
}

export default generate;

// generate( {
//     major: false,
//     minor: false,
//     patch: false,
//     repoUrl: '',
//     repoType: RepoType.git,
//     file: './CHANGELOG.md'
// } );