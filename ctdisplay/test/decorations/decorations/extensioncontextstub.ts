import {ExtensionContext, Memento} from 'vscode';
import * as path from 'path';
import {TestConsts} from '../../TestConsts'

export class ExtensionContextStub implements ExtensionContext
{

		subscriptions: { dispose(): any }[];

		workspaceState: Memento;

		globalState: Memento;

		extensionPath: string;

		public asAbsolutePath(relativePath: string): string {
            return path.join(TestConsts.WorkspacePath, relativePath);
        }
		storagePath: string;
}