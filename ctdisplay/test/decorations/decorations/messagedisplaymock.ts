import {IMessageDisplay} from "../../../src/usercommunication/IMessageDisplay";
export class MessageDisplayMock implements IMessageDisplay{

        private _showWarningMessageCalled : boolean= false;
        
        public showInformationMessage(message: string, ...items: string[]): Thenable<string>{
            return null;
        }

		public showWarningMessage(message: string, ...items: string[]): Thenable<string>{
            this._showWarningMessageCalled = true;
            return null;
        }

		public showErrorMessage(message: string, ...items: string[]): Thenable<string>{
            return null;
        }

        public verifyShowWaringMessageWasCalled() : boolean {
            return this._showWarningMessageCalled;
        }
}