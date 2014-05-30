'use strict';

// Configuring the Articles module
angular.module('soldiers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Soldiers', 'soldiers');
		Menus.addMenuItem('topbar', 'New Soldier', 'soldiers/create');
	}
]);