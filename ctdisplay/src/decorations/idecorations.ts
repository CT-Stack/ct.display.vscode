import { TextEditorDecorationType } from "vscode"
import { TestStatus } from "../contract/TestStatus";
export interface IDecorations {

    DecorationsCollection: Map<TestStatus, TextEditorDecorationType>;
}