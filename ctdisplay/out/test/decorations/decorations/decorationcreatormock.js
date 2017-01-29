"use strict";
class DecorationCreatorMock {
    constructor() {
        this._list = [];
    }
    createTextEditorDecorationType(options) {
        this._list.push(options.gutterIconPath);
        return null;
    }
    checkIfPathWasUsed(path) {
        return this._list.find(x => x == path) != undefined;
    }
}
exports.DecorationCreatorMock = DecorationCreatorMock;
//# sourceMappingURL=decorationcreatormock.js.map