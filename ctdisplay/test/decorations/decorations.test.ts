import * as assert from 'assert';

import {ThemableDecorationRenderOptions} from 'vscode';
import {Decorations} from '../../src/decorations';
import * as fs from 'fs';
import * as vscode from 'vscode';
import {ExtensionContextStub} from './ExtensionContextStub';

suite("Decorations test", () => {

    test("Decorations must not be null after object initialization", () => {
        var contextStub = new ExtensionContextStub();
        var decoration = new Decorations(contextStub);
        assert.notEqual(decoration.PassDecoration, null);
        assert.notEqual(decoration.FailDecoration, null);
        assert.notEqual(decoration.UnexecutedDecoration, null);
    });

    test("PassDecoration must have icon path to existing icon", () => {
        var contextStub = new ExtensionContextStub();
        var decoration = new Decorations(contextStub);
        var passDecoration = <ThemableDecorationRenderOptions> decoration.PassDecoration;
        var prox = (<any>decoration.PassDecoration)._proxy;
        assert.notEqual(passDecoration.gutterIconPath, '');
        assert.equal(fs.existsSync(passDecoration.gutterIconPath), true);
    })
});