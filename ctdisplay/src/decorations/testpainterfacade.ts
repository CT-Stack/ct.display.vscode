import {TestResult} from "../contract/testresult";
import {TestStatus} from "../contract/teststatus";
import {ITestDecorationPainter} from "./ITestDecorationPainter";
import {ITestErrorPainter} from "./ITestErrorPainter";
import {IDecorations} from "../decorations/idecorations";
import {Range,TextEditor} from "vscode";
export class TestPainterFacade implements ITestDecorationPainter, ITestErrorPainter {

    constructor(private decorations: IDecorations)
    {}
    public paintTestDecorations(tests: TestResult[], testStatus: TestStatus, activeTextEditor : TextEditor)
    {        
        var ranges = this.getTestsRanges(tests);
        var decoration =  this.decorations.DecorationsCollection.get(testStatus);
        activeTextEditor.setDecorations(decoration, ranges);
    }

    public paintErrors(tests: TestResult[], activeTextEditor : TextEditor)
    {
        var ranges: Range[] = [];
        for (var index = 0; index < tests.length; index++) {
            var test = tests[index];
            if (!test.ExceptionResult) {
                continue;
            }
            var testLine = test.ExceptionResult.LineWithError;
            var decoration = new Range(testLine, 0, testLine, 0);
            ranges.push(decoration);
        }
        activeTextEditor.setDecorations(this.decorations.ExceptionDecoration, ranges);
    }

    private getTestsRanges(tests: TestResult[]) :Range[]
    {
        var ranges: Range[] = [];
        for (var index = 0; index < tests.length; index++) {
            var test = tests[index];
            var testLine = test.TestLine;
            var decoration = new Range(testLine, 0, testLine, 0);
            ranges.push(decoration);
        }        
        return ranges;
    }
}