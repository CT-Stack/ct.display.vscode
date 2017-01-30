"use strict";
const assert = require('assert');
const DecorationsStub_1 = require('./DecorationsStub');
const testpainterfacade_1 = require('../../../src/decorations/testpainterfacade');
const TestResult_1 = require('../../../src/contract/TestResult');
const TestStatus_1 = require('../../../src/contract/TestStatus');
const TextEditorMock_1 = require("./TextEditorMock");
suite("Test decoration painter test", () => {
    test("Test lines must be the same like paint test decoration lines", () => {
        var decorations = new DecorationsStub_1.DecorationsStub();
        var painter = new testpainterfacade_1.TestPainterFacade(decorations);
        var testResults = [];
        testResults.push(new TestResult_1.TestResult("FirstTest", TestStatus_1.TestStatus.Pass, 20));
        testResults.push(new TestResult_1.TestResult("Second test", TestStatus_1.TestStatus.Pass, 40));
        var textEditor = new TextEditorMock_1.TextEditorMock();
        painter.paintTestDecorations(testResults, TestStatus_1.TestStatus.Pass, textEditor);
        assert.equal(textEditor.lineExistsInRanges(20), true);
        assert.equal(textEditor.lineExistsInRanges(40), true);
    });
});
//# sourceMappingURL=testdecorationpainter.test.js.map