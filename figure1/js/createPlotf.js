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
	var simulationData = new CSV({
		url: "/figure1/data/model1b.csv"
	});
	// and the data series for the potential data
	var potentialSimulationData = new DataSeries(simulationData, {}, {
		x: "V",
		y: "hinfjinf"
	});
	
	// set up temperature corrected experimental data 
	var experimentalDataTemp = new CSV ({
		url: "/figure1/data/exptemp1b.csv"
	})
	// and the data series for the temperature corrected experimental data used in the paper
	var potentialExperimental = new DataSeries(experimentalDataTemp, {}, {
		x: "V",
		y: "hinfjinf"
	});
	
	// Create the chart within it's "holding" node
	var chartb = new Chart("figure1fGoesHere", { 
		title: "F: Recovery from inactivation for different recovery potentials",
		titlePos: "top",
		titleGap: 25,
		//titleFont: "normal normal normal 15pt Arial",
		titleFontColor: "default"
	});
	
	// Set the theme
	chartb.setTheme(theme);
	
	// Add a line plot for the simulation data
	chartb.addPlot("simulation", {
		type: LinePlot
	});
	// and add a markers-only plot for the simulation data
	chartb.addPlot("experimental", {
		type: MarkersOnlyPlot
	});
	
	// Add the simulation data
	chartb.addSeries("Simulation results", potentialSimulationData, {
		plot: "simulation"
	});
	chartb.addSeries("Experimentall data, temperature corrected", potentialExperimental, {
		plot: "experimental"
	});
	
	// define our axes
	chartb.addAxis("x", {
	title: "V (mV)", titleOrientation: "away"
	});
	chartb.addAxis("y", {
		vertical: true,
		title: "h_\u221e j_\u221e",
		titleGap: 25,
		min: -0.05,
		max: 1
	});
	
	// Add the tooltip for data points
	new Tooltip(chartb, "experimental", {
		text: function(o) {
			return o.x + "," + o.y;
		}
	});
	
	chartb.resize(500,500)
	
	// Render the chart!
	chartb.render();

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