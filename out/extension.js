"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
// Array to store kudos messages
let kudosList = [];
function activate(context) {
    console.log("KudosHub extension is activated."); // Add this for debugging
    const addKudosCommand = vscode.commands.registerCommand('kudoshub.addKudos', async () => {
        console.log("Add Kudos command executed."); // Debug line
        const name = await vscode.window.showInputBox({ prompt: 'Enter the name of the person you want to recognize' });
        const message = await vscode.window.showInputBox({ prompt: 'Enter your kudos message' });
        if (name && message) {
            const kudos = { name, message, date: new Date() };
            kudosList.push(kudos);
            vscode.window.showInformationMessage(`Kudos added for ${name}!`);
        }
        else {
            vscode.window.showWarningMessage("Please provide both a name and a message.");
        }
    });
    const viewBoardCommand = vscode.commands.registerCommand('kudoshub.viewBoard', () => {
        console.log("View Board command executed."); // Debug line
        const panel = vscode.window.createWebviewPanel('recognitionBoard', 'Team Recognition Board', vscode.ViewColumn.One, {});
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
function deactivate() { }
//# sourceMappingURL=extension.js.map