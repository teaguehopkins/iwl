'use strict';

//Setting up route
angular.module('soldiers').config(['$stateProvider',
	function($stateProvider) {
		// Soldiers state routing
		$stateProvider.
		state('listSoldiers', {
			url: '/soldiers',
			templateUrl: 'modules/soldiers/views/list-soldiers.client.view.html'
		}).
		state('createSoldier', {
			url: '/soldiers/create',
			templateUrl: 'modules/soldiers/views/create-soldier.client.view.html'
		}).
		state('viewSoldier', {
			url: '/soldiers/:soldierId',
			templateUrl: 'modules/soldiers/views/view-soldier.client.view.html'
		}).
		state('editSoldier', {
			url: '/soldiers/:soldierId/edit',
			templateUrl: 'modules/soldiers/views/edit-soldier.client.view.html'
		});
	}
]);