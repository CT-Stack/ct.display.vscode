"use strict";
const vscode = require("vscode");
const teststatus_1 = require("../contract/teststatus");
class UpdateTestsInFileCommand {
    constructor(testTransferObject, testDecorationPainter, testErrorPainter, activeTextEditor = vscode.window.activeTextEditor) {
        this.testTransferObject = testTransferObject;
        this.testDecorationPainter = testDecorationPainter;
        this.testErrorPainter = testErrorPainter;
        this.activeTextEditor = activeTextEditor;
    }
    execute() {
        if (!this.activeTextEditor || this.isDocumentEmpty(this.activeTextEditor.document) || !this.testTransferObject) {
            return;
        }
        var activeEditorTests = this.getTestsForActiveEditor(this.testTransferObject);
        this.updateTestStates(activeEditorTests);
    }
    updateTestStates(tests) {
        this.setTests(tests, teststatus_1.TestStatus.Pass);
        this.setTests(tests, teststatus_1.TestStatus.Fail);
        this.setTests(tests, teststatus_1.TestStatus.Unexecuted);
    }
    setTests(tests, testStatus) {
        var filteredTests = this.takeTestsWithSelectedTestStatus(tests, testStatus);
        this.testDecorationPainter.paintTestDecorations(filteredTests, testStatus, this.activeTextEditor);
        if (testStatus == teststatus_1.TestStatus.Fail)
            this.testErrorPainter.paintErrors(filteredTests, this.activeTextEditor);
    }
    getTestsForActiveEditor(testTransferObject) {
        var filteredTestSets = testTransferObject.TestSetResults.filter(e => e.FilePath.toUpperCase() === this.activeTextEditor.document.uri.path.toUpperCase());
        let result = [];
        for (let setResult of filteredTestSets) {
            result = result.concat(setResult.TestResults);
        }
        return result;
    }
    takeTestsWithSelectedTestStatus(testCollection, selectedTestStatus) {
        return testCollection.filter(x => x.TestStatus === selectedTestStatus);
    }
    isDocumentEmpty(document) {
        return document.lineCount === 1 && document.lineAt(0).text === "";
    }
}
exports.UpdateTestsInFileCommand = UpdateTestsInFileCommand;
//# sourceMappingURL=UpdateTestsInFileCommand.js.map