import { gitAllCommits } from './git';
import { writeFileSync, ensureDirSync, existsSync } from 'fs-extra';
import { getMarkdown } from './writer';
import { join, dirname } from 'path';
import { IOptions, RepoType, ICommit } from './interface';
import { getOptionsFromPackage } from './package';
import * as chalkDep from 'chalk';
const chalk: chalkDep.Chalk = chalkDep.default.constructor( { enabled: true, level: 1 } );

const defaultOptions: IOptions = {
    major: false,
    minor: false,
    patch: false,
    repoUrl: '',
    repoType: RepoType.git,
    file: 'CHANGELOG.md',
    version: '0.0.0',
    showFeat: true,
    showFix: true,
    showPerf: true,
    showDocs: true,
    showStyle: true,
    showRefactor: true,
    showTest: true,
    showChore: true,
};

const log = ( message: string ) => console.info( `[changelog-generator] => ${ message }` );

function generate ( options: IOptions = defaultOptions, commitsList: ICommit[] = null ): Promise<string>
{
    getOptionsFromPackage( options );

    //TODO: gotta be a better way to merge these 2

    //console.log( `generate args: ${ JSON.stringify( options ) }` );
    if ( !options.file ) options.file = defaultOptions.file;
    if ( !options.repoUrl ) options.repoUrl = defaultOptions.repoUrl;
    if ( !options.repoType ) options.repoType = defaultOptions.repoType;
    if ( !options.version ) options.version = defaultOptions.version;
    if ( typeof options.showFeat == 'undefined' ) options.showFeat = defaultOptions.showFeat;
    if ( typeof options.showFix == 'undefined' ) options.showFix = defaultOptions.showFix;
    if ( typeof options.showPerf == 'undefined' ) options.showPerf = defaultOptions.showPerf;
    if ( typeof options.showDocs == 'undefined' ) options.showDocs = defaultOptions.showDocs;
    if ( typeof options.showStyle == 'undefined' ) options.showStyle = defaultOptions.showStyle;
    if ( typeof options.showRefactor == 'undefined' ) options.showRefactor = defaultOptions.showRefactor;
    if ( typeof options.showTest == 'undefined' ) options.showTest = defaultOptions.showTest;
    if ( typeof options.showChore == 'undefined' ) options.showChore = defaultOptions.showChore;
    if ( typeof options.showBreaking == 'undefined' ) options.showBreaking = defaultOptions.showBreaking;
    if ( typeof options.showBuild == 'undefined' ) options.showBuild = defaultOptions.showBuild;
    if ( typeof options.showCi == 'undefined' ) options.showCi = defaultOptions.showCi;
    if ( typeof options.showRevert == 'undefined' ) options.showRevert = defaultOptions.showRevert;
    if ( typeof options.showOther == 'undefined' ) options.showOther = defaultOptions.showOther;

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

generate();