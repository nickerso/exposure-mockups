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
		url: "/figure1/data/model1a.csv"
	});
	// and the data series for the potential data
	var potentialSimulationData = new DataSeries(simulationData, {}, {
		x: "V",
		y: "minf3"
	});
	
	// set up temperature corrected experimental data 
	var experimentalDataTemp = new CSV ({
		url: "/figure1/data/exptemp1a.csv"
	})
	// and the data series for the temperature corrected experimental data used in the paper
	var potentialExperimental = new DataSeries(experimentalDataTemp, {}, {
		x: "V",
		y: "minf3"
	});
	
	// Create the chart within it's "holding" node
	var charta = new Chart("figure1aGoesHere", { 
		title: "A: Steady state activation curves",
		titlePos: "top",
		titleGap: 25,
		//titleFont: "normal normal normal 15pt Arial",
		titleFontColor: "default"
	});
	
	// Set the theme
	charta.setTheme(theme);
	
	// Add a line plot for the simulation data
	charta.addPlot("simulation", {
		type: LinePlot
	});
	// and add a markers-only plot for the simulation data
	charta.addPlot("experimental", {
		type: MarkersOnlyPlot
	});
	
	// Add the simulation data
	charta.addSeries("Simulation results", potentialSimulationData, {
		plot: "simulation"
	});
	charta.addSeries("Experimentall data, temperature corrected", potentialExperimental, {
		plot: "experimental"
	});
	
	// define our axes
	charta.addAxis("x", {
	title: "V (mV)", titleOrientation: "away", min: -80.5
	});
	charta.addAxis("y", {
		vertical: true,
		title: "m_\u221e^3",
		titleGap: 25,
		max: 1.05,
		min: -0.05
	});
	
	// Add the tooltip for data points
	new Tooltip(charta, "experimental", {
		text: function(o) {
			return o.x + "," + o.y;
		}
	});
	
	charta.resize(500,500)
	
	// Render the chart!
	charta.render();

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