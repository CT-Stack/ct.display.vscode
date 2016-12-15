import {WorkspaceConfiguration} from "vscode";

export class WorkspaceEmptyConfigurationStub implements WorkspaceConfiguration {
		
        get(section: string, defaultValue?: string): string{
            return "";
        }

		has(section: string): boolean{
            return false;
        }

		[key: string]: any;
}

export class WorkspaceConfigurationStub implements WorkspaceConfiguration {
		
        constructor(private defaultPath: string = "")
        {

        }

        get(section: string, defaultValue?: string): string{
            return this.defaultPath;
        }

		has(section: string): boolean{
            return false;
        }

		[key: string]: any;
}

