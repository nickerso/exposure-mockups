/**
 * This module will create a "standard" plot:
 * - simulation data drawn with lines
 * - "experimental" data drawn with markers only and can have tooltips with the values
 */
define([
	// The dojo/dom module is required by this module, so it goes
	// in this list of dependencies.
	'dojo/dom',

	// Wait until the DOM is ready
	"dojo/domReady!"
], function(dom) {
	// Once all modules in the dependency list have loaded, this
	// function is called to define the demo/myModule module.
	//
	// The dojo/dom module is passed as the first argument to this
	// function; additional modules in the dependency list would be
	// passed in as subsequent arguments.

	// global variables
	var oldText = {};

	// This returned object becomes the defined value of this module
	return {
		message: function(msg) {
			console.log(msg);
		}
	};
});
