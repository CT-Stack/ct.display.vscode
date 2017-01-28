import {TestResult} from "../contract/testresult";
import {TestStatus} from "../contract/teststatus";
import {TextEditor} from "vscode";
export interface ITestErrorPainter {
    paintErrors(tests: TestResult[], activeTextEditor : TextEditor): void;
}