import {TextEditor, Selection, TextDocument, TextEditorOptions, ViewColumn, TextEditorEdit, TextEditorDecorationType, Range, DecorationOptions, TextEditorRevealType} from "vscode";

export class TextEditorMock implements TextEditor
{
		document: TextDocument;

		selection: Selection;

		selections: Selection[];

		options: TextEditorOptions;

		viewColumn: ViewColumn;

        private _ranges: Range[];

		edit(callback: (editBuilder: TextEditorEdit) => void, options?:{ undoStopBefore: boolean; undoStopAfter: boolean; }): Thenable<boolean>{
            return null;
        }

		setDecorations(decorationType: TextEditorDecorationType, rangesOrOptions: Range[]): void{
            this._ranges = rangesOrOptions;
        }

        public lineExistsInRanges(line: number) : boolean
        {
            if (this._ranges === null)
                return false;
            return this._ranges.findIndex(e=>e.start.line === line) !== undefined
        }

		revealRange(range: Range, revealType?: TextEditorRevealType): void{}

		show(column?: ViewColumn): void{}

		hide(): void{

        }
}