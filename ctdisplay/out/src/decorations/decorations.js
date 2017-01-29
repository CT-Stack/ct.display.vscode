"use strict";
const vscode_1 = require("vscode");
const MessageDisplay_1 = require("../usercommunication/MessageDisplay");
const fileexistencechecker_1 = require("../common/files/fileexistencechecker");
const decorationCreator_1 = require("./decorationCreator");
const TestStatus_1 = require("../contract/TestStatus");
class Decorations {
    constructor(context, configuration = vscode_1.workspace.getConfiguration("cticons"), userInformer = new MessageDisplay_1.MessageDisplay(), fileExistenceChecker = new fileexistencechecker_1.FileExistenceChecker(), decorationCreator = new decorationCreator_1.DecorationCreator()) {
        this.context = context;
        this.configuration = configuration;
        this.userInformer = userInformer;
        this.fileExistenceChecker = fileExistenceChecker;
        this.decorationCreator = decorationCreator;
        this._decorationsCollection = new Map();
        this.initializeDecorations();
    }
    get DecorationsCollection() {
        return this._decorationsCollection;
    }
    get ExceptionDecoration() {
        return this._exceptionDecoration;
    }
    initializeDecorations() {
        var passIconPath = this.getIconPath("passIconPath", "images\\pass.png");
        var passDecoration = this.decorationCreator.createTextEditorDecorationType({ gutterIconPath: passIconPath });
        this.DecorationsCollection.set(TestStatus_1.TestStatus.Pass, passDecoration);
        var failIconPath = this.getIconPath("failIconPath", "images\\fail.png");
        var failDecoration = this.decorationCreator.createTextEditorDecorationType({ gutterIconPath: failIconPath });
        this.DecorationsCollection.set(TestStatus_1.TestStatus.Fail, failDecoration);
        var unexecutedIconPath = this.getIconPath("unexecutedIconPath", "images\\unexecuted.png");
        var unexecutedDecoration = this.decorationCreator.createTextEditorDecorationType({ gutterIconPath: unexecutedIconPath });
        this.DecorationsCollection.set(TestStatus_1.TestStatus.Unexecuted, unexecutedDecoration);
        var exceptionIconPath = this.getIconPath("errorIconPath", "images\\error.png");
        this._exceptionDecoration = this.decorationCreator.createTextEditorDecorationType({ gutterIconPath: exceptionIconPath });
    }
    getIconPath(configValue, defaultValue) {
        let pathIcon = this.configuration.get(configValue, "");
        if (pathIcon != "") {
            if (!this.fileExistenceChecker.existsSync(pathIcon)) {
                this.userInformer.showWarningMessage("The file " + pathIcon + " used for" + configValue + " does not exists.");
                pathIcon = this.context.asAbsolutePath(defaultValue);
            }
        }
        else {
            pathIcon = this.context.asAbsolutePath(defaultValue);
        }
        pathIcon = pathIcon.replace(/\\/g, "/");
        return pathIcon;
    }
}
exports.Decorations = Decorations;
//# sourceMappingURL=decorations.js.map