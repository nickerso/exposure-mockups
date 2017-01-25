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
	
	// set up the simulation data source
	var simulationData80 = new CSV({
		url: "/figure1/data/model1f80.csv"
	});
	// and the data series for the potential data
	var potentialSimulationData80 = new DataSeries(simulationData80, {}, {
		x: "ii",
		y: "Ina"
	});
	
	// set up the simulation data source
	var simulationData100 = new CSV({
		url: "/figure1/data/model1f100.csv"
	});
	
	// and the data series for the potential data
	var potentialSimulationData100 = new DataSeries(simulationData100, {}, {
		x: "ii",
		y: "Ina"
	});
	
	// set up the simulation data source
	var simulationData120 = new CSV({
		url: "/figure1/data/model1f120.csv"
	});
	// and the data series for the potential data
	var potentialSimulationData120 = new DataSeries(simulationData120, {}, {
		x: "ii",
		y: "Ina"
	});
	
	// set up the simulation data source
	var simulationData140 = new CSV({
		url: "/figure1/data/model1f140.csv"
	});
	// and the data series for the potential data
	var potentialSimulationData140 = new DataSeries(simulationData140, {}, {
		x: "ii",
		y: "Ina"
	});
	
	// Create the chart within it's "holding" node
	var chart = new Chart("figure1fGoesHere", { 
		title: "F: Recovery from inactivation for different recovery potentials",
		titlePos: "top",
		titleGap: 25,
		//titleFont: "normal normal normal 15pt Arial",
		titleFontColor: "default"
	});
	
	// Set the theme
	chart.setTheme(theme);
	
	// Add a line plot for the simulation data
	chart.addPlot("simulation80", {
		type: LinePlot
	});
	// Add a line plot for the simulation data
	chart.addPlot("simulation100", {
		type: LinePlot
	});
	// Add a line plot for the simulation data
	chart.addPlot("simulation120", {
		type: LinePlot
	});
	// Add a line plot for the simulation data
	chart.addPlot("simulation140", {
		type: LinePlot
	});
	
	
	// Add the simulation data
	chart.addSeries("Simulation results for 80 hp", potentialSimulationData80, {
		plot: "simulation80"
	});
	// Add the simulation data
	chart.addSeries("Simulation results for 100 hp", potentialSimulationData100, {
		plot: "simulation100"
	});
	// Add the simulation data
	chart.addSeries("Simulation results for 120 hp", potentialSimulationData120, {
		plot: "simulation120"
	});
	// Add the simulation data
	chart.addSeries("Simulation results for 140 hp", potentialSimulationData140, {
		plot: "simulation140"
	});

	// define our axes
	chart.addAxis("x", {
	title: "Interpulse Interval (ms)", titleOrientation: "away"
	});
	chart.addAxis("y", {
		vertical: true,
		title: "Normalized I_Na",
		titleGap: 25,
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