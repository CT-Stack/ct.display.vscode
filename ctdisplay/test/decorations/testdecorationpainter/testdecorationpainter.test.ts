import * as assert from 'assert';
import {DecorationsStub} from './DecorationsStub';
import {TestDecorationPainter} from '../../../src/decorations/testdecorationpainter';
import {TestResult} from '../../../src/contract/TestResult';
import {TestStatus} from '../../../src/contract/TestStatus';
import {TextEditorMock} from "./TextEditorMock";

suite("Test decoration painter test", () => {

    test("Test lines must be the same like paint test decoration lines", () => {
        var decorations = new DecorationsStub();
        var painter = new TestDecorationPainter(decorations);
        var testResults = [];
        testResults.push(new TestResult("FirstTest", TestStatus.Pass, 20));
        testResults.push(new TestResult("Second test", TestStatus.Pass, 40));
        var textEditor = new TextEditorMock();
        painter.paintTestDecorations(testResults, TestStatus.Pass, textEditor);

        assert.equal(textEditor.lineExistsInRanges(20), true);
        assert.equal(textEditor.lineExistsInRanges(40), true);
    });
});