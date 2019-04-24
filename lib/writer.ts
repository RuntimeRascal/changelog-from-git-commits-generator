import { from as linq } from 'linq';
import { format } from 'util';
import { ICommit, IOptions } from './interface';
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
                    let key = byTypes.key();
                    let matches = types.filter( c => c.key == key );
                    if ( matches.length == 0 )
                        return;

                    let commitType = matches[ 0 ];
                    if ( typeof commitType == 'undefined' || !commitType.key )
                        return;

                    if ( commitType.key == 'feat' && !options.showFeat )
                        return;
                    if ( commitType.key == 'fix' && !options.showFix )
                        return;
                    if ( commitType.key == 'perf' && !options.showPerf )
                        return;
                    if ( commitType.key == 'docs' && !options.showDocs )
                        return;
                    if ( commitType.key == 'style' && !options.showStyle )
                        return;
                    if ( commitType.key == 'refactor' && !options.showRefactor )
                        return;
                    if ( commitType.key == 'test' && !options.showTest )
                        return;
                    if ( commitType.key == 'chore' && !options.showChore )
                        return;
                    if ( commitType.key == 'breaking' && !options.showBreaking )
                        return;
                    if ( commitType.key == 'build' && !options.showBuild )
                        return;
                    if ( commitType.key == 'ci' && !options.showCi )
                        return;
                    if ( commitType.key == 'revert' && !options.showRevert )
                        return;
                    if ( commitType.key == 'other' && !options.showOther )
                        return;

                    content.push( `` );
                    content.push( `- ### ${ commitType.name }:` );

                    byTypes.forEach( t =>
                    {
                        content.push( `   - *(${ t.category })* ${ t.subject } [${ t.hashAbbrev }](${ format( links[ options.repoType ].commit, options.repoUrl, t.hash ) })` );
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
        } );

    content.push( `` );

    return content.join( '\n' );
}

export { getMarkdown };