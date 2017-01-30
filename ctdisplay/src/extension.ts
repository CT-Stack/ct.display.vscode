'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Decorations} from './decorations/decorations';
import * as fs from 'fs';

import {TestTransferObject} from "./contract/TestTransferObject";
import {TestResult} from "./contract/TestResult";
import {TestSetResult} from "./contract/testsetresult";
import {TestStatus} from "./contract/TestStatus";
import {ExceptionResult} from "./contract/ExceptionResult";
import { TestCounterStatusBarDisplay } from './statusbar/TestCounterStatusBarDisplay';

import {UpdateTestsInFileCommand} from "./commands/UpdateTestsInFileCommand";
import {TestPainterFacade} from "./decorations/testpainterfacade";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
    var decorations = new Decorations(context);
    var testDecorationPainter = new TestPainterFacade(decorations)
    let testCounterStatusBarDisplay = TestCounterStatusBarDisplay.getInstance();
    var testTransferObject = TestTransferObject.getInstance();
    
    vscode.commands.registerCommand('ctdisplay.updateStatusBar', (testTransferObject) => {
        testCounterStatusBarDisplay.updateTestCount(testTransferObject);
    });

    vscode.commands.registerCommand('ctdisplay.updateTests', (newTestTransferObject) => {
        testTransferObject.updateTestSetResults(newTestTransferObject.TestSetResults);
        testCounterStatusBarDisplay.updateTestCount(testTransferObject);
        var updateTestsCommand = new UpdateTestsInFileCommand(testTransferObject, testDecorationPainter, testDecorationPainter);
        updateTestsCommand.execute();
    });
    vscode.commands.registerTextEditorCommand('ct.run', () => {
		vscode.commands.executeCommand("ct.runTestObserver");
    });

    vscode.window.onDidChangeActiveTextEditor((currentTextEditor: vscode.TextEditor) => {
        var updateTestsCommand = new UpdateTestsInFileCommand(testTransferObject, testDecorationPainter, testDecorationPainter);
        updateTestsCommand.execute();
    });
    vscode.window.showInformationMessage("CTDisplay is running.");
}

// this method is called when your extension is deactivated
export function deactivate() {
}