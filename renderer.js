const { remote } = require('electron');
const { Menu } = remote;

var onPrefsClicked1 = function() {
	alert('You clicked menu1');
};

var onPrefsClicked2 = function() {
	alert('You clicked menu2');
};

var onPrefsClicked3 = function() {
	alert('You clicked menu3');
};

// define template
const template = [
	{
		label: 'Electron-1',
		submenu: [
			{
				label: 'Menu1',
				click: function() {
					onPrefsClicked1();
				},
				accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I'
			}
		]
	},
	{
		label: 'Electron-2',
		submenu: [
			{
				label: 'Menu2',
				click: function() {
					onPrefsClicked2();
				}
			},
			{
				label: 'Menu3',
				click: function() {
					onPrefsClicked3();
				}
			}
		]
	}
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
