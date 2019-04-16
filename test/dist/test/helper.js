"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fse = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var version_1 = __importDefault(require("../lib/version"));
var root = path.join(__dirname, '../');
exports.CHANGELOG_NAME = 'TESTING_CHANGELOG.md';
function cleanup() {
    console.log(chalk_1.default.bgCyan.yellow('after hook -> delete changelog'));
    if (fse.existsSync(path.join(root, exports.CHANGELOG_NAME)))
        fse.removeSync(path.join(root, exports.CHANGELOG_NAME));
}
exports.cleanup = cleanup;
;
function readMarkdown() {
    if (fse.existsSync(path.join(root, exports.CHANGELOG_NAME)))
        return fse.readFileSync(path.join(root, exports.CHANGELOG_NAME)).toString();
}
exports.readMarkdown = readMarkdown;
;
exports.SEVERAL_COMMITS = [
    {
        "hash": "12263d4a562ea1d839532786bfdaa48fa1300b82",
        "hashAbbrev": "12263d4",
        "subject": " added Github repo support",
        "type": "chore",
        "category": "package",
        "workItems": [],
        "tag": "1.0.1",
        "version": new version_1.default('1.0.1')
    }, {
        "hash": "f4e280eb551d864315d9432a005dcb5a0a804ff1",
        "hashAbbrev": "f4e280e",
        "subject": " added a contributing document to explain the git commiting details",
        "type": "build",
        "category": "resources",
        "workItems": [],
        "tag": "1.1.0",
        "version": new version_1.default('1.1.0')
    }, {
        "hash": "4daa56ee1786cec9f4216547ce4ca0cbd439ab20",
        "hashAbbrev": "4daa56e",
        "subject": " initial project setup and git commit tooling configuration",
        "type": "build",
        "category": "scripts",
        "workItems": [],
        "tag": "1.0.0",
        "version": new version_1.default('1.0.0')
    }, {
        "hash": "ce96c490865af33bd69e212bde8c215fe4edff0d",
        "hashAbbrev": "ce96c49",
        "subject": "Initial commit",
        "workItems": [],
        "unparsable": true,
        "tag": "1.0.0",
        "version": new version_1.default('1.0.0')
    }, {
        "raw": "\n",
        "workItems": [],
        "unparsable": true,
        "tag": "1.0.0",
        "version": new version_1.default('1.0.0')
    }
];
exports.COMMIT1 = {
    "hash": "12263d4a562ea1d839532786bfdaa48fa1300b82",
    "hashAbbrev": "12263d4",
    "subject": " commit1",
    "type": "chore",
    "category": "package",
    "workItems": [],
    "tag": "2.0.0",
    "version": new version_1.default('2.0.0')
};
