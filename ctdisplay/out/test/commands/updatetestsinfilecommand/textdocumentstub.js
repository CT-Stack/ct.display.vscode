"use strict";
const textlinestub_1 = require('./textlinestub');
const vscode_1 = require('vscode');
class TextDocumentStub {
    constructor() {
        this.uri = new vscode_1.Uri();
    }
    save() {
        return null;
    }
    ;
    lineAt(positionOrNumberParameter) {
        if (positionOrNumberParameter && positionOrNumberParameter == "number")
            return new textlinestub_1.TextLineStub();
        else
            return new textlinestub_1.TextLineStub();
    }
    ;
    offsetAt(position) {
        return 0;
    }
    ;
    getText(range) {
        return null;
    }
    ;
    getWordRangeAtPosition(position) {
        return null;
    }
    ;
    validateRange(range) {
        return null;
    }
    ;
    validatePosition(position) {
        return null;
    }
    ;
    positionAt(offset) {
        return null;
    }
}
exports.TextDocumentStub = TextDocumentStub;
//# sourceMappingURL=textdocumentstub.js.map