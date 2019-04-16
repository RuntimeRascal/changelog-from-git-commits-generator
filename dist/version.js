"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Version = /** @class */ (function () {
    function Version(version) {
        if (version === void 0) { version = null; }
        if (version != null)
            this.parse(version.trim());
        else
            this._version = { major: -1, minor: -1, build: -1, revision: -1 };
    }
    Object.defineProperty(Version.prototype, "major", {
        get: function () { return this._version.major; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "minor", {
        get: function () { return this._version.minor; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "build", {
        get: function () { return this._version.build; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "revision", {
        get: function () { return this._version.revision; },
        enumerable: true,
        configurable: true
    });
    Version.prototype.valid = function () {
        if (this.major == -1)
            return false;
        return true;
    };
    Version.prototype.parse = function (version) {
        this._version = { major: -1, minor: -1, build: -1, revision: -1 };
        if (!version.match(/^[0-9,.]*$/g))
            return this._version;
        if (version.length > 0) {
            var tokens = version.split('.');
            this._version.major = tokens.length >= 1 ? +tokens[0] : -1;
            this._version.minor = tokens.length >= 2 ? +tokens[1] : -1;
            this._version.build = tokens.length >= 3 ? +tokens[2] : -1;
            this._version.revision = tokens.length >= 4 ? +tokens[3] : -1;
        }
        return this._version;
    };
    Version.prototype.compare = function (version) {
        if (this.major > version.major) {
            return 1;
        }
        else if (this.major == version.major) {
            if (this.minor > version.minor) {
                return 1;
            }
            else if (this.minor == version.minor) {
                if (this.build > version.build) {
                    return 1;
                }
                else if (this.build == version.build) {
                    if (this.revision > version.revision) {
                        return 1;
                    }
                    else if (this.revision == version.revision) {
                        return 0;
                    }
                    else {
                        return -1;
                    }
                }
                else {
                    return -1;
                }
            }
            else {
                return -1;
            }
        }
        else {
            return -1;
        }
    };
    Version.prototype.toString = function () {
        if (this.revision != -1)
            return this.major + "." + this.minor + "." + this.build + "." + this.revision;
        if (this.build != -1)
            return this.major + "." + this.minor + "." + this.build;
        if (this.minor != -1)
            return this.major + "." + this.minor;
        if (this.major != -1)
            return "" + this.major;
        return '0.0.0';
    };
    return Version;
}());
exports.default = Version;
