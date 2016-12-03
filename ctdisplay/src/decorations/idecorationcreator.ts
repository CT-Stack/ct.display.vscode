import {DecorationRenderOptions, TextEditorDecorationType} from "vscode";
export interface IDecorationCreator {
    createTextEditorDecorationType(options: DecorationRenderOptions): TextEditorDecorationType;
}