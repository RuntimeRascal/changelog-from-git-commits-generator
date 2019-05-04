import { from as linq } from 'linq';
import { format } from 'util';
import { ICommit, IOptions } from './interface';
import Version from './version';
import { resolve, join } from 'path';
import * as fse from 'fs-extra';
//import * as moment from 'moment';

var links = {
    git: {
        home: `%s/blob/master/README.md`,
        tag: `%s/tags/%s`,
        issue: `%s/issues/%s`,
        commit: `%s/commit/%s`
    }, vsts: {
        home: `%s`,
        tag: `%s/_git/application?version=GT%s`,
        issue: `%s/_workitems/edit/%s`,
        commit: `%s/_git/application/commit/%s`
    }
}

const DATE_FORMAT = 'dddd, MMMM Do YYYY, h:mm:ss a';

function getMarkdown ( options: IOptions, commits: ICommit[] )
{
    let content: string[] = [];
    content.push( `# [${ options.projectName || 'Project Name' }](${ format( links[ options.repoType ].home, options.repoUrl ) })    ` );
    content.push( `` );

    let pathTofile = join( __dirname, '../', '.changelogrc' );
    let types = fse.readJSONSync( pathTofile ).types;

    linq( commits )
        .where( c => !c.unparsable && c.hash != null )  // filter out unparasable
        .groupBy( c => c.version.unparsed )                      // we group by version first
        .select( group => { return { key: new Version( group.key() ), value: group.toArray() } } )
        .toArray()                                      // so we get js array sort()
        .sort( ( a, b ) => b.key.compare( a.key ) )     // sort version largest to smallest
        .forEach( group =>
        {
            // Dont write version if there are not any commits under it
            if ( options.hideEmptyVersions && group.value && group.value.length > 0 )
                return;

            content.push( `` );
            let firstCommit = linq( group.value ).firstOrDefault();

            let date = firstCommit && firstCommit.authorDate
                ? require( 'moment' )( firstCommit.authorDate ).format( DATE_FORMAT )
                : require( 'moment' )( ( new Date() ).toLocaleString() ).format( DATE_FORMAT );

            content.push( `## [${ group.key.unparsed }](${ format( links[ options.repoType ].tag, options.repoUrl, group.key ) }) (${ date }) ` );

            linq( group.value )
                .groupBy( commit => commit.type )       // then we group by type
                .forEach( byTypes =>
                {
                    let key = byTypes.key();
                    let matches = types.filter( c => c.key == key );
                    if ( matches.length == 0 )
                        return;

                    let commitType = matches[ 0 ];
                    if ( typeof commitType == 'undefined' || !commitType.key )
                        return;

                    // Test to make sure we want to print these types of commits
                    let hideOption = undefined;
                    for ( const key in options )
                    {
                        if ( options.hasOwnProperty( key ) )
                        {
                            let regex = new RegExp( commitType.key, 'i' );
                            if ( regex.test( key ) )
                            {
                                hideOption = options[ key ];
                                break;
                            }
                        }
                    }

                    if ( hideOption )
                        return;

                    // Write all commits for this given type group
                    content.push( `` );
                    content.push( `- ### ${ commitType.name }:` );

                    byTypes.forEach( t =>
                    {
                        content.push( `   - ${ options.hideAuthorName ? '' : '<' + t.author + '> ' }\`(${ t.category })\` ${ t.subject } [${ t.hashAbbrev }](${ format( links[ options.repoType ].commit, options.repoUrl, t.hash ) })` );
                        if ( t.workItems && t.workItems.length > 0 )
                        {
                            content.push( '   - *CLOSES*' )
                            t.workItems.forEach( wi =>
                            {
                                content.push( `      > - [${ wi.display }](${ format( links[ options.repoType ].issue, options.repoUrl, wi.id ) })` );
                            } )
                        }
                    } );
                    content.push( `` );
                } );

            // Write all unparsable commits
            if ( !options.hideUnparsableCommit )
            {
                let unparsableCommits = linq( group.value ).where( c => c.unparsable ).toArray();
                if ( unparsableCommits && unparsableCommits.length > 0 )
                {
                    content.push( `` );
                    content.push( `- ### Unparsable Commits` );
                    unparsableCommits.forEach( c =>
                    {
                        content.push( `   - ${ c.raw }` );
                    } );
                }
            }
        } );

    content.push( `` );

    return content.join( '\n' );
}

export { getMarkdown };