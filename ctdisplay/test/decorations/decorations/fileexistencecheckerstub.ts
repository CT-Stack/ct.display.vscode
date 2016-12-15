import {IFileExistenceChecker} from "../../../src/common/files/IFileExistenceChecker";

export class FileExistenceCheckerStub implements IFileExistenceChecker{

    constructor(private existenceDefaultValue: boolean = false)
    {}

    public exists(path: string | Buffer, callback?: (exists: boolean) => void): void {

    }
    public existsSync(path: string | Buffer): boolean{
        return this.existenceDefaultValue;
    }
}