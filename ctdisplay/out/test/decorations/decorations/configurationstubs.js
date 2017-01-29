"use strict";
class WorkspaceEmptyConfigurationStub {
    get(section, defaultValue) {
        return "";
    }
    has(section) {
        return false;
    }
}
exports.WorkspaceEmptyConfigurationStub = WorkspaceEmptyConfigurationStub;
class WorkspaceConfigurationStub {
    constructor(defaultPath = "") {
        this.defaultPath = defaultPath;
    }
    get(section, defaultValue) {
        return this.defaultPath;
    }
    has(section) {
        return false;
    }
}
exports.WorkspaceConfigurationStub = WorkspaceConfigurationStub;
//# sourceMappingURL=configurationstubs.js.map