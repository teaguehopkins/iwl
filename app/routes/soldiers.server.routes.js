'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var soldiers = require('../../app/controllers/soldiers');

	// Soldiers Routes
	app.route('/soldiers')
		.get(soldiers.list)
		.post(users.requiresLogin, soldiers.create);
	
	app.route('/soldiers/:soldierId')
		.get(soldiers.read)
		.put(users.requiresLogin, soldiers.hasAuthorization, soldiers.update)
	    .delete(users.requiresLogin, soldiers.hasAuthorization, soldiers.delete);

	// Finish by binding the Soldier middleware
	app.param('soldierId', soldiers.soldierByID);
};