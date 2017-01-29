"use strict";
class MessageDisplayMock {
    constructor() {
        this._showWarningMessageCalled = false;
    }
    showInformationMessage(message, ...items) {
        return null;
    }
    showWarningMessage(message, ...items) {
        this._showWarningMessageCalled = true;
        return null;
    }
    showErrorMessage(message, ...items) {
        return null;
    }
    verifyShowWaringMessageWasCalled() {
        return this._showWarningMessageCalled;
    }
}
exports.MessageDisplayMock = MessageDisplayMock;
//# sourceMappingURL=MessageDisplayMock.js.map