import * as chai from 'chai';
import { cleanup, CHANGELOG_NAME, COMMIT1, readMarkdown, SEVERAL_COMMITS } from "./helper";
import { IOptions } from '../lib/interface';
import generate from '../lib';

var expect = chai.expect;

afterEach( cleanup );

describe( 'index', () =>
{
    it( `expect '${ CHANGELOG_NAME }' to be generated when passed no options `, async () =>
    {
        let resultingFile = await generate( { file: CHANGELOG_NAME } );

        expect( resultingFile.length ).to.be.greaterThan( 0 );
    } ).timeout( 0 );

    it( `expect markdown from single commit`, async () =>
    {
        let resultingFile = await generate( { file: CHANGELOG_NAME }, [ COMMIT1 ] );
        let markdown = readMarkdown().trim();
        expect( resultingFile.length ).to.be.greaterThan( 0 );
        const index = markdown.indexOf( 'commit1' );
        expect( index > 270 ).to.be.true;
        expect( index < 280 ).to.be.true;
    } ).timeout( 0 );

    it( `expect sorted by version`, async () =>
    {
        await generate( { file: CHANGELOG_NAME }, SEVERAL_COMMITS );
        let markdown = readMarkdown().trim();
        let firstVersionTag = '[1.1.0](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.1.0)';
        let firstVersionTagIndex = markdown.indexOf( firstVersionTag );
        let secondVersionTag = '[1.0.1](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.1)';
        let secondVersionTagIndex = markdown.indexOf( secondVersionTag );
        let thirdVersionTag = '[1.0.0](https://github.com/simpert/changelog-from-git-commits-generator/tags/1.0.0)';
        let thirdVersionTagIndex = markdown.indexOf( thirdVersionTag );

        expect( firstVersionTagIndex != 0 ).to.be.true;
        expect( secondVersionTagIndex != 0 ).to.be.true;
        expect( thirdVersionTagIndex != 0 ).to.be.true;

        expect( thirdVersionTagIndex > secondVersionTagIndex ).to.be.true;
        expect( secondVersionTagIndex > firstVersionTagIndex ).to.be.true;
    } ).timeout( 0 );
} );