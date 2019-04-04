var menubar = require('menubar');

var mb = menubar();

mb.on('ready', function ready() {
	alert('app is ready');
});
