import {IDecorationCreator} from "../../src/decorations/IDecorationCreator";
import {DecorationRenderOptions, TextEditorDecorationType} from "vscode";
export class DecorationCreatorMock implements IDecorationCreator {

    private _list: string[];

    constructor()
    {
        this._list = [];
    }
    
    public createTextEditorDecorationType(options: DecorationRenderOptions): TextEditorDecorationType
    {
        this._list.push(options.gutterIconPath);
        return null;
    }

    public checkIfPathWasUsed(path: string): boolean
    {
        return this._list.find(x=> x== path) != undefined;
    }
}