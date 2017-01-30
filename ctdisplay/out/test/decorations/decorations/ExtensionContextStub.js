"use strict";
const path = require('path');
const TestConsts_1 = require('../../TestConsts');
class ExtensionContextStub {
    asAbsolutePath(relativePath) {
        return path.join(TestConsts_1.TestConsts.WorkspacePath, relativePath);
    }
}
exports.ExtensionContextStub = ExtensionContextStub;
//# sourceMappingURL=ExtensionContextStub.js.map