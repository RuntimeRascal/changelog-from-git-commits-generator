import { from as linq } from 'linq';
import { format } from 'util';
import { ICommit, IOptions } from './interface';
import Version from './version';

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

function getMarkdown ( options: IOptions, commits: ICommit[] )
{
    let content: string[] = [];
    content.push( `# [${ options.projectName || 'Project Name' }](${ format( links[ options.repoType ].home, options.repoUrl ) })    ` );
    content.push( `` );

    linq( commits )
        .where( c => !c.unparsable && c.hash != null )  // filter out unparasable
        .groupBy( c => c.version.unparsed )                      // we group by version first
        .select( group => { return { key: new Version( group.key() ), value: group.toArray() } } )
        .toArray()                                      // so we get js array sort()
        .sort( ( a, b ) => b.key.compare( a.key ) )     // sort version largest to smallest
        .forEach( group =>
        {
            let key = group.key;
            content.push( `` );
            let firstCommit = linq( group.value ).firstOrDefault();
            let date = '';
            if ( firstCommit && firstCommit.authorDate )
                date = firstCommit.authorDate;
            else
                date = ( new Date() ).toLocaleString();

            content.push( `## [${ key.unparsed }](${ format( links[ options.repoType ].tag, options.repoUrl, key ) }) (${ date }) ` );

            linq( group.value )
                .groupBy( commit => commit.type )       // then we group by type
                .forEach( byTypes =>
                {
                    content.push( `` );
                    content.push( `- ### ${ byTypes.key() }:` );

                    byTypes.forEach( t =>
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
                } );
        } );

    content.push( `` );

    return content.join( '\n' );
}

export { getMarkdown };