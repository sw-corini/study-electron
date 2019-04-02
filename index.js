const { app, BrowserWindow } = require('electron');

let mainWindow;

function onClosed() {
	mainWindow = null;
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 550
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	mainWindow.on('closed', onClosed);
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		createWindow();
	}
});

app.on('ready', () => {
	createWindow();
});
