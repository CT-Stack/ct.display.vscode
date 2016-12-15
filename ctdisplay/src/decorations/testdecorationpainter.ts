import {TestResult} from "../contract/testresult";
import {TestStatus} from "../contract/teststatus";
import {ITestDecorationPainter} from "./ITestDecorationPainter";
import {IDecorations} from "../decorations/idecorations";
import {Range,TextEditor} from "vscode";
export class TestDecorationPainter implements ITestDecorationPainter {

    constructor(private decorations: IDecorations)
    {}
    public paintTestDecorations(tests: TestResult[], testStatus: TestStatus, activeTextEditor : TextEditor)
    {        
        var ranges = this.getTestsRanges(tests);
        var decoration =  this.decorations.DecorationsCollection.get(testStatus);
        activeTextEditor.setDecorations(decoration, ranges);
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