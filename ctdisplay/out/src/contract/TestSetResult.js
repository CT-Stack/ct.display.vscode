"use strict";
class TestSetResult {
    constructor(setName, filePath, testResults = []) {
        this.setName = setName;
        this.filePath = filePath;
        this.testResults = testResults;
    }
    get SetName() {
        return this.setName;
    }
    get FilePath() {
        return this.filePath;
    }
    get TestResults() {
        return this.testResults;
    }
}
exports.TestSetResult = TestSetResult;
//# sourceMappingURL=TestSetResult.js.map