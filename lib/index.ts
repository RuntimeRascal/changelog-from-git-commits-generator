import { gitAllCommits } from './git';
import { pathExists, writeFileSync, ensureDirSync } from 'fs-extra';
import { from as linq } from 'linq';
import { getMarkdown } from './writer';
import { join, dirname } from 'path';
import { IOptions, RepoType } from './interface';

async function getPackageJson ()
{
    var userPackagePath = process.cwd() + '/package.json';
    if ( await pathExists( userPackagePath ) )
        return require( userPackagePath );

    return null;
}

async function generate ( options?: IOptions ): Promise<string>
{
    if ( !options )
        options = { major: false, minor: false, patch: false, repoUrl: '', repoType: RepoType.git, file: 'CHANGELOG.md' };

    let version = '0.0.0';
    let userPackage = await getPackageJson();
    if ( userPackage )
    {
        if ( !options.repoUrl )
        {
            var url: string = userPackage.repository && userPackage.repository.url;
            if ( typeof url == 'string' )
                options.repoUrl = url;

            if ( options.repoUrl.startsWith( 'git+' ) )
                options.repoUrl = options.repoUrl.substring( 4 );
            if ( options.repoUrl.endsWith( '.git' ) )
                options.repoUrl = options.repoUrl.substring( 0, options.repoUrl.length - 4 );

            var repotype = userPackage.repository && userPackage.repository.type;
            if ( typeof url == 'string' )
            {
                if ( repotype in RepoType )
                    options.repoType = repotype;
            }
        }

        if ( userPackage.version )
            version = userPackage.version;
    }

    const commits = gitAllCommits( version );
    if ( commits && commits.length < 1 )
    {
        console.log( `found no commits to generate from` );
        return;
    }

    console.log( `parsed commits gotten: ${ linq( commits ).count( c => !c.unparsable ) }` );
    console.log( `unparsable commits gotten: ${ linq( commits ).count( c => c.unparsable ) }` );

    let md = getMarkdown( options, version, commits );
    let resultingPath = join( process.cwd(), options.file );
    var resultingDir = dirname( resultingPath );
    if ( await pathExists( resultingDir ) )
    {
        writeFileSync( resultingPath, md );
    }
    else
    {
        ensureDirSync( resultingDir );
        writeFileSync( resultingPath, md );
    }

    return Promise.resolve( '' );
}

export { generate, IOptions };

//generate( { patch: false, major: false, minor: false, repoUrl: '' } );
var options = {
    major: false,
    minor: false,
    patch: false,
    repoUrl: '',
    repoType: RepoType.git,
    file: './temp/CHANGELOG.md'
};

generate( options );