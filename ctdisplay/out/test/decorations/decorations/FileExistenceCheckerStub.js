"use strict";
class FileExistenceCheckerStub {
    constructor(existenceDefaultValue = false) {
        this.existenceDefaultValue = existenceDefaultValue;
    }
    exists(path, callback) {
    }
    existsSync(path) {
        return this.existenceDefaultValue;
    }
}
exports.FileExistenceCheckerStub = FileExistenceCheckerStub;
//# sourceMappingURL=FileExistenceCheckerStub.js.map