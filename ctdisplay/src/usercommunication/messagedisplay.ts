import {IMessageDisplay} from "./IMessageDisplay"
import {window, MessageItem} from "vscode";

export class MessageDisplay implements IMessageDisplay
{
        public showInformationMessage(message: string, ...items: string[]): Thenable<string>
        {
            return window.showInformationMessage(message, ...items);
        }

		public showWarningMessage(message: string, ...items: string[]): Thenable<string>
        {
            return window.showWarningMessage(message, ...items);
        }

		public showErrorMessage(message: string, ...items: string[]): Thenable<string>
        {
            return window.showErrorMessage(message, ...items);
        }
}