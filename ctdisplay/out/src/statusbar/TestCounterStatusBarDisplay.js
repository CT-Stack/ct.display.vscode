"use strict";
const teststatus_1 = require("../contract/teststatus");
const vscode = require("vscode");
const vscode_1 = require("vscode");
class TestCounterStatusBarDisplay {
    constructor(statusBarItem = vscode.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left), activeTextEditor = vscode.window.activeTextEditor) {
        this.statusBarItem = statusBarItem;
        this.activeTextEditor = activeTextEditor;
        if (TestCounterStatusBarDisplay._instance) {
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        TestCounterStatusBarDisplay._instance = this;
    }
    static getInstance() {
        return TestCounterStatusBarDisplay._instance;
    }
    updateTestCount(testTransferObject) {
        if (!this.activeTextEditor) {
            this.statusBarItem.hide();
            return;
        }
        let allTests = [];
        for (let setResult of testTransferObject.TestSetResults) {
            allTests = allTests.concat(setResult.TestResults);
        }
        let passedTests = this.takeTestsCountWithSelectedTestStatus(allTests, teststatus_1.TestStatus.Pass);
        let failedTests = this.takeTestsCountWithSelectedTestStatus(allTests, teststatus_1.TestStatus.Fail);
        this.statusBarItem.text = `All Tests: ${allTests.length}    Passed: ${passedTests}    Failed: ${failedTests}`;
        this.statusBarItem.show();
    }
    takeTestsCountWithSelectedTestStatus(testCollection, selectedTestStatus) {
        return testCollection.filter(x => x.TestStatus === selectedTestStatus).length;
    }
}
TestCounterStatusBarDisplay._instance = new TestCounterStatusBarDisplay();
exports.TestCounterStatusBarDisplay = TestCounterStatusBarDisplay;
//# sourceMappingURL=TestCounterStatusBarDisplay.js.map