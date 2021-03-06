/**
 * Module dependencies
 */

var util = require('util'),
	_ = require('lodash')
	path = require('path');

// Make _.defaults recursive
_.defaults = require('merge-defaults');



/**
 * This `before` function is run before generating targets.
 * Validate, configure defaults, get extra dependencies, etc.
 *
 * @param  {Object} scope
 * @param  {Function} cb    [callback]
 */

module.exports = function(scope, cb) {



	//
	// scope.args are the raw command line arguments.
	//
	// e.g. if you run:
	// sails generate controlller user find create update
	// then:
	// scope.args = ['user', 'find', 'create', 'update']
	//

	_.defaults(scope, {
		// foo: scope.args[0]
	});



	//
	// Validate custom scope variables which
	// are required by this generator.
	//

	if (!scope.rootPath) {
		return cb(new Error(
			'Missing scope variable: `rootPath`\n' +
			'Please make sure it is specified and try again.'
		));
	}


	//
	// Determine default values based on the
	// available scope.
	//

	_.defaults(scope, {
		author: 'a Node.js/Sails.js Contributor',
		year: (new Date()).getFullYear(),
		appName: (scope.args[0] === '.' || !scope.args[0]) ? path.basename(process.cwd()) : scope.args[0],
	});

	scope.appPath = scope.args[0] || '.';



	//
	// Trigger callback with no error to proceed.
	//

	cb();
};
