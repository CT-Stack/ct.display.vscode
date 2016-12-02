import {ExtensionContext, Memento} from 'vscode';
import * as path from 'path';
import {Consts} from '../consts'

export class ExtensionContextStub implements ExtensionContext
{

		subscriptions: { dispose(): any }[];

		workspaceState: Memento;

		globalState: Memento;

		extensionPath: string;

		public asAbsolutePath(relativePath: string): string {
            return path.join(Consts.WorkspacePath, relativePath);
        }
		storagePath: string;
}