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
	var AllEntities = {};
	

	// This returned object becomes the defined value of this module
	return {
		// just print out a message to the console
		message: function(msg) {
			console.log(msg);
		},
		
		// this will set up all the required callbacks
		registerEntities: function(diagramObjectId, entities) {
			var obj = dom.byId(diagramObjectId);
			var doc = obj.getSVGDocument();
			for (var name in entities)
			{
				var id = entities[name].id;
				var svg = doc.getElementById(id);
				svg.addEventListener("click", function(e) {
					var entity = AllEntities[diagramObjectId][e.srcElement.id];
					console.debug(entity);
					alert("This would do something for clicking on the object: " + entity.id);
				}, false);
				svg.addEventListener("contextmenu", function(e) {
					var entity = AllEntities[diagramObjectId][e.srcElement.id];
					console.debug(entity);
					alert("This would pop up a context menu for the object: " + entity.id);
					// see https://dojotoolkit.org/reference-guide/1.10/dijit/Menu.html to get started...
				}, false);
			}
			AllEntities[diagramObjectId] = entities;
		}
	};
});
