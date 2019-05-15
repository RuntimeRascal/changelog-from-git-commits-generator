import { from as linq } from 'linq';
import { format } from 'util';
import { ICommit, IOptions, RepoType } from './interface';
import Version from './version';
import { resolve, join } from 'path';
import * as fse from 'fs-extra';

var links = {
    git: {
        home: `%s/blob/master/README.md`,
        tag: `%s/tags/%s`,
        issue: `%s/issues/%s`,
        commit: `%s/commit/%s`
    }, vsts: {
        home: `%s`,
        tag: `%s/_git/application?version=GT%s`,/** vsts allows projects to have multiple repos, in this string application is the repo name. TODO: need to parameterize the repo name */
        issue: `%s/_workitems/edit/%s`,
        commit: `%s/_git/application/commit/%s`
    }
}

const DATE_FORMAT = 'MMM DD YYYY, h:mm a';

function getMarkdown ( options: IOptions, commits: ICommit[] )
{
    let content: string[] = [];
    content.push( `# [${ options.projectName || 'Project Name' }](${ format( links[ options.repoType ].home, options.repoUrl ) })    ` );
    content.push( `` );

    let pathTofile = join( __dirname, '../', '.changelogrc' );
    let types = fse.readJSONSync( pathTofile ).types;

    linq( commits )
        //.where( c => !c.unparsable && c.hash != null )  // filter out unparasable
        .where( c => c.hash != null )  // filter out unparasable
        .groupBy( c => c.version.unparsed )                      // we group by version first
        .select( group => { return { key: new Version( group.key() ), value: group.toArray() } } )
        .toArray()                                      // so we get js array sort()
        .sort( ( a, b ) => b.key.compare( a.key ) )     // sort version largest to smallest
        .forEach( group =>
        {
            let thisgroupContent: string[] = [];
            // Dont write version if there are not any commits under it
            if ( options.hideEmptyVersions && group.value && group.value.length <= 0 )
                return;

            thisgroupContent.push( `` );
            let firstCommit = linq( group.value ).firstOrDefault();

            const moment = require( 'moment' );
            let date = firstCommit && firstCommit.authorDate
                ? moment( new Date( firstCommit.authorDate ) ).format( DATE_FORMAT )
                : moment().format( DATE_FORMAT );

            thisgroupContent.push( `## [${ group.key.unparsed }](${ format( links[ options.repoType ].tag, options.repoUrl, group.key.unparsed ) }) *( ${ date } )* ` );

            let thisGroupCommitsToWrite = 0;
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
                    thisgroupContent.push( `` );
                    thisgroupContent.push( `- ### ${ commitType.name }:` );

                    byTypes.forEach( t =>
                    {
                        if ( !t.unparsable )
                        {
                            let author = '';
                            if ( !options.hideAuthorName )
                                author = `*[${ t.author }](mailto:${ t.authorEmail })*`;
                            //author = `*<font color="cyan">[${ t.author }](${ t.authorEmail })</font>*`;
                            thisGroupCommitsToWrite = thisGroupCommitsToWrite + 1;
                            thisgroupContent.push( `   - ${ author }**\`(${ t.category })\`** ${ t.subject } [${ t.hashAbbrev }](${ format( links[ options.repoType ].commit, options.repoUrl, t.hash ) })` );

                            if ( !options.hideCommitBody && typeof t.body != 'undefined' && t.body.length > 0 )
                                thisgroupContent.push( `      > ${ t.body }  ` );

                            if ( t.workItems && t.workItems.length > 0 )
                            {
                                if ( options.repoType == RepoType.git )
                                    thisgroupContent.push( '      - *CLOSES ISSUES*' );
                                else
                                    thisgroupContent.push( '      - *LINKED WORK ITEMS*' );
                                t.workItems.forEach( wi =>
                                {
                                    thisgroupContent.push( `         > - [${ wi.display }](${ format( links[ options.repoType ].issue, options.repoUrl, wi.id ) })` );
                                } )
                            }
                        }
                    } );

                    thisgroupContent.push( `` );
                } );

            // Write all unparsable commits
            if ( !options.hideUnparsableCommit )
            {
                let unparsableCommits = linq( group.value ).where( c => c.unparsable ).toArray();
                if ( unparsableCommits && unparsableCommits.length > 0 )
                {
                    thisgroupContent.push( `` );
                    thisgroupContent.push( `- ### Unparsable Commits` );
                    unparsableCommits.forEach( c =>
                    {
                        // thisGroupCommitsToWrite = thisGroupCommitsToWrite + 1;
                        let rawContent = `${ c.subject || 'empty commit subject' } ${ c.body || '' }`;
                        thisgroupContent.push( `   - ${ rawContent }` );
                    } );
                }
            }

            if ( thisGroupCommitsToWrite > 0 )
                content.push( ...thisgroupContent );
        } );

    content.push( `` );

    return content.join( '\n' );
}

export { getMarkdown };