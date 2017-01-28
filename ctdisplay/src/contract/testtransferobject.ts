import { TestSetResult } from "./TestSetResult";

export class TestTransferObject {
    private static instance: TestTransferObject = new TestTransferObject([]);

    public static getInstance():TestTransferObject {
        return TestTransferObject.instance;
    }   

    constructor(private testSetResults: TestSetResult[]) {
        if (TestTransferObject.instance) {
            throw new Error("Error: Instantiation failed: Use TestTransferObject.getInstance() instead of new.");
        }
        TestTransferObject.instance = this;
    }

    get TestSetResults(): TestSetResult[] {
        return this.testSetResults;
    }

    public updateTestSetResults(newTestSetResults: TestSetResult[]) {
        this.testSetResults = newTestSetResults;
    }

    // TODO: Add language/testframework and create filters that will be used in commands to filter 
}