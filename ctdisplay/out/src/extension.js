'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const decorations_1 = require('./decorations/decorations');
const TestTransferObject_1 = require("./contract/TestTransferObject");
const TestCounterStatusBarDisplay_1 = require('./statusbar/TestCounterStatusBarDisplay');
const UpdateTestsInFileCommand_1 = require("./commands/UpdateTestsInFileCommand");
const testpainterfacade_1 = require("./decorations/testpainterfacade");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var decorations = new decorations_1.Decorations(context);
    var testDecorationPainter = new testpainterfacade_1.TestPainterFacade(decorations);
    let testCounterStatusBarDisplay = TestCounterStatusBarDisplay_1.TestCounterStatusBarDisplay.getInstance();
    var testTransferObject = TestTransferObject_1.TestTransferObject.getInstance();
    vscode.commands.registerCommand('ctdisplay.updateStatusBar', (testTransferObject) => {
        testCounterStatusBarDisplay.updateTestCount(testTransferObject);
    });
    vscode.commands.registerCommand('ctdisplay.updateTests', (newTestTransferObject) => {
        testTransferObject.updateTestSetResults(newTestTransferObject.TestSetResults);
        testCounterStatusBarDisplay.updateTestCount(testTransferObject);
        var updateTestsCommand = new UpdateTestsInFileCommand_1.UpdateTestsInFileCommand(testTransferObject, testDecorationPainter, testDecorationPainter);
        updateTestsCommand.execute();
    });
    vscode.commands.registerTextEditorCommand('ct.run', () => {
        vscode.commands.executeCommand("ct.runTestObserver");
    });
    vscode.window.onDidChangeActiveTextEditor((currentTextEditor) => {
        var updateTestsCommand = new UpdateTestsInFileCommand_1.UpdateTestsInFileCommand(testTransferObject, testDecorationPainter, testDecorationPainter);
        updateTestsCommand.execute();
    });
    vscode.window.showInformationMessage("CTDisplay is running.");
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map