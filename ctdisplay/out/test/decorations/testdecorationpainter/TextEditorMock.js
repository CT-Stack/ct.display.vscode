"use strict";
class TextEditorMock {
    edit(callback, options) {
        return null;
    }
    setDecorations(decorationType, rangesOrOptions) {
        this._ranges = rangesOrOptions;
    }
    lineExistsInRanges(line) {
        if (this._ranges === null)
            return false;
        return this._ranges.findIndex(e => e.start.line === line) !== undefined;
    }
    revealRange(range, revealType) { }
    show(column) { }
    hide() {
    }
}
exports.TextEditorMock = TextEditorMock;
//# sourceMappingURL=texteditormock.js.map