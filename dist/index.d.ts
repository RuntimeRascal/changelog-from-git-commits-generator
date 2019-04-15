interface IOptions {
    patch: boolean;
    major: boolean;
    minor: boolean;
    repoUrl: string;
}
declare function generate(options?: IOptions): Promise<string>;
export { generate, IOptions };
