'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Decorations} from './decorations';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
    function updateDecorations(bookmarkDecorationType: vscode.TextEditorDecorationType, linesWithTest: number[]) {
        var activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        
        var books: vscode.Range[] = [];
		// Remove all bookmarks if active file is empty
		if (activeEditor.document.lineCount === 1 && activeEditor.document.lineAt(0).text === "") {
			linesWithTest = [];
		} else {
            for (var index = 0; index < linesWithTest.length; index++) {
                var element = linesWithTest[index];

                var decoration = new vscode.Range(element, 0, element, 0);
                books.push(decoration);
            }
        }
        activeEditor.setDecorations(bookmarkDecorationType, books);
    }

export function activate(context: vscode.ExtensionContext) {
    var decorations = new Decorations(context);
    var decorationType = decorations.UnexecutedDecoration;
    let points: number[];
    points = [];

        vscode.commands.registerCommand('bookmarks.toggle', () => {
        

        let line = vscode.window.activeTextEditor.selection.active.line;

        let index = points.indexOf(line);
        if (index < 0) {
            points.push(line);
        }
		
        // sorted
        var itemsSorted = [] = points.sort((n1, n2) => {
            if (n1 > n2) {
                return 1;
            }

            if (n1 < n2) {
                return -1;
            }

            return 0;
        });

        updateDecorations(decorationType, points);
    });

}

// this method is called when your extension is deactivated
export function deactivate() {
}