import * as chai from 'chai';
import Version from '../lib/version';

var expect = chai.expect;

const versions = [
    '0',
    '1.0', // 1
    '1.1', // 2
    '1.0.0', // 3
    '1.0.1', // 4
    '1.0.0.1', // 5
    '1.0.1.2', // 6
    '1.1.1-beta', // 7
    '1.1.2-beta', // 8
    '1.1.1-beta.1', // 9
    '1.1.1-beta.2', // 10
    '1.1.1.2' // 11
];

describe( 'version', () =>
{
    it( `expect '${ versions[ 7 ] }' toString() == '1.1.1'`, async () =>
    {
        let version = new Version( versions[ 7 ] );

        expect( version.valid() ).to.be.true;
        expect( version.toString() ).to.equal( '1.1.1' );
    } ).timeout( 0 );

    it( `expect '${ versions[ 0 ] }' toString() == '0'`, async () =>
    {
        let version = new Version( versions[ 0 ] );

        expect( version.valid() ).to.be.true;
        expect( version.toString() ).to.equal( '0' );
    } ).timeout( 0 );

    it( `expect '${ versions[ 7 ] }' < '${ versions[ 8 ] }'`, async () =>
    {
        let version7 = new Version( versions[ 7 ] );
        let version8 = new Version( versions[ 8 ] );

        expect( version7.valid() ).to.be.true;
        expect( version8.valid() ).to.be.true;
        expect( version7.compare( version8 ) ).to.equal( -1 );
    } ).timeout( 0 );

    it( `expect '${ versions[ 7 ] }' < '${ versions[ 9 ] }'`, async () =>
    {
        let version7 = new Version( versions[ 7 ] );
        let version9 = new Version( versions[ 9 ] );

        expect( version7.valid() ).to.be.true;
        expect( version9.valid() ).to.be.true;
        expect( version7.compare( version9 ) ).to.equal( -1 );
    } ).timeout( 0 );

    it( `expect '${ versions[ 9 ] }' < '${ versions[ 10 ] }'`, async () =>
    {
        let version9 = new Version( versions[ 9 ] );
        let version10 = new Version( versions[ 10 ] );

        expect( version9.valid() ).to.be.true;
        expect( version10.valid() ).to.be.true;
        expect( version9.compare( version10 ) ).to.equal( -1 );
    } ).timeout( 0 );

    it( `expect '${ versions[ 10 ] }' > '${ versions[ 9 ] }'`, async () =>
    {
        let version10 = new Version( versions[ 10 ] );
        let version9 = new Version( versions[ 9 ] );

        expect( version10.valid() ).to.be.true;
        expect( version9.valid() ).to.be.true;
        expect( version10.compare( version9 ) ).to.equal( 1 );
    } ).timeout( 0 );

    it( `expect '${ versions[ 10 ] }' > '${ versions[ 11 ] }'`, async () =>
    {
        let version10 = new Version( versions[ 10 ] );
        let version11 = new Version( versions[ 11 ] );

        expect( version10.valid() ).to.be.true;
        expect( version11.valid() ).to.be.true;
        expect( version10.compare( version11 ) ).to.equal( 0 );
    } ).timeout( 0 );

} );