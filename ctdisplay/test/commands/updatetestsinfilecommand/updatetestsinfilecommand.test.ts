import { TextDocumentStub } from './textdocumentstub';
import { TextDocument, TextEditor, Uri } from 'vscode';
import { TestStatus } from '../../../src/contract/teststatus';
import { TestResult } from '../../../src/contract/testresult';
import { TextEditorMock } from '../../decorations/testdecorationpainter/texteditormock';
import { TestDecorationPainterStub } from './testdecorationpainterstub';
import { SSL_OP_ALL } from 'constants';
import { TestSetResult } from '../../../src/contract/testsetresult';
import { TestTransferObject } from '../../../src/contract/testtransferobject';
import { UpdateTestsInFileCommand } from '../../../src/commands/UpdateTestsInFileCommand';
import * as assert from 'assert';

suite("Decorations test", () => {

    test("Do nothing when active text editor is undefined", () => {
        var testResults = [];
        testResults.push(new TestResult("FirstTest", TestStatus.Pass, 20));
        testResults.push(new TestResult("Second test", TestStatus.Pass, 40));

        var testSetResult = [];
        testSetResult.push(new TestSetResult("FirstSet", "C:/", testResults))

        var textEditor = null;
        var testDecorationPainter = new TestDecorationPainterStub();
        var testTransferObject = new TestTransferObject(testSetResult);

        var updateTestsInFileCommand = new UpdateTestsInFileCommand(testTransferObject, testDecorationPainter, textEditor);
        
        updateTestsInFileCommand.execute();  

        assert.equal(testDecorationPainter.DecorationsPainted, false);    
    });

    test("Do nothing when document in active text editor is empty", () => {
        var testResults = [];
        testResults.push(new TestResult("FirstTest", TestStatus.Pass, 20));
        testResults.push(new TestResult("Second test", TestStatus.Pass, 40));

        var testSetResult = [];
        testSetResult.push(new TestSetResult("FirstSet", "C:/", testResults))

        var textEditor = new TextEditorMock();
        textEditor.document = new TextDocumentStub();
        textEditor.document.lineCount = 1;
               
        var testDecorationPainter = new TestDecorationPainterStub();
        var testTransferObject = new TestTransferObject(testSetResult);

        var updateTestsInFileCommand = new UpdateTestsInFileCommand(testTransferObject, testDecorationPainter, textEditor);
        
        updateTestsInFileCommand.execute();  

        assert.equal(testDecorationPainter.DecorationsPainted, false);
    });

    test("Do nothing when testobject is null", () => {
        var textEditor = new TextEditorMock();
        textEditor.document = new TextDocumentStub();
               
        var testDecorationPainter = new TestDecorationPainterStub();
        var testTransferObject = null;

        var updateTestsInFileCommand = new UpdateTestsInFileCommand(testTransferObject, testDecorationPainter, textEditor);
        
        updateTestsInFileCommand.execute();  

        assert.equal(testDecorationPainter.DecorationsPainted, false);
    });

    test("All used test results must refer to active document", ()  =>{
        var testResults = [];
        testResults.push(new TestResult("FirstTest", TestStatus.Pass, 20));
        testResults.push(new TestResult("Second test", TestStatus.Pass, 40));

        var testSetResult = [];
        testSetResult.push(new TestSetResult("FirstSet", "some/file/path", testResults))

        var textEditor = new TextEditorMock();
        textEditor.document = new TextDocumentStub();
        textEditor.document.uri = Uri.parse('some/different/file/path');

        
        var testDecorationPainter = new TestDecorationPainterStub();
        var testTransferObject = new TestTransferObject(testSetResult);

        var updateTestsInFileCommand = new UpdateTestsInFileCommand(testTransferObject, testDecorationPainter, textEditor);
        
        updateTestsInFileCommand.execute();  

        assert.equal(testDecorationPainter.DecorationsPainted, false);
    });    

    test("Setting decoration for each test status", () =>{
        var testResults = [];
        testResults.push(new TestResult("FirstTest", TestStatus.Pass, 20));
        testResults.push(new TestResult("Second test", TestStatus.Fail, 40));
        testResults.push(new TestResult("Third test", TestStatus.Unexecuted, 50));

        var testSetResult = [];
        testSetResult.push(new TestSetResult("FirstSet", "some/file/path", testResults))

        var textEditor = new TextEditorMock();
        textEditor.document = new TextDocumentStub();
        textEditor.document.uri = Uri.parse('some/file/path');

        
        var testDecorationPainter = new TestDecorationPainterStub();
        var testTransferObject = new TestTransferObject(testSetResult);

        var updateTestsInFileCommand = new UpdateTestsInFileCommand(testTransferObject, testDecorationPainter, textEditor);
        
        updateTestsInFileCommand.execute();  

        assert.equal(testDecorationPainter.DecorationsPainted, true);
    });


});