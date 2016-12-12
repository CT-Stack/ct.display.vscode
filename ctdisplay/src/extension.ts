'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Decorations} from './decorations/decorations';
import {TYPES} from "./TYPES";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
    var decorations = new Decorations(context);
    let points: number[];
    points = [];

        vscode.commands.registerCommand('bookmarks.toggle', () => {
        

        let line = vscode.window.activeTextEditor.selection.active.line;

    });

}

// this method is called when your extension is deactivated
export function deactivate() {
}