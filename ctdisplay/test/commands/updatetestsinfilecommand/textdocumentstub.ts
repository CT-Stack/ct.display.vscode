import { TextLineStub } from './textlinestub';
import { TextEditorMock } from '../../decorations/testdecorationpainter/texteditormock';
import { TestStatus } from '../../../src/contract/teststatus';
import { Position, Range, TextDocument, TextEditor, TextLine, Uri } from 'vscode';
import { TestResult } from '../../../src/contract/testresult';
import { ITestDecorationPainter } from '../../../src/decorations/itestdecorationpainter';


export class TextDocumentStub implements TextDocument {
	
        uri: Uri = new Uri();
	
		fileName: string;
	
		isUntitled: boolean;
	
		languageId: string;
	
		version: number;
	
		isDirty: boolean;
	
		save(): Thenable<boolean>
        {
            return null;
        };
	
		lineCount: number;
	
		lineAt(line: number): TextLine;        
		
        lineAt(position: Position): TextLine;

        lineAt(positionOrNumberParameter: any):TextLine {
            if(positionOrNumberParameter && positionOrNumberParameter == "number")
                return new TextLineStub();
            else
                return new TextLineStub();
        };       
		
		offsetAt(position: Position): number{
            return 0;
        };

		getText(range?: Range): string
        {
            return null;
        };
		
		getWordRangeAtPosition(position: Position): Range
        {
            return null;
        };
		
		validateRange(range: Range): Range
        {
            return null;
        };
		
		validatePosition(position: Position): Position
        {
            return null;
        };    

        positionAt(offset: number): Position 
        {
            return null;
        }
}