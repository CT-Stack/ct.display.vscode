"use strict";
const assert = require("assert");
const decorations_1 = require("../../../src/decorations/decorations");
const ExtensionContextStub_1 = require("./ExtensionContextStub");
const configurationstubs_1 = require("./configurationstubs");
const DecorationCreatorMock_1 = require("./DecorationCreatorMock");
const MessageDisplayMock_1 = require("./MessageDisplayMock");
const FileExistenceCheckerStub_1 = require("./FileExistenceCheckerStub");
suite("Decorations test", () => {
    test("Decorations must not be null after object initialization", () => {
        var contextStub = new ExtensionContextStub_1.ExtensionContextStub();
        var decoration = new decorations_1.Decorations(contextStub);
        assert.notEqual(decoration.DecorationsCollection, null);
        assert.equal(decoration.DecorationsCollection.size, 3);
    });
    test("When configuration is empty then pathIcon set to default", () => {
        var contextStub = new ExtensionContextStub_1.ExtensionContextStub();
        var configuration = new configurationstubs_1.WorkspaceEmptyConfigurationStub();
        var decorationCreator = new DecorationCreatorMock_1.DecorationCreatorMock();
        var decorations = new decorations_1.Decorations(contextStub, configuration, undefined, undefined, decorationCreator);
        assert.equal(decorationCreator.checkIfPathWasUsed(contextStub.asAbsolutePath("images\\pass.png").replace(/\\/g, "/")), true);
    });
    test("When configuration has invalid path then showWarningMessage and default path set", () => {
        var contextStub = new ExtensionContextStub_1.ExtensionContextStub();
        var configuration = new configurationstubs_1.WorkspaceConfigurationStub();
        var messageDisplayMock = new MessageDisplayMock_1.MessageDisplayMock();
        var decorationCreator = new DecorationCreatorMock_1.DecorationCreatorMock();
        var fileExistenceChecker = new FileExistenceCheckerStub_1.FileExistenceCheckerStub(false);
        var decorations = new decorations_1.Decorations(contextStub, configuration, messageDisplayMock, fileExistenceChecker, decorationCreator);
        assert.equal(decorationCreator.checkIfPathWasUsed(contextStub.asAbsolutePath("images\\pass.png").replace(/\\/g, "/")), true);
    });
    test("When configuration has valid path then set this one", () => {
        var correctPath = "C:/";
        var contextStub = new ExtensionContextStub_1.ExtensionContextStub();
        var configuration = new configurationstubs_1.WorkspaceConfigurationStub(correctPath);
        var messageDisplayMock = new MessageDisplayMock_1.MessageDisplayMock();
        var decorationCreator = new DecorationCreatorMock_1.DecorationCreatorMock();
        var fileExistenceChecker = new FileExistenceCheckerStub_1.FileExistenceCheckerStub(true);
        var decorations = new decorations_1.Decorations(contextStub, configuration, messageDisplayMock, fileExistenceChecker, decorationCreator);
        assert.equal(decorationCreator.checkIfPathWasUsed(correctPath.replace(/\\/g, "/")), true);
    });
});
//# sourceMappingURL=decorations.test.js.map