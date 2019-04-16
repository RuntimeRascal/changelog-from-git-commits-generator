import * as fse from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { ICommit, IVersion } from '../lib/interface';
import Version from '../lib/version';

const root = path.join( __dirname, '../' );
export const CHANGELOG_NAME = 'TESTING_CHANGELOG.md';

export function cleanup ()
{
    console.log( chalk.bgCyan.yellow( 'after hook -> delete changelog' ) );

    if ( fse.existsSync( path.join( root, CHANGELOG_NAME ) ) )
        fse.removeSync( path.join( root, CHANGELOG_NAME ) );
};

export function readMarkdown (): string
{
    if ( fse.existsSync( path.join( root, CHANGELOG_NAME ) ) )
        return fse.readFileSync( path.join( root, CHANGELOG_NAME ) ).toString();
};

export const SEVERAL_COMMITS: ICommit[] = [
    {
        "hash": "12263d4a562ea1d839532786bfdaa48fa1300b82",
        "hashAbbrev": "12263d4",
        "subject": " added Github repo support",
        "type": "chore",
        "category": "package",
        "workItems": [],
        "tag": "1.0.1",
        "version": new Version( '1.0.1' )
    }, {
        "hash": "f4e280eb551d864315d9432a005dcb5a0a804ff1",
        "hashAbbrev": "f4e280e",
        "subject": " added a contributing document to explain the git commiting details",
        "type": "build",
        "category": "resources",
        "workItems": [],
        "tag": "1.1.0",
        "version": new Version( '1.1.0' )
    }, {
        "hash": "4daa56ee1786cec9f4216547ce4ca0cbd439ab20",
        "hashAbbrev": "4daa56e",
        "subject": " initial project setup and git commit tooling configuration",
        "type": "build",
        "category": "scripts",
        "workItems": [],
        "tag": "1.0.0",
        "version": new Version( '1.0.0' )
    }, {
        "hash": "ce96c490865af33bd69e212bde8c215fe4edff0d",
        "hashAbbrev": "ce96c49",
        "subject": "Initial commit",
        "workItems": [],
        "unparsable": true,
        "tag": "1.0.0",
        "version": new Version( '1.0.0' )
    }, {
        "raw": "\n",
        "workItems": [],
        "unparsable": true,
        "tag": "1.0.0",
        "version": new Version( '1.0.0' )
    } ];

export const COMMIT1: ICommit = {
    "hash": "12263d4a562ea1d839532786bfdaa48fa1300b82",
    "hashAbbrev": "12263d4",
    "subject": " commit1",
    "type": "chore",
    "category": "package",
    "workItems": [],
    "tag": "2.0.0",
    "version": new Version( '2.0.0' )
};