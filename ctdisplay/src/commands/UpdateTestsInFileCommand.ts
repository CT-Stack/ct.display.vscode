import {ICommand} from "./ICommand"
import {Decorations} from "../decorations/decorations";
import * as vscode from "vscode";
import {TestResult} from "../contract/testresult";
import {TestStatus} from "../contract/teststatus";
import {TestTransferObject} from "../contract/testTransferObject";
import {ITestDecorationPainter} from "../decorations/ITestDecorationPainter";

export class UpdateTestsInFileCommand implements ICommand{

    constructor(private testTransferObject: TestTransferObject, 
            private testDecorationPainter: ITestDecorationPainter,
            private activeTextEditor: vscode.TextEditor = vscode.window.activeTextEditor)
    {}

    public execute(): void{
        if (!this.activeTextEditor || this.isDocumentEmpty(this.activeTextEditor.document)) {
            return;
        }
        var activeEditorTests = this.filterTestSetForActiveTextEditor(this.testTransferObject);
        this.updateTestStates(activeEditorTests);
    }

    public updateTestStates(tests: TestResult[]): void {
        this.setTests(tests, TestStatus.Pass);
        this.setTests(tests, TestStatus.Fail);
        this.setTests(tests, TestStatus.Unexecuted);
    }

    private setTests(tests: TestResult[], testStatus: TestStatus)
    {
        var filteredTests = this.takeTestsWithSelectedTestStatus(tests, testStatus);
        this.testDecorationPainter.paintTestDecorations(filteredTests, testStatus, this.activeTextEditor);
    }

    private filterTestSetForActiveTextEditor(testTransferObject: TestTransferObject) : TestResult[]
    {
        throw new Error ("Not implemented");
    }

    private takeTestsWithSelectedTestStatus(testCollection: TestResult[],selectedTestStatus: TestStatus) : TestResult[]{
        return testCollection.filter(x=>x.TestStatus === selectedTestStatus);
    }

    private isDocumentEmpty(document: vscode.TextDocument) : boolean
    {
        return document.lineCount === 1 && document.lineAt(0).text === "";
    }
}