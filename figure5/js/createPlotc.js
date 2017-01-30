/**
 * This module will create a "standard" plot:
 * - simulation data drawn with lines
 * - "experimental" data drawn with markers only and can have tooltips with the values
 */
define([
	// The dojo/dom module is required by this module, so it goes
	// in this list of dependencies.
	'dojo/dom',
	
	// CSV data store
	"dojox/data/CsvStore",
	// and the charting data series
	"dojox/charting/DataSeries",
	
	// Require the basic 2d chart resource
	"dojox/charting/Chart",
	
	// Require the theme of our choosing
	"dojox/charting/themes/Shrooms",
	
	// Charting plugins:
	
	// Require the types of Plot that we'll be using
	"dojox/charting/plot2d/Lines",
	"dojox/charting/plot2d/Markers",
	"dojox/charting/plot2d/MarkersOnly",
	
	// we want to use tool tips to highlight data points
	"dojox/charting/action2d/Tooltip",
	
	// our data
	//"dojo/text!demo/data/example-pie.data",
	
	// We'll use default x/y axes
	"dojox/charting/axis2d/Default",
	
	// Wait until the DOM is ready
	"dojo/domReady!"
], function(dom, CSV, DataSeries, Chart, theme, LinePlot, MarkersPlot, MarkersOnlyPlot, Tooltip) {
	// Once all modules in the dependency list have loaded, this
	// function is called to define the demo/myModule module.
	//
	// The dojo/dom module is passed as the first argument to this
	// function; additional modules in the dependency list would be
	// passed in as subsequent arguments.

	var oldText = {};
	
	// set up the simulation data source, model data is incorrect for 5c
	var simulationData = new CSV({
		url: "/figure5/data/model5c.csv"
	});
	// and the data series for the potential data
	var potentialSimulationData = new DataSeries(simulationData, {}, {
		x: "V",
		y: "I"
	});
	
	// set up temperature corrected experimental data 
	var experimentalDataTemp = new CSV ({
		url: "/figure5/data/exp5c.csv"
	})
	// and the data series for the temperature corrected experimental data used in the paper
	var potentialExperimental = new DataSeries(experimentalDataTemp, {}, {
		x: "V",
		y: "I"
	});
	
	// Create the chart within it's "holding" node
	var chart = new Chart("figure5cGoesHere", { 
		title: "C: Current-Voltage relationship for I_Ks",
		titlePos: "top",
		titleGap: 25,
		//titleFont: "normal normal normal 15pt Arial",
		titleFontColor: "default"
	});
	
	// Set the theme
	chart.setTheme(theme);
	
	// Add a line plot for the simulation data
	chart.addPlot("simulation", {
		type: LinePlot
	});
	// and add a markers-only plot for the simulation data
	chart.addPlot("experimental", {
		type: MarkersOnlyPlot
	});
	
	// Add the simulation data
	chart.addSeries("Simulation results", potentialSimulationData, {
		plot: "simulation"
	});
	
	chart.addSeries("Experimental data", potentialExperimental, {
		plot: "experimental"
	});
	
	// define our axes
	chart.addAxis("x", {
	title: "V (mV)", titleOrientation: "away",max:62,min:-42
	});
	chart.addAxis("y", {
		vertical: true,
		title: "I (pA/pF)",
		titleGap: 25,
		max:10.1,
		min:-0.1,
	});
	
	// Add the tooltip for data points
	new Tooltip(chart, "experimental", {
		text: function(o) {
			return o.x + "," + o.y;
		}
	});
	
	chart.resize(500,500)
	
	// Render the chart!
	chart.render();

	// This returned object becomes the defined value of this module
	return {
		setText : function(id, text) {
			var node = dom.byId(id);
			oldText[id] = node.innerHTML;
			node.innerHTML = text;
		},

		restoreText : function(id) {
			var node = dom.byId(id);
			node.innerHTML = oldText[id];
			delete oldText[id];
		}
	};
});