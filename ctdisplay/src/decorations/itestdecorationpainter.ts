import {TestResult} from "../contract/testresult";
import {TestStatus} from "../contract/teststatus";
import {TextEditor} from "vscode";
export interface ITestDecorationPainter {
    paintTestDecorations(tests: TestResult[], testStatus: TestStatus, activeTextEditor : TextEditor): void;
}