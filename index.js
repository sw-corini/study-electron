const { app, BrowserWindow } = require('electron');

let mainWindow;

function onClosed() {
	mainWindow = null;
}

function createWindow() {
	app.setAppUserModelId('co.corini.coci');

	mainWindow = new BrowserWindow({
		width: 900,
		height: 550,
		icon: __dirname + '/build/icon.icns'
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	mainWindow.on('closed', onClosed);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
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
