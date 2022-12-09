// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { TextEncoder } from "util";
import * as vscode from "vscode";
import {
  componentStoriesTs,
  componentTestTs,
  componentTs,
  indexTs,
} from "./template";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "react-component-snippet" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "react-component-snippet.createReactComponent",
    async () => {
      const id =
        (await vscode.window.showInputBox({
          prompt: "Input react component's name",
          placeHolder: "TextField",
          value: "ExampleComponent",
        })) || "";
      const folders = vscode.workspace.workspaceFolders;
      if (folders !== undefined) {
        try {
          const baseDir = vscode.Uri.joinPath(folders[0].uri, id);
          vscode.workspace.fs.createDirectory(baseDir);
          var enc = new TextEncoder(); // always utf-8
          vscode.workspace.fs.writeFile(
            vscode.Uri.joinPath(baseDir, "index.ts"),
            enc.encode(indexTs(id))
          );
          vscode.workspace.fs.writeFile(
            vscode.Uri.joinPath(baseDir, `${id}.tsx`),
            enc.encode(componentTs(id))
          );
          vscode.workspace.fs.writeFile(
            vscode.Uri.joinPath(baseDir, `${id}.stories.tsx`),
            enc.encode(componentStoriesTs(id))
          );
          vscode.workspace.fs.writeFile(
            vscode.Uri.joinPath(baseDir, `${id}.test.tsx`),
            enc.encode(componentTestTs(id))
          );
        } catch (e) {
          vscode.window.showInformationMessage(`error ${e}`);
        }
      } else {
        vscode.window.showInformationMessage(`no workspace`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
