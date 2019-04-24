import { version, IVersion } from "./interface";
declare class Version implements IVersion {
    _version: version;
    _unparsed: string;
    constructor(version?: string);
    readonly major: number;
    readonly minor: number;
    readonly build: number;
    readonly revision: number;
    readonly unparsed: string;
    valid(): boolean;
    getLeadingDigits(str: string): number;
    parse(version: string): version;
    compare(version: Version): number;
    toString(): string;
}
export default Version;
