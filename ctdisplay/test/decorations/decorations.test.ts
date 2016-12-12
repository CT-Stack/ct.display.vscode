import * as assert from 'assert';

import {ThemableDecorationRenderOptions} from 'vscode';
import {Decorations} from '../../src/decorations/decorations';
import * as fs from 'fs';
import * as vscode from 'vscode';
import {ExtensionContextStub} from './ExtensionContextStub';
import {WorkspaceEmptyConfigurationStub, WorkspaceConfigurationStub} from "./configurationstubs";
import {DecorationCreatorMock} from "./DecorationCreatorMock";
import {MessageDisplayMock} from "./MessageDisplayMock";
import {FileExistenceCheckerStub} from "./FileExistenceCheckerStub";

suite("Decorations test", () => {

    test("Decorations must not be null after object initialization", () => {
        var contextStub = new ExtensionContextStub();
        var decoration = new Decorations(contextStub);
        assert.notEqual(decoration.DecorationsCollection, null);
        assert.equal(decoration.DecorationsCollection.size, 3);
    });

    test("When configuration is empty then pathIcon set to default", () => {
        var contextStub = new ExtensionContextStub();
        var configuration = new WorkspaceEmptyConfigurationStub();
        var decorationCreator = new DecorationCreatorMock();
        var decorations = new Decorations(contextStub, configuration, undefined, undefined, decorationCreator);
        assert.equal(decorationCreator.checkIfPathWasUsed(contextStub.asAbsolutePath("images\\pass.png").replace(/\\/g, "/")), true);
    });

    test("When configuration has invalid path then showWarningMessage and default path set", () =>{
        var contextStub = new ExtensionContextStub();
        var configuration = new WorkspaceConfigurationStub();
        var messageDisplayMock = new MessageDisplayMock();
        var decorationCreator = new DecorationCreatorMock();
        var fileExistenceChecker = new FileExistenceCheckerStub(false);
        var decorations = new Decorations(contextStub, configuration, messageDisplayMock, fileExistenceChecker, decorationCreator);
        assert.equal(decorationCreator.checkIfPathWasUsed(contextStub.asAbsolutePath("images\\pass.png").replace(/\\/g, "/")), true);
    });

    test("When configuration has valid path then set this one", () => {
        var correctPath = "C:/"
        var contextStub = new ExtensionContextStub();
        var configuration = new WorkspaceConfigurationStub(correctPath);
        var messageDisplayMock = new MessageDisplayMock();
        var decorationCreator = new DecorationCreatorMock();
        var fileExistenceChecker = new FileExistenceCheckerStub(true);
        var decorations = new Decorations(contextStub, configuration, messageDisplayMock, fileExistenceChecker, decorationCreator);
        assert.equal(decorationCreator.checkIfPathWasUsed(correctPath.replace(/\\/g, "/")), true);
    });
});