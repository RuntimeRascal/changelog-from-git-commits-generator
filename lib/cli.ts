#! /usr/bin/env node

import * as yargs from 'yargs'
import * as chalkDep from 'chalk';
import { IOptions } from './interface';
import generate from '.';
import * as findup from 'find-up';
import { readJSONSync } from 'fs-extra';

const chalk: chalkDep.Chalk = chalkDep.default.constructor( { enabled: true, level: 1 } );
const log = ( message ) => console.info( `[changelog-generator] => ${ message }` );
const error = ( message ) => console.error( `[changelog-generator] => ${ message }` );

const packageJson = require( '../package.json' );
const configPath = findup.sync( [ '.changelog-from-git-rc', '.changelog-from-git-rc.json' ] );

let builder = yargs.help()
    .showHelpOnFail( true )
    .usage( 'changelog [options]' );

if ( configPath )
    builder.config( readJSONSync( configPath ) );
else
    builder.pkgConf( 'changelog-from-git' );

let argv = builder
    .option( 'verbose',
        {
            alias: 'v',
            default: false,
            required: false,
            type: "boolean",
            description: 'Show verbose level detail in terminal output'
        } as yargs.Options )
    .option( 'version',
        {
            alias: 'ver',
            default: false,
            required: false,
            type: "string",
            description: 'Current version - will get from \'package.json\' if not provided'
        } as yargs.Options )
    .option( 'repoUrl',
        {
            alias: 'r',
            default: '',
            required: false,
            type: "string",
            description: 'Repository base url- will get from \'package.json\' if not provided'
        } as yargs.Options )
    .option( 'repoType',
        {
            default: 'git',
            //choices: [ 'git', 'vsts' ],
            required: false,
            type: "string",
            description: 'Repository type (used for generating links) - will get from \'package.json\' if not provided'
        } as yargs.Options )
    .option( 'file',
        {
            alias: 'f',
            default: 'CHANGELOG.md',
            required: false,
            type: "string",
            description: 'The output file name - can be path relative to root'
        } as yargs.Options )
    .option( 'projectName',
        {
            alias: 'n',
            default: '',
            required: false,
            type: "string",
            description: 'The project name - will get from \'package.json\' if not provided'
        } as yargs.Options )
    .option( 'hideEmptyVersions',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide entire version from output if version contains no commits'
        } as yargs.Options )
    .option( 'hideUnparsableCommit',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits that do not follow the conventonal changelog commit pattern'
        } as yargs.Options )
    .option( 'hideAuthorName',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide the author name email link from output'
        } as yargs.Options )
    .option( 'hideFeat',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Feat\' from output'
        } as yargs.Options )
    .option( 'hideFixType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Fix\' from output'
        } as yargs.Options )
    .option( 'hidePerfType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Perf\' from output'
        } as yargs.Options )
    .option( 'hideDocsType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Docs\' from output'
        } as yargs.Options )
    .option( 'hideStyleType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Style\' from output'
        } as yargs.Options )
    .option( 'hideRefactorType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Refactor\' from output'
        } as yargs.Options )
    .option( 'hideTestType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Test\' from output'
        } as yargs.Options )
    .option( 'hideChoreType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Chore\' from output'
        } as yargs.Options )
    .option( 'hideBreakingType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Breaking\' from output'
        } as yargs.Options )
    .option( 'hideBuildType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Build\' from output'
        } as yargs.Options )
    .option( 'hideCliType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Cli\' from output'
        } as yargs.Options )
    .option( 'hideRevertType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Revert\' from output'
        } as yargs.Options )
    .option( 'hideOtherType',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide commits typed as \'Other\' from output'
        } as yargs.Options )
    .option( 'hideCommitBody',
        {
            default: false,
            required: false,
            type: "boolean",
            description: 'Hide the commit body contents from output'
        } as yargs.Options )
    .epilogue( 'for more information goto: https://github.com/simpert/changelog-from-git-commits-generator or https://www.npmjs.com/package/changelog-from-git-commits-generator' )
    .version( packageJson.version )
    .example( 'changelog --file MY_CHANGELOG.md', 'Will create "MY_CHANGELOG.md" in root with all default settings' )
    .fail( ( m, e ) =>
    {
        if ( m == null && e == null )
            return;

        if ( e )
            error( e );

        log( chalk.cyan( 'Uh Oh!' ) );
        log( `${ chalk.white.bgRed( m ) }` );
        log( chalk.bold.italic.cyan( 'HELP' ) )
        log( chalk.bold.italic.cyan( '----------------------------' ) )
        yargs.showHelp();
    } ).argv;

if ( argv.verbose )
{
    log( chalk.cyan( 'Verbose mode on' ) );
    log( `${ chalk.cyan( 'argv: ' ) }${ chalk.italic.gray( JSON.stringify( argv, null, 4 ) ) }` );
}

//TODO: maybe we should make new obj of the intersection of argv and IOptions
generate( ( <unknown>argv ) as IOptions ).then( changelog =>
{
    log( `${ chalk.green( 'successfully created changelog at:' ) } '${ chalk.italic.gray( changelog ) }'` );
} );