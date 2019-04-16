import { version, IVersion } from "./interface";
declare class Version implements IVersion {
    _version: version;
    constructor(version?: string);
    readonly major: number;
    readonly minor: number;
    readonly build: number;
    readonly revision: number;
    valid(): boolean;
    parse(version: string): version;
    compare(version: Version): number;
    toString(): string;
}
export default Version;
