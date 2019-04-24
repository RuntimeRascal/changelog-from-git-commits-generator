#! /usr/bin/env node

import * as yargs from 'yargs'
import * as chalkDep from 'chalk';
import { IOptions } from './interface';
import generate from '.';

const chalk: chalkDep.Chalk = chalkDep.default.constructor( { enabled: true, level: 1 } );
const log = ( message ) => console.info( `[changelog-generator] => ${ message }` );
const error = ( message ) => console.error( `[changelog-generator] => ${ message }` );

let argv = yargs.help()
    .option( 'verbose',
        {
            alias: 'v',
            default: false,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'patch',
        {
            alias: 'p',
            default: false,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'major',
        {
            alias: 'm',
            default: false,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'minor',
        {
            alias: 'i',
            default: false,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'repoUrl',
        {
            alias: 'r',
            default: '',
            required: false,
            type: "string"
        } as yargs.Options )
    .option( 'file',
        {
            alias: 'f',
            default: '',
            required: false,
            type: "string"
        } as yargs.Options )
    .option( 'projectName',
        {
            alias: 'n',
            default: '',
            required: false,
            type: "string"
        } as yargs.Options )
    .option( 'showUnparsableCommit',
        {
            default: false,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showFeat',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showFix',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showPerf',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showDocs',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showStyle',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showRefactor',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showTest',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showChore',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showBreaking',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showBuild',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showCi',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showRevert',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .option( 'showOther',
        {
            default: true,
            required: false,
            type: "boolean"
        } as yargs.Options )
    .epilogue( 'for more information goto: https://github.com/simpert/lingualizer' )
    .version( require( '../package.json' ).version )
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
    log( `${ chalk.cyan( 'argv: ' ) }${ chalk.italic.gray( JSON.stringify( argv ) ) }` );
}

//TODO: maybe we should make new obj of the intersection of argv and IOptions
generate( ( <unknown>argv ) as IOptions ).then( changelog =>
{
    log( `${ chalk.green( 'successfully created changelog at:' ) } '${ chalk.italic.gray( changelog ) }'` );
} );