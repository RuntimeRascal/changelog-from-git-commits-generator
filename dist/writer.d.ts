import { Commit } from "./git";
declare function getMarkdown(repo: string, version: string, commits: Commit[]): string;
export { getMarkdown };
