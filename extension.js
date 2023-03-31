// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "go-func-doc" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('go-func-doc.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get the current position of the cursor
            const position = editor.selection.active;

            // Get the current line
            const currentLine = editor.document.lineAt(position.line).text;

            // Check if the current line contains a function declaration
            const functionRegex = /^func(\s+\([a-zA-Z0-9_\s\*]+\))?\s+(?<functionName>[a-zA-Z_][a-zA-Z0-9_]*)\s*/;
            const match = currentLine.match(functionRegex);

            if (match && match.groups && match.groups['functionName']) {
                // Get the function name
                const functionName = match.groups['functionName'];

                // Create a TextEdit to insert the function name on the line above
                const edit = new vscode.TextEdit(
                    new vscode.Range(position.with(position.line - 1, 0), position.with(position.line - 1, 0)),
                    `// ${functionName} `
                );

                // Apply the edit to the document
                const workspaceEdit = new vscode.WorkspaceEdit();
                workspaceEdit.set(editor.document.uri, [edit]);
                vscode.workspace.applyEdit(workspaceEdit);
            } else {
                vscode.window.showInformationMessage('No function declaration found on the current line.');
            }
        }

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Go Func Doc!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
};
