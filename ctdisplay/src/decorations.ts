"use strict";
import * as vscode from "vscode";
import * as fs from "fs";

export class Decorations {

    constructor(private context: vscode.ExtensionContext, private configuration: any = vscode.workspace.getConfiguration("cticons"))
    {
        this.initializeDecorations();
    }
    
    private _passDecoration: vscode.TextEditorDecorationType;
    private _failDecoration: vscode.TextEditorDecorationType;
    private _unexecutedDecoration: vscode.TextEditorDecorationType;

    get PassDecoration(): vscode.TextEditorDecorationType{
        return this._passDecoration;
    }

    get FailDecoration(): vscode.TextEditorDecorationType{
        return this._failDecoration;
    }

    get UnexecutedDecoration(): vscode.TextEditorDecorationType{
        return this._unexecutedDecoration;
    }

    private initializeDecorations() {
        var passIconPath = this.getIconPath("passIconPath", "images\\pass.png" ) 
        this._passDecoration = vscode.window.createTextEditorDecorationType({gutterIconPath: passIconPath});
        var failIconPath = this.getIconPath("failIconPath", "images\\fail.png" ) 
        this._failDecoration = vscode.window.createTextEditorDecorationType({gutterIconPath: failIconPath});
        var unexecutedIconPath = this.getIconPath("unexecutedIconPath", "images\\unexecuted.png" ) 
        this._unexecutedDecoration = vscode.window.createTextEditorDecorationType({gutterIconPath: unexecutedIconPath});
    }

    private getIconPath(configValue: string, defaultValue: string) : string
    {
        let pathIcon: string = this.configuration.get(configValue, "");
        if (pathIcon != "") {
            if (!fs.existsSync(pathIcon)) {
                vscode.window.showWarningMessage("The file " + pathIcon + " used for" + configValue+" does not exists.");
                pathIcon = this.context.asAbsolutePath(defaultValue);
            }
        } else {
            pathIcon = this.context.asAbsolutePath(defaultValue);
        }
	    pathIcon = pathIcon.replace(/\\/g, "/");
        return pathIcon;
    }


}