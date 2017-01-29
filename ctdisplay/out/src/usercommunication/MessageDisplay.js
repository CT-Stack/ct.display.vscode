"use strict";
const vscode_1 = require("vscode");
class MessageDisplay {
    showInformationMessage(message, ...items) {
        return vscode_1.window.showInformationMessage(message, ...items);
    }
    showWarningMessage(message, ...items) {
        return vscode_1.window.showWarningMessage(message, ...items);
    }
    showErrorMessage(message, ...items) {
        return vscode_1.window.showErrorMessage(message, ...items);
    }
}
exports.MessageDisplay = MessageDisplay;
//# sourceMappingURL=MessageDisplay.js.map