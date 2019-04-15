import { from as linq } from 'linq';
import { format } from 'util';
import { ICommit, IVersion, IOptions, VersionCommitGroup } from './interface';

var links = {
    git: {
        home: `%s/blob/master/README.md`,
        tag: `%s/tags/%s`,
        issue: `%s/issues/%s`,
        commit: `%s/commit/%s`
    }, vsts: {
        home: `%s/blob/master/README.md`,
        tag: `%s/_git/application?version=GT%s`,
        issue: `%s/_workitems/edit/%s`,
        commit: `%s/_git/application/commit/%s`
    }
}

function groupBy ( list, keyGetter )
{
    const map = new Map<IVersion | string, ICommit[]>();
    list.forEach( ( item ) =>
    {
        const key = keyGetter( item );
        const collection = map.get( key );
        if ( !collection )
        {
            map.set( key, [ item ] );
        } else
        {
            collection.push( item );
        }
    } );

    let group: VersionCommitGroup[] = [];
    for ( var key of map.keys() )
        group.push( { key: key, value: map.get( key ) } );

    return group;

}

function getMarkdown ( options: IOptions, version: string, commits: ICommit[] )
{
    let content: string[] = [];
    content.push( `# ${ format( links[ options.repoType ].home, options.repoUrl ) }` );
    content.push( `` );

    // const commitsUrl = `${ repo }/_apis/git/repositories/application/commits?api-version=5.0`;
    // const diffUrl = `${ repo }/_apis/git/repositories/application/diffs/commits?api-version=5.0`;
    // const refListUrl = `${ repo }/_apis/git/repositories/application/refs?api-version=5.0`;

    let groups = groupBy( linq( commits ).where( c => !c.unparsable && c.hash != null ).toArray(), c => c.version );
    groups = groups.sort( ( a, b ) =>
    {
        return ( b.key as IVersion ).compare( a.key as IVersion );
    } )

    console.log( `keys: \n${ groups.map( g => g.key.toString() ).join( '\n' ) }` );
    groups.forEach( group =>
    {
        let key = group.key;
        // const tagUrl = `${ options.repoUrl }/_git/application?version=GT${ key }`;
        // const diffUrl = `${ options.repoUrl }/_apis/git/repositories/application/diffs/commits?baseVersion=1.0.1-second&baseVersionType=tag&targetVersion=1.0.10&targetVersionType=tag&api-version=5.0`;

        content.push( `` );
        content.push( `## [${ key }](${ format( links[ options.repoType ].tag, options.repoUrl, key ) }) (2019-04-09) ` );

        let types = groupBy( group.value, c => c.type );
        types.forEach( t =>
        {
            content.push( `` );
            content.push( `- ### ${ t.key }:` );

            t.value
                .forEach( t =>
                {
                    content.push( `   - (${ t.category }) ${ t.subject } [${ t.hashAbbrev }](${ format( links[ options.repoType ].commit, options.repoUrl, t.hash ) })` );
                    if ( t.workItems && t.workItems.length > 0 )
                    {
                        t.workItems.forEach( wi =>
                        {
                            content.push( `      > - WORK ITEM: [${ wi.display }](${ format( links[ options.repoType ].issue, options.repoUrl, wi.id ) })` );
                        } )
                    }
                } );
            content.push( `` );
        } )
    } );

    content.push( `` );

    return content.join( '\n' );
}

export { getMarkdown };