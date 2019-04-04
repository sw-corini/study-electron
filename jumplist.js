const { app } = require('electron');
app.setJumpList([
	{
		type: 'custom',
		name: 'Recent Projects',
		items: []
	},
	{
		// has a name so `type` is assumed to be "custom"
		name: 'Tools',
		items: [
			{
				type: 'task',
				title: 'Tool A',
				program: process.execPath,
				args: '--run-tool-a',
				icon: process.execPath,
				iconIndex: 0,
				description: 'Runs Tool A'
			},
			{
				type: 'task',
				title: 'Tool B',
				program: process.execPath,
				args: '--run-tool-b',
				icon: process.execPath,
				iconIndex: 0,
				description: 'Runs Tool B'
			}
		]
	},
	{
		type: 'frequent'
	},
	{
		// has no name and no type so `type` is assumed to be "tasks"
		items: [
			{
				type: 'task',
				title: 'New Project',
				program: process.execPath,
				args: '--new-project',
				description: 'Create a new project.'
			},
			{
				type: 'separator'
			},
			{
				type: 'task',
				title: 'Recover Project',
				program: process.execPath,
				args: '--recover-project',
				description: 'Recover Project'
			}
		]
	}
]);
