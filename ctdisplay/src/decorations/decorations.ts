"use strict";
import {WorkspaceConfiguration, ExtensionContext, TextEditorDecorationType, workspace} from "vscode";
import {IDecorations} from "./IDecorations";
import {IMessageDisplay} from "../usercommunication/IMessageDisplay";
import {MessageDisplay} from "../usercommunication/MessageDisplay";
import {IFileExistenceChecker}  from "../common/files/ifileexistencechecker";
import {FileExistenceChecker}  from "../common/files/fileexistencechecker";
import {DecorationCreator} from "./decorationCreator";
import {IDecorationCreator} from "./IDecorationCreator";

export class Decorations implements IDecorations {

    constructor(private context: ExtensionContext, 
                private configuration: WorkspaceConfiguration = workspace.getConfiguration("cticons"), 
                private userInformer: IMessageDisplay = new MessageDisplay(), 
                private fileExistenceChecker: IFileExistenceChecker = new FileExistenceChecker(),
                private decorationCreator: IDecorationCreator = new DecorationCreator() )
    {
        this.initializeDecorations();
    }
    
    private _passDecoration: TextEditorDecorationType;
    private _failDecoration: TextEditorDecorationType;
    private _unexecutedDecoration: TextEditorDecorationType;

    get PassDecoration(): TextEditorDecorationType{
        return this._passDecoration;
    }

    get FailDecoration(): TextEditorDecorationType{
        return this._failDecoration;
    }

    get UnexecutedDecoration(): TextEditorDecorationType{
        return this._unexecutedDecoration;
    }

    private initializeDecorations() {
        var passIconPath = this.getIconPath("passIconPath", "images\\pass.png" ) 
        this._passDecoration = this.decorationCreator.createTextEditorDecorationType({gutterIconPath: passIconPath});
        var failIconPath = this.getIconPath("failIconPath", "images\\fail.png" ) 
        this._failDecoration = this.decorationCreator.createTextEditorDecorationType({gutterIconPath: failIconPath});
        var unexecutedIconPath = this.getIconPath("unexecutedIconPath", "images\\unexecuted.png" ) 
        this._unexecutedDecoration = this.decorationCreator.createTextEditorDecorationType({gutterIconPath: unexecutedIconPath});
    }

    private getIconPath(configValue: string, defaultValue: string) : string
    {
        let pathIcon: string = this.configuration.get(configValue, "");
        if (pathIcon != "") {
            if (!this.fileExistenceChecker.existsSync(pathIcon)) {
                this.userInformer.showWarningMessage("The file " + pathIcon + " used for" + configValue+" does not exists.");
                pathIcon = this.context.asAbsolutePath(defaultValue);
            }
        } else {
            pathIcon = this.context.asAbsolutePath(defaultValue);
        }
	    pathIcon = pathIcon.replace(/\\/g, "/");
        return pathIcon;
    }


}