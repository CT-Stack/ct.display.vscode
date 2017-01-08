import { TextEditorMock } from '../../decorations/testdecorationpainter/texteditormock';
import { TestStatus } from '../../../src/contract/teststatus';
import { TextEditor } from 'vscode';
import { TestResult } from '../../../src/contract/testresult';
import { ITestDecorationPainter } from '../../../src/decorations/itestdecorationpainter';


export class TestDecorationPainterMock implements ITestDecorationPainter {
		
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

    get DecorationsPainted () : boolean{
        return this.decorationsPainted;
    }
}