"use strict";
const fs = require("fs");
class FileExistenceChecker {
    exists(path, callback) {
        fs.exists(path, callback);
    }
    existsSync(path) {
        return fs.existsSync(path);
    }
}
exports.FileExistenceChecker = FileExistenceChecker;
//# sourceMappingURL=fileexistencechecker.js.map