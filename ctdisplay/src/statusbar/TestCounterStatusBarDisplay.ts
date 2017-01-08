import { TestResult } from '../contract/testresult';
import { TestStatus } from '../contract/teststatus';
import { TestTransferObject } from '../contract/testtransferobject';
import * as vscode from 'vscode';
import { StatusBarAlignment, StatusBarItem, TextDocument } from 'vscode';
export class TestCounterStatusBarDisplay {
    
    private static _instance:TestCounterStatusBarDisplay = new TestCounterStatusBarDisplay();

    constructor(private statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(StatusBarAlignment.Left),
            private activeTextEditor: vscode.TextEditor = vscode.window.activeTextEditor)
    {
        if(TestCounterStatusBarDisplay._instance){
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        TestCounterStatusBarDisplay._instance = this;       
    } 

    public static getInstance():TestCounterStatusBarDisplay
    {
        return TestCounterStatusBarDisplay._instance;
    }   

    public updateTestCount(testTransferObject: TestTransferObject) {       
        
        if (!this.activeTextEditor) {
            this.statusBarItem.hide();
            return;
        }

        let allTests : TestResult[] = [];
        for (let setResult of testTransferObject.TestSetResults)
        {
            allTests = allTests.concat(setResult.TestResults);
        }

        let passedTests = this.takeTestsCountWithSelectedTestStatus(allTests, TestStatus.Pass);
        let failedTests = this.takeTestsCountWithSelectedTestStatus(allTests, TestStatus.Fail);       

        this.statusBarItem.text = `All Tests: ${allTests.length}    Passed: ${passedTests}    Failed: ${failedTests}`;
        this.statusBarItem.show();        
    }   

    private takeTestsCountWithSelectedTestStatus(testCollection: TestResult[],selectedTestStatus: TestStatus) : number{
        return testCollection.filter(x=>x.TestStatus === selectedTestStatus).length;
    }
}