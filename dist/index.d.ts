import { IOptions, ICommit } from './interface';
declare function generate(options?: IOptions, commitsList?: ICommit[]): Promise<string>;
export default generate;
