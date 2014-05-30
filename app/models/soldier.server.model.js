'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Soldier Schema
 */
var SoldierSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Soldier name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Soldier', SoldierSchema);