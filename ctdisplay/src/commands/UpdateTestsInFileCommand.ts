import {ICommand} from "./ICommand"
import {Decorations} from "../decorations/decorations";
import * as vscode from "vscode";
import {TestResult} from "../contract/testresult";
import {TestStatus} from "../contract/teststatus";
import {TestSetResult} from "../contract/TestSetResult";
import {TestTransferObject} from "../contract/testTransferObject";
import {ITestDecorationPainter} from "../decorations/ITestDecorationPainter";
import {ITestErrorPainter} from "../decorations/itesterrorpainter";

export class UpdateTestsInFileCommand implements ICommand{

    constructor(private testTransferObject: TestTransferObject, 
            private testDecorationPainter: ITestDecorationPainter,
            private testErrorPainter: ITestErrorPainter,
            private activeTextEditor: vscode.TextEditor = vscode.window.activeTextEditor)
    {}

    public execute(): void{
        if (!this.activeTextEditor || this.isDocumentEmpty(this.activeTextEditor.document) || !this.testTransferObject) {
            return;
        }
        var activeEditorTests = this.getTestsForActiveEditor(this.testTransferObject);
        this.updateTestStates(activeEditorTests);
    }

    private updateTestStates(tests: TestResult[]): void {
        this.setTests(tests, TestStatus.Pass);
        this.setTests(tests, TestStatus.Fail);
        this.setTests(tests, TestStatus.Unexecuted);
    }

    private setTests(tests: TestResult[], testStatus: TestStatus)
    {
        var filteredTests = this.takeTestsWithSelectedTestStatus(tests, testStatus);
        this.testDecorationPainter.paintTestDecorations(filteredTests, testStatus, this.activeTextEditor);
        if (testStatus == TestStatus.Fail)
            this.testErrorPainter.paintErrors(filteredTests, this.activeTextEditor);
    }

    private getTestsForActiveEditor(testTransferObject: TestTransferObject) : TestResult[]
    {
        var filteredTestSets = testTransferObject.TestSetResults.filter(e=>e.FilePath.toUpperCase() === this.activeTextEditor.document.uri.path.toUpperCase());
        let result : TestResult[] = [];
        for (let setResult of filteredTestSets)
        {
            result = result.concat(setResult.TestResults);
        }
        return result;
    }

    private takeTestsWithSelectedTestStatus(testCollection: TestResult[],selectedTestStatus: TestStatus) : TestResult[]{
        return testCollection.filter(x=>x.TestStatus === selectedTestStatus);
    }

    private isDocumentEmpty(document: vscode.TextDocument) : boolean
    {
        return document.lineCount === 1 && document.lineAt(0).text === "";
    }
}