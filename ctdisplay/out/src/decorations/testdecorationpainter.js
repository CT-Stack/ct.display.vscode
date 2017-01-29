"use strict";
const vscode_1 = require("vscode");
class TestDecorationPainter {
    constructor(decorations) {
        this.decorations = decorations;
    }
    paintTestDecorations(tests, testStatus, activeTextEditor) {
        var ranges = this.getTestsRanges(tests);
        var decoration = this.decorations.DecorationsCollection.get(testStatus);
        activeTextEditor.setDecorations(decoration, ranges);
    }
    getTestsRanges(tests) {
        var ranges = [];
        for (var index = 0; index < tests.length; index++) {
            var test = tests[index];
            var testLine = test.TestLine;
            var decoration = new vscode_1.Range(testLine, 0, testLine, 0);
            ranges.push(decoration);
        }
        return ranges;
    }
}
exports.TestDecorationPainter = TestDecorationPainter;
//# sourceMappingURL=testdecorationpainter.js.map