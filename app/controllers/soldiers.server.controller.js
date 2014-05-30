'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Soldier = mongoose.model('Soldier'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Soldier already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Soldier
 */
exports.create = function(req, res) {
	var soldier = new Soldier(req.body);
	soldier.user = req.user;

	soldier.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soldier);
		}
	});
};

/**
 * Show the current Soldier
 */
exports.read = function(req, res) {
	res.jsonp(req.soldier);
};

/**
 * Update a Soldier
 */
exports.update = function(req, res) {
	var soldier = req.soldier;

	soldier = _.extend(soldier, req.body);

	soldier.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soldier);
		}
	});
};

/**
 * Delete an Soldier
 */
exports.delete = function(req, res) {
	var soldier = req.soldier;

	soldier.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soldier);
		}
	});
};

/**
 * List of Soldiers
 */
exports.list = function(req, res) {
	Soldier.find().sort('-created').populate('user', 'displayName').exec(function(err, soldiers) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soldiers);
		}
	});
};

/**
 * Soldier middleware
 */
exports.soldierByID = function(req, res, next, id) {
	Soldier.findById(id).populate('user', 'displayName').exec(function(err, soldier) {
		if (err) return next(err);
		if (!soldier) return next(new Error('Failed to load Soldier ' + id));
		req.soldier = soldier;
		next();
	});
};

/**
 * Soldier authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.soldier.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};