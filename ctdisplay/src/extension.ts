'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Decorations} from './decorations/decorations';
import * as fs from "fs";

import {TestTransferObject} from "./contract/TestTransferObject";
import {TestResult} from "./contract/TestResult";
import {TestSetResult} from "./contract/testsetresult";
import {TestStatus} from "./contract/TestStatus";
import {ExceptionResult} from "./contract/ExceptionResult";

import {UpdateTestsInFileCommand} from "./commands/UpdateTestsInFileCommand";
import {TestDecorationPainter} from "./decorations/TestDecorationPainter";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
    var decorations = new Decorations(context);
    var testDecorationPainter = new TestDecorationPainter(decorations)

    vscode.commands.registerCommand('ctdisplay.updateTests', (testTransferObject) => {
        var updateTestsCommand = new UpdateTestsInFileCommand(testTransferObject, testDecorationPainter);
        updateTestsCommand.execute();
    });
    vscode.commands.registerTextEditorCommand('ct.run', () => {
        let testSets: TestSetResult[] = [];
        let testResults1: TestResult[] = [];
        testResults1.push(new TestResult("StationHasName", TestStatus.Pass, 14));
        testResults1.push(new TestResult("StationHasSettledName", TestStatus.Fail, 21, new ExceptionResult("Sth wrong", "NotImplementedException")));
        testResults1.push(new TestResult("StationNameCannotBeNull", TestStatus.Unexecuted, 28 ))
        let testResults2: TestResult[] = [];
        testResults2.push(new TestResult("StationNameCannotBeEmpty", TestStatus.Pass, 34));
        testResults2.push(new TestResult("StationIsInitializedWithEmptyCollectionOfNeighbours", TestStatus.Unexecuted, 40));
        testSets.push(new TestSetResult("", "/C:/Users/dariu/Source/Repos/masterthesis/MasterThesis/TimeTablePlanning.Tests/StationTest.cs", testResults1));
        testSets.push(new TestSetResult("", "/C:/Users/dariu/Source/Repos/masterthesis/MasterThesis/TimeTablePlanning.Tests/StationTest.cs", testResults2));
        var transferObject = new TestTransferObject(testSets);
        vscode.commands.executeCommand('ctdisplay.updateTests', transferObject);
    });

}

// this method is called when your extension is deactivated
export function deactivate() {
}