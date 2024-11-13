import * as vscode from 'vscode';

// Array to store kudos messages
let kudosList: { name: string; message: string; date: Date }[] = [];

export function activate(context: vscode.ExtensionContext) {
    console.log("KudosHub extension is activated."); // Add this for debugging

    const addKudosCommand = vscode.commands.registerCommand('kudoshub.addKudos', async () => {
        console.log("Add Kudos command executed."); // Debug line
        const name = await vscode.window.showInputBox({ prompt: 'Enter the name of the person you want to recognize' });
        const message = await vscode.window.showInputBox({ prompt: 'Enter your kudos message' });

        if (name && message) {
            const kudos = { name, message, date: new Date() };
            kudosList.push(kudos);
            vscode.window.showInformationMessage(`Kudos added for ${name}!`);
        } else {
            vscode.window.showWarningMessage("Please provide both a name and a message.");
        }
    });

    const viewBoardCommand = vscode.commands.registerCommand('kudoshub.viewBoard', () => {
        console.log("View Board command executed."); // Debug line

        const panel = vscode.window.createWebviewPanel(
            'recognitionBoard',
            'Team Recognition Board',
            vscode.ViewColumn.One,
            {}
        );

        let kudosHtml = kudosList.map(kudo => `
            <div style="margin-bottom: 10px;">
                <strong>${kudo.name}</strong> - <em>${kudo.date.toDateString()}</em>
                <p>${kudo.message}</p>
            </div>
        `).join('');

        panel.webview.html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; padding: 10px; }
                    h1 { color: #007ACC; }
                    .kudos { border: 1px solid #ddd; padding: 8px; border-radius: 5px; margin-bottom: 10px; }
                </style>
            </head>
            <body>
                <h1>Team Recognition Board</h1>
                ${kudosHtml}
            </body>
            </html>`;
    });

    context.subscriptions.push(addKudosCommand, viewBoardCommand);
}
// Deactivate function (optional, but recommended)
export function deactivate() {}
