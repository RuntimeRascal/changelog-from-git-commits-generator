import { RepoType, IOptions } from "./interface";
import { existsSync } from "fs-extra";

function getPackageJson ()
{
    var userPackagePath = process.cwd() + '/package.json';
    if ( existsSync( userPackagePath ) )
        return require( userPackagePath );

    return null;
}

function getOptionsFromPackage ( options: IOptions )
{
    let userPackage = getPackageJson();
    if ( userPackage )
    {
        var name: string = userPackage.name;
        if ( typeof name == 'string' )
            options.projectName = name;

        if ( !options.repoUrl )
        {
            var url: string = userPackage.repository && userPackage.repository.url;
            if ( typeof url == 'string' )
                options.repoUrl = url;

            if ( options.repoUrl.startsWith( 'git+' ) )
                options.repoUrl = options.repoUrl.substring( 4 );
            if ( options.repoUrl.endsWith( '.git' ) )
                options.repoUrl = options.repoUrl.substring( 0, options.repoUrl.length - 4 );
        }

        var repotype = userPackage.repository && userPackage.repository.type;
        if ( typeof repotype !== 'undefined' )
        {
            if ( repotype in RepoType )
                options.repoType = <RepoType>repotype;
        }

        if ( userPackage.version )
            options.version = userPackage.version as string;
    }
}

export { getOptionsFromPackage };