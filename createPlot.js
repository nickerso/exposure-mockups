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
	
	// the legend widget
	"dojox/charting/widget/Legend",
	
	// We'll use default x/y axes
	"dojox/charting/axis2d/Default",
	
	// Wait until the DOM is ready
	"dojo/domReady!"
], function(dom, CSV, DataSeries, Chart, theme, LinePlot, MarkersPlot, MarkersOnlyPlot, Tooltip, Legend) {
	// Once all modules in the dependency list have loaded, this
	// function is called to define the demo/myModule module.
	//
	// The dojo/dom module is passed as the first argument to this
	// function; additional modules in the dependency list would be
	// passed in as subsequent arguments.

	var oldText = {};
	


	// This returned object becomes the defined value of this module
	return {
		createFigure1: function(chartNode, legendNode, entities) {
			// set up the simulation data source
			var simulationData = new CSV({
				url: "/example-diagram/data/line.csv"
			});
			// and the data series for the potential data
			var potentialSimulationData = new DataSeries(simulationData, {}, {
				x: "time",
				y: "potential"
			});
			
			// set up the experimental data source
			var experimentalData = new CSV({
				url: "/example-diagram/data/line-data.csv"
			});
			// and the data series for the original experimental data
			var potentialExperimentalOriginal = new DataSeries(experimentalData, {}, {
				x: "time",
				y: "potential-original-source"
			});
			// and the data series for the temperature corrected experimental data used in the paper
			var potentialExperimental = new DataSeries(experimentalData, {}, {
				x: "time",
				y: "potential-current-paper"
			});
			
			// Create the chart within it's "holding" node
			var chart = new Chart(chartNode, { 
				title: "Membrane Potentials",
				titlePos: "bottom",
				titleGap: 25,
				//titleFont: "normal normal normal 15pt Arial",
				titleFontColor: "orange"
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
			chart.addAxis("x");
			chart.addAxis("y", {
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
			
			// create a legend
			var legend = new Legend({
				chart: chart, 
				horizontal: false,
				outline: true
			}, legendNode);
			
			
			
			
		
		
		
	
		// From here on is experimental stuff designed to create graphs for the entities.
		// Create data sets for each necessary graph. Ideally this would be done in the html 
		// file so that this script would be as general as possible. This would also allow
		// for a similar technique as in svgDiagram.js (getInfo etc) to be used to place each 
		// data set in the correct graph. This is being difficult though, I haven't been able
		// to find any way to do this online yet.
			var i_leakGraph = new CSV({
				url: "/example-diagram/i_leak_graph.csv"
			});
			var i_leakGraphSeries = new DataSeries(i_leakGraph, {}, {
				x: "time",
				y: "potential"
			});
			var i_leakPreview = new CSV({
				url: "/example-diagram/i_leak_preview.csv"
			});
			var i_leakPreviewSeries = new DataSeries(i_leakPreview, {}, {
				x: "time",
				y: "potential"
			});
			
				var i_KGraph = new CSV({
				url: "/example-diagram/i_K_graph.csv"
			});
			var i_KGraphSeries = new DataSeries(i_KGraph, {}, {
				x: "time",
				y: "potential"
			});
			var i_KPreviewSeries = new DataSeries(i_KGraph, {}, {
				x: "time",
				y: "potential"
			});
			
			var i_NaGraph = new CSV({
				url: "/example-diagram/i_Na_graph.csv"
			});
			var i_NaGraphSeries = new DataSeries(i_NaGraph, {}, {
				x: "time",
				y: "potential"
			});
			var i_NaPreviewSeries = new DataSeries(i_NaGraph, {}, {
				x: "time",
				y: "potential"
			});
			
			var membraneGraph = new CSV({
				url: "/example-diagram/membrane_graph.csv"
			});
			var membraneGraphSeries = new DataSeries(membraneGraph, {}, {
				x: "time",
				y: "potential"
			});
			var membranePreviewSeries = new DataSeries(membraneGraph, {}, {
				x: "time",
				y: "potential"
			});
		
			for (var name in entities) {
			// skip loop if the property is from prototype
			//if (!entities.hasOwnProperty(name)) continue;

				var obj = entities[name];
				

        // create the chart for the graph node
			var tag = obj.graph
			var htmlTag = document.getElementById(tag);
			
			
			var entityChart = new Chart(htmlTag, { 
				title: tag,
				titlePos: "bottom",
				titleGap: 25,
				//titleFont: "normal normal normal 15pt Arial",
				titleFontColor: "orange"
				});
				// Add a plot style for the chart 
				entityChart.addPlot("simulation1", {
					type: LinePlot
				});
				
				// This next line is the start of a more generalised section of code that hasn't gotten off the
				// ground yet. At the moment it doesnt do anything at all
				plotTag = document.getElementById(name+"GraphSeries")
			
				// Add the simulation data
				// All the if statements are hard coding to be phased out later once I've
				// figured out how to get the dataseries things to work in HTML. This would 
				// mean that the ideas I have for getting a generalised version of his file
				// working could be attempted.
				
				if (name === "membrane"){
				entityChart.addSeries("Simulation results", membraneGraphSeries, {
					plot: "simulation1"
				})}	else if (name === "i_leak"){
				entityChart.addSeries("Simulation results", i_leakGraphSeries, {
					plot: "simulation1"
				})}	else if (name === "i_Na"){
				entityChart.addSeries("Simulation results", i_NaGraphSeries, {
					plot: "simulation1"
				})}	else if (name === "i_K"){
				entityChart.addSeries("Simulation results", i_KGraphSeries, {
					plot: "simulation1"
				})} else{ alert("No data") };
				//alert(entityChart)
				// define our axes
				entityChart.addAxis("x");
				entityChart.addAxis("y", {
					vertical: true
				});
				// Render the chart!
				entityChart.render();
				
				
			//This section will create the chart for the preview node
			var tag2 = obj.preview
			var htmlTag2 = document.getElementById(tag2);
			alert("htmlTag2 = "+htmlTag2)
			// Create the chart within it's "holding" node
			var entityChart2 = new Chart(htmlTag2, { 
				title: tag2,
				titlePos: "bottom",
				titleGap: 25,
				//titleFont: "normal normal normal 15pt Arial",
				titleFontColor: "orange"
				});
				// Add a plot style for the chart 
				entityChart.addPlot("simulation2", {
					type: LinePlot
				});
				// Add the simulation data
				if (name === "membrane"){
				entityChart.addSeries("Simulation results", membranePreviewSeries, {
					plot: "simulation2"
				})}	else if (name === "i_leak"){
				entityChart.addSeries("Simulation results", i_leakPreviewSeries, {
					plot: "simulation2"
				})}	else if (name === "i_Na"){
				entityChart.addSeries("Simulation results", i_NaPreviewSeries, {
					plot: "simulation2"
				})}	else if (name === "i_K"){
				entityChart.addSeries("Simulation results", i_KPreviewSeries, {
					plot: "simulation2"
				})} else{ alert("No data") };
				
				// define our axes
				entityChart2.addAxis("x2");
				entityChart2.addAxis("y2", {
					vertical: true
				});
				// Render the chart!
				entityChart2.render();			
		}
			
			
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
	}
	}});