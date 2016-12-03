export interface IFileExistenceChecker {
    exists(path: string | Buffer, callback?: (exists: boolean) => void): void;
    existsSync(path: string | Buffer): boolean;
}