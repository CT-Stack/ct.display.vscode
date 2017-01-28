"use strict";
import {WorkspaceConfiguration, ExtensionContext, TextEditorDecorationType, workspace} from "vscode";
import {IDecorations} from "./IDecorations";
import {IMessageDisplay} from "../usercommunication/IMessageDisplay";
import {MessageDisplay} from "../usercommunication/MessageDisplay";
import {IFileExistenceChecker}  from "../common/files/ifileexistencechecker";
import {FileExistenceChecker}  from "../common/files/fileexistencechecker";
import {DecorationCreator} from "./decorationCreator";
import {IDecorationCreator} from "./IDecorationCreator";
import { TestStatus} from "../contract/TestStatus";

export class Decorations implements IDecorations {

    constructor(private context: ExtensionContext, 
                private configuration: WorkspaceConfiguration = workspace.getConfiguration("cticons"), 
                private userInformer: IMessageDisplay = new MessageDisplay(), 
                private fileExistenceChecker: IFileExistenceChecker = new FileExistenceChecker(),
                private decorationCreator: IDecorationCreator = new DecorationCreator() )
    {
        this._decorationsCollection = new Map<TestStatus, TextEditorDecorationType>();
        this.initializeDecorations();
    }
    
    private _decorationsCollection : Map<TestStatus, TextEditorDecorationType>;
    private _exceptionDecoration : TextEditorDecorationType;

    get DecorationsCollection() : Map<TestStatus, TextEditorDecorationType>{
        return this._decorationsCollection;
    }

    get ExceptionDecoration() : TextEditorDecorationType{
        return this._exceptionDecoration;
    }

    private initializeDecorations() {
        var passIconPath = this.getIconPath("passIconPath", "images\\pass.png" ) 
        var passDecoration = this.decorationCreator.createTextEditorDecorationType({gutterIconPath: passIconPath});
        this.DecorationsCollection.set(TestStatus.Pass, passDecoration);
        var failIconPath = this.getIconPath("failIconPath", "images\\fail.png" ) 
        var failDecoration = this.decorationCreator.createTextEditorDecorationType({gutterIconPath: failIconPath});
        this.DecorationsCollection.set(TestStatus.Fail, failDecoration);
        var unexecutedIconPath = this.getIconPath("unexecutedIconPath", "images\\unexecuted.png" ) 
        var unexecutedDecoration = this.decorationCreator.createTextEditorDecorationType({gutterIconPath: unexecutedIconPath});
        this.DecorationsCollection.set(TestStatus.Unexecuted, unexecutedDecoration);
        var exceptionIconPath = this.getIconPath("errorIconPath", "images\\error.png" );
        this._exceptionDecoration = this.decorationCreator.createTextEditorDecorationType({gutterIconPath: exceptionIconPath});
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