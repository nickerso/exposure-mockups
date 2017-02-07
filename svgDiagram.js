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
				
				//this is to make sure the menu disappears once the screen is clicked off the menu on the 
				//window. I attempted to use another mouse event in order to avoid down reusing code, but it 
				//didn't function the same.
				window.addEventListener("click", function(e){
					require(["dojo/dom-construct", "dojo/dom", "dojo/on", "dojo/domReady!"],
					function(domConstruct, dom, on){	
						domConstruct.empty("menus");	
					});
				});
				window.addEventListener("contextmenu", function(e){
					require(["dojo/dom-construct", "dojo/dom", "dojo/on", "dojo/domReady!"],
					function(domConstruct, dom, on){								
						domConstruct.empty("menus");								
					});
				});
				
				/*
				  This set of functions highlights the entity when the mouse is placed over it, before 
				  resetting the stroke value after the mouse is then removed. It seems it changes the stroke to
				  the one that is the the stroke value of the final declared element in the index.html
				  document. This means that the issue is irrelevant if the outline (stroke) colours
				  of all the elements are the same. It's still a work in progress.
				*/
			
				var a = document.getElementById("diagram1");
				var innerElement=a.contentDocument;
				var elementId=innerElement.getElementById(id);
				var originalStroke = elementId.style.stroke;
				
				svg.addEventListener("mouseenter", function(e){
					//Set a variables that allow access to the properties we want
					var entity = AllEntities[diagramObjectId][e.srcElement.id];
					var a = document.getElementById("diagram1");
					var innerElement=a.contentDocument;
					var elementId=innerElement.getElementById(entity.id);
					var originalStroke = elementId.style.stroke;
					//Change the stroke value, and then reset it after a certain period of time
					elementId.style.stroke="00ffff";
					return originalStroke	
				});
				svg.addEventListener("mouseout", function(e){
						var entity = AllEntities[diagramObjectId][e.srcElement.id];
						var a = document.getElementById("diagram1");
						var innerElement=a.contentDocument;
						var elementId=innerElement.getElementById(entity.id);
						elementId.style.stroke=originalStroke;
				});
				
				svg.addEventListener("click", function(e) {
					var entity = AllEntities[diagramObjectId][e.srcElement.id];
					console.debug(entity);
					alert("This would do something for clicking on the object: " + entity.id);
				}, false);
				svg.addEventListener("contextmenu", function(e) {
					var entity = AllEntities[diagramObjectId][e.srcElement.id];
					console.debug(entity);
					//This next line prevents a default menu from popping up when the 
					//entity is right clicked.
					e.preventDefault();
					
					//empty the DOM element containing any previous menus
					require(["dojo/dom-construct", "dojo/dom", "dojo/on", "dojo/domReady!"],
						function(domConstruct, dom){								
								domConstruct.empty("menus");								
							});
							
				    //create a new menu
					require(["dijit/Menu", "dijit/MenuItem", "dijit/PopupMenuItem", "dijit/MenuSeparator", "dojo/domReady!"], 
					function(Menu, MenuItem, PopupMenuItem, MenuSeparator){
						// create the Menu 
							var menu = new Menu({
								//targetNodeIds:["menus"]
							});
							
						//create menu items
							menu.addChild(new MenuItem({
								/*
								  This function below uses the name of an element in AllEntities
								  to call an element in the html document that has the same name.
								*/
								onClick: function toEquations(){
									var tag = entity.equations
									var htmlTag = document.getElementById(tag)
									var info = htmlTag.getBoundingClientRect()
									window.scrollTo(0, info.top)	
									},
								label: (entity.id + " equations")
							}));

							menu.addChild(new MenuItem({
								//This function essentially does the same thing as the one above. 
								onClick: function toInfo(){
									var tag = entity.info
									var htmlTag = document.getElementById(tag)
									var info = htmlTag.getBoundingClientRect()
									window.scrollTo(0, info.top)
									},
								label: (entity.id+" information")
							}));							
					
							menu.addChild(new MenuItem({
								onClick: function(){alert("This would go to a graph relevant to the element selected")},
								/*
								  This is pretty much a slightly reworked copy of toEquations and toInfo. 
								  Functionally it is identical, it just references a different property
								  of the entity selected.
								*/
								onClick: function toGraph(){
									var tag = entity.graph
									var htmlTag = document.getElementById(tag)
									var info = htmlTag.getBoundingClientRect()
									window.scrollTo(0, info.top)
									},								
								label: ("Graph for: "+entity.id)
							}));
							
							menu.addChild(new MenuItem({
								//This function creates a modal that can contain images specific
								//to the svg element clicked. Essentially this creates an image 
								//containing popup when the menu button is clicked.
								onClick: function(){
									//This first section borrows heavily from toInfo, as it uses the 
									//same sort of code in order to ensure that each svg element will
									//link to its own unique graph.
									var tag = entity.preview;
									var htmlTag = document.getElementById(tag);
									//This section is all new, based on the w3schools modal tutorial.
									//Essentially it sets up a modal and places the correct image 
									//inside it, while making the modal visible.
									var modal = document.getElementById('myModal');
									var modalImg = document.getElementById('img01');
									var captionText = document.getElementById('caption');
									modal.style.display = "block";
									modalImg.src = htmlTag.src;
									captionText.innerHTML = htmlTag.alt;
									//This sets up the element that closes the modal
									var closeButton = document.getElementsByClassName("close")[0];
									// This function closes the modal when the close button is clicked
									closeButton.onclick = function() { 
										modal.style.display = "none";
									}
								},
								label: (entity.id+" preview"),
							}));
	
							menu.addChild(new MenuSeparator());
							
							var submenu = new Menu();
							
							submenu.addChild(new MenuItem({
								label:("Other "+membrane_graph+" Action 1")
							}));
							
							submenu.addChild(new MenuItem({
								label: ("Other "+entity.id+" Action 2")
							}));
							
							menu.addChild(new PopupMenuItem({
								label: "Other Actions",
								popup: submenu
							}));
					
							menu.placeAt("menus");
							menu.startup();	
						});							
					//alert("This would pop up a context menu for the object: " + entity.id);
					// see https://dojotoolkit.org/reference-guide/1.10/dijit/Menu.html to get started...
				}, false);				
			}
			AllEntities[diagramObjectId] = entities;
			//console.dir(AllEntities)
		}
	};
});
