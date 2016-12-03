import * as fs from "fs";
import {IFileExistenceChecker} from "./IFileExistenceChecker";
export class FileExistenceChecker implements IFileExistenceChecker{
    public exists(path: string | Buffer, callback?: (exists: boolean) => void): void{
        fs.exists(path, callback);
    }
    public existsSync(path: string | Buffer): boolean{
        return fs.existsSync(path);
    }
}