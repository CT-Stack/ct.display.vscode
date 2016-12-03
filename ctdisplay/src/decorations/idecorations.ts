import {TextEditorDecorationType} from "vscode"
export interface IDecorations {

    PassDecoration: TextEditorDecorationType;

    FailDecoration: TextEditorDecorationType;

    UnexecutedDecoration: TextEditorDecorationType;
}