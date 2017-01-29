"use strict";
const vscode_1 = require("vscode");
const TestStatus_1 = require("../../../src/contract/TestStatus");
class DecorationsStub {
    constructor() {
        this._decorationsCollection = new Map();
        this._decorationsCollection.set(TestStatus_1.TestStatus.Pass, vscode_1.window.createTextEditorDecorationType({}));
        this._exceptionDecoration = vscode_1.window.createTextEditorDecorationType({});
    }
    get DecorationsCollection() {
        return this._decorationsCollection;
    }
    get ExceptionDecoration() {
        return this._exceptionDecoration;
    }
}
exports.DecorationsStub = DecorationsStub;
//# sourceMappingURL=decorationsstub.js.map