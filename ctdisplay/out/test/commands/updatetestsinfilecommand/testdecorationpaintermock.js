"use strict";
class TestDecorationPainterMock {
    constructor(decorationsPainted = false) {
        this.decorationsPainted = decorationsPainted;
    }
    paintTestDecorations(tests, testStatus, activeTextEditor) {
        if (tests.length === 0)
            return;
        this.decorationsPainted = true;
        tests.forEach(test => {
            if (test.TestStatus !== testStatus) {
                this.decorationsPainted = false;
            }
        });
    }
    paintErrors(tests, activeTextEditor) {
    }
    get DecorationsPainted() {
        return this.decorationsPainted;
    }
}
exports.TestDecorationPainterMock = TestDecorationPainterMock;
//# sourceMappingURL=testdecorationpaintermock.js.map