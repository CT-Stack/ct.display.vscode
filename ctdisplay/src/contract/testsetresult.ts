import { TestResult } from "./TestResult";

export class TestSetResult {

    constructor(private setName: string, private filePath: string, private testResults: TestResult[] = [])
    { }

    get SetName(): string {
        return this.setName;
    }

    get FilePath(): string {
        return this.filePath;
    }

    get TestResults(): TestResult[] {
        return this.testResults;
    }

}