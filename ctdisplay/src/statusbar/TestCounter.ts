import { TestResult } from '../contract/testresult';
import { TestStatus } from '../contract/teststatus';
import { TestTransferObject } from '../contract/testtransferobject';
import * as vscode from 'vscode';
import { StatusBarAlignment, StatusBarItem, TextDocument } from 'vscode';
export class TestCounter {

    private _statusBarItem: StatusBarItem;

    public updateTestCount(testTransferObject: TestTransferObject) {

        if (!this._statusBarItem) {
            this._statusBarItem = vscode.window.createStatusBarItem(StatusBarAlignment.Left);
        }

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }

        let allTests : TestResult[] = [];
        for (let setResult of testTransferObject.TestSetResults)
        {
            allTests = allTests.concat(setResult.TestResults);
        }

        let passedTests = this.takeTestsCountWithSelectedTestStatus(allTests, TestStatus.Pass);
        let failedTests = this.takeTestsCountWithSelectedTestStatus(allTests, TestStatus.Fail);
        let unexecutedTests = this.takeTestsCountWithSelectedTestStatus(allTests, TestStatus.Unexecuted);

        this._statusBarItem.text = `Tests Passed: ${passedTests}, Tests Failed: ${failedTests}, Tests Unexecuted: ${unexecutedTests}`;
        this._statusBarItem.show();        
    }   

    private takeTestsCountWithSelectedTestStatus(testCollection: TestResult[],selectedTestStatus: TestStatus) : number{
        return testCollection.filter(x=>x.TestStatus === selectedTestStatus).length;
    }
}