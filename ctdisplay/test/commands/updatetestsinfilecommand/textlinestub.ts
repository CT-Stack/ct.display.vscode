import { Range, TextLine } from 'vscode';
export class TextLineStub implements TextLine {
    public lineNumber: number;
    public text: string = "";
    public range: Range;
    public rangeIncludingLineBreak: Range;
    public firstNonWhitespaceCharacterIndex: number;
    public isEmptyOrWhitespace: boolean;	
}		
