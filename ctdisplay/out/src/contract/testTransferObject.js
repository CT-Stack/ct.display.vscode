"use strict";
class TestTransferObject {
    constructor(testSetResults) {
        this.testSetResults = testSetResults;
        if (TestTransferObject.instance) {
            throw new Error("Error: Instantiation failed: Use TestTransferObject.getInstance() instead of new.");
        }
        TestTransferObject.instance = this;
    }
    static getInstance() {
        return TestTransferObject.instance;
    }
    get TestSetResults() {
        return this.testSetResults;
    }
    updateTestSetResults(newTestSetResults) {
        this.testSetResults = newTestSetResults;
    }
}
TestTransferObject.instance = new TestTransferObject([]);
exports.TestTransferObject = TestTransferObject;
//# sourceMappingURL=testTransferObject.js.map