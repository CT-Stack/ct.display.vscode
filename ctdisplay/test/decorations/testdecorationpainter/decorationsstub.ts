import {IDecorations} from "../../../src/decorations/IDecorations";
import {TextEditorDecorationType, window, DecorationRenderOptions} from "vscode";
import {TestStatus} from "../../../src/contract/TestStatus";

export class DecorationsStub implements IDecorations{
    constructor()
    {
        this._decorationsCollection = new Map<TestStatus, TextEditorDecorationType>();
        this._decorationsCollection.set(TestStatus.Pass, window.createTextEditorDecorationType({}));
        this._exceptionDecoration = window.createTextEditorDecorationType({});
    }
    private _decorationsCollection : Map<TestStatus, TextEditorDecorationType>;
    private _exceptionDecoration : TextEditorDecorationType;

    get DecorationsCollection() : Map<TestStatus, TextEditorDecorationType>{
        return this._decorationsCollection;
    }

    get ExceptionDecoration() : TextEditorDecorationType{
        return this._exceptionDecoration;
    }

}