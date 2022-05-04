import { window, commands, ExtensionContext, TextEditor } from "vscode";

const open = require("open");

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(
    commands.registerCommand("cypress-docs.commands.search", () => {
      searchSpecific();
    })
  );
}

/**
 * Search the Cypress documentation for a specific command
 */
async function searchSpecific() {
  const editor = getEditor() as TextEditor;
  const command = getSelectedText(editor);

  await open(`https://docs.cypress.io/api/commands/${command}`);
}

/**
 * Get vscode active editor
 *
 * @return {TextEditor}
 */
function getEditor(): TextEditor | undefined {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  return editor;
}

/**
 * Get selected text by selection or by cursor position
 *
 * @param {TextEditor} active editor
 * @return {string}
 */
function getSelectedText(editor: TextEditor): string {
  const selection = editor.selection;
  let text = editor.document.getText(selection);

  if (!text) {
    const range = editor.document.getWordRangeAtPosition(selection.active);
    text = editor.document.getText(range);
  }

  return text;
}

// this method is called when your extension is deactivated
export function deactivate() {}
