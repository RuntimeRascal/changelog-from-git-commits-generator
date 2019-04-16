"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var fs_extra_1 = require("fs-extra");
function getPackageJson() {
    var userPackagePath = process.cwd() + '/package.json';
    if (fs_extra_1.existsSync(userPackagePath))
        return require(userPackagePath);
    return null;
}
function getOptionsFromPackage(options) {
    var userPackage = getPackageJson();
    if (userPackage) {
        var name = userPackage.name;
        if (typeof name == 'string')
            options.projectName = name;
        if (!options.repoUrl) {
            var url = userPackage.repository && userPackage.repository.url;
            if (typeof url == 'string')
                options.repoUrl = url;
            if (options.repoUrl.startsWith('git+'))
                options.repoUrl = options.repoUrl.substring(4);
            if (options.repoUrl.endsWith('.git'))
                options.repoUrl = options.repoUrl.substring(0, options.repoUrl.length - 4);
        }
        var repotype = userPackage.repository && userPackage.repository.type;
        if (typeof repotype !== 'undefined') {
            if (repotype in interface_1.RepoType)
                options.repoType = repotype;
        }
        if (userPackage.version)
            options.version = userPackage.version;
    }
}
exports.getOptionsFromPackage = getOptionsFromPackage;
