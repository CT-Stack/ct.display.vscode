import {IDecorationCreator} from "./idecorationcreator";
import {DecorationRenderOptions, TextEditorDecorationType, window} from "vscode";

export class DecorationCreator implements IDecorationCreator
{
    public createTextEditorDecorationType(options: DecorationRenderOptions): TextEditorDecorationType
    {
        return window.createTextEditorDecorationType(options);
    }
}