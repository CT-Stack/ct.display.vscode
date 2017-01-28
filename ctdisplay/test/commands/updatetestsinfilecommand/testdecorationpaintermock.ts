import { TextEditorMock } from '../../decorations/testdecorationpainter/texteditormock';
import { TestStatus } from '../../../src/contract/teststatus';
import { TextEditor } from 'vscode';
import { TestResult } from '../../../src/contract/testresult';
import { ITestDecorationPainter } from '../../../src/decorations/itestdecorationpainter';
import {ITestErrorPainter} from '../../../src/decorations/itesterrorpainter';


export class TestDecorationPainterMock implements ITestDecorationPainter, ITestErrorPainter {
		
    constructor(private decorationsPainted: boolean = false)
    {}

    public paintTestDecorations(tests: TestResult[], testStatus: TestStatus, activeTextEditor: TextEditor): void { 
        if(tests.length === 0)        
            return;  
        this.decorationsPainted = true;         
        tests.forEach(test => {
            if(test.TestStatus !== testStatus)
            {
                this.decorationsPainted = false;
            }
        });       
    }

    public paintErrors(tests: TestResult[], activeTextEditor : TextEditor): void {
    }

    get DecorationsPainted () : boolean{
        return this.decorationsPainted;
    }
}