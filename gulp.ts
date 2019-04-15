import * as gulp from 'gulp';
import chalk from 'chalk';


gulp.task( 'default', ( done ) =>
{
    console.log( chalk.bgGreenBright.bold.black( 'default gulp task => noop' ) );
    done();
} );