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
	"dojox/charting/themes/Claro",
	
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
		url: "/tusscher04_figure1/data/tusscher_04_figure1A_modeldata.csv"
	});
	// and the data series for the potential data
	var potentialSimulationData = new DataSeries(simulationData, {}, {
		x: "V"
		y: "m_inf3"
	});
	
	// set up the experimental data source
	var experimentalData = new CSV({
		url: "/tusscher04_figure1/data/tusscher_04_figure1A_exp.csv"
	});
	// and the data series for the original experimental data
	var potentialExperimentalOriginal = new DataSeries(experimentalData, {}, {
		x: "V(mV)"
		y: "m_inf^3"
	});
	
	// set up temperature corrected experimental data 
	var experimentalDataTemp = new CSV ({
		url: "/tusscher04_figure1/data/tusscher_04_figure1A_exp_tempcorrected.csv"
	})
	// and the data series for the temperature corrected experimental data used in the paper
	var potentialExperimental = new DataSeries(experimentalDataTemp, {}, {
		x: "V(mV)"
		y: "m_inf^3"
	});
	
	// Create the chart within it's "holding" node
	var chart = new Chart("figure1aGoesHere", { 
		title: "Steady state activation curves",
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
	chart.addSeries("Original experimental data", potentialExperimentalOriginal, {
		plot: "experimental"
	});
	
	// define our axes
	chart.addAxis("V (mV)");
	chart.addAxis("m.sub(&infin).sup(3)", {
		vertical: true
	});
	
	// Add the tooltip for data points
	new Tooltip(chart, "experimental", {
		text: function(o) {
			return o.x + "," + o.y;
		}
	});
	
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