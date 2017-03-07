// Vanilla JavaScript. No templating framework is used.
window.onload = function cardMaker() {

	"use strict";

	var docFragment = document.createDocumentFragment("ul");

	
	var template = function cardTemplateMaker() {
	 	// Make a card object. serves as card template div that can be cloned.
		let cardObjTemplate = {};
	    cardObjTemplate = document.createElement("div");
		cardObjTemplate.id = "card-template";
		docFragment.appendChild(cardObjTemplate);
		// console.log(cardObjTemplate); // empty object at this point

		// Create a reference for the card template in its growing phase/as it gets more child divs
		const growingCard = docFragment.querySelector("#card-template");

		console.log(growingCard);

		// Make card wrapper div but don't add text yet
		let cardWrapDiv = document.createElement("div");
		cardWrapDiv.className = "card flex-container"; // Good! "card flex-container"
		// Append card wrapper div to the growing card template 
	    growingCard.appendChild(cardWrapDiv);
		
		// Make card child divs but don't add text yet
		// an array of first level child divs to add to growingCard
		let childDivs = ["top-left", "the-center flex-container", "bottom-right upsidedown"];
		
		childDivs.forEach( function( entry ) {
			let childDiv = document.createElement("div");
			childDiv.className = entry;
			// console.log(childDiv); // Good! "top-left" "bottom-right upsidedown" "the-center flex-container"
			
			// Append the 3 child divs WITHIN the cardWrapDiv
			growingCard.childNodes[0].appendChild(childDiv);
			// console.log("growingCard.nodeType", growingCard.nodeType); // 1. growingCard is an element node.  
		}); 

		// Make 2 inner most divs but don't add text yet. MOVE THESE TWO LINES TO GLOBAL?
		var suitDiv = document.createElement("div");
		var rankDiv = document.createElement("div");
		
		suitDiv.className = "suit";
		rankDiv.className = "rank";

		// Get top-left div and append suit div and rank div to it
		var ftl = function fillTopLeft(){
			var getTopLeft = docFragment.querySelector(" .top-left");
			getTopLeft.appendChild(suitDiv);
			getTopLeft.appendChild(rankDiv);
			console.log("getTopLeft", getTopLeft);
			return getTopLeft;
		}();

		// Get bottom-right div, clone suit div and rank div, and append them to bottom-right div
		var fbr = function fillBottomRight(){
			var getBottomRight = docFragment.querySelector(" .bottom-right");
			var suitDup = suitDiv.cloneNode();
			var rankDup = rankDiv.cloneNode(); 
			getBottomRight.appendChild(suitDup);
			getBottomRight.appendChild(rankDup);
			console.log("getBottomRight", getBottomRight);
			return getBottomRight;
		}();

		docFragment.appendChild(growingCard);

	    // Finally, append docFragment loaded w 52 cardObjs onto DOM. docFragment vanishes, appending only its sub tree.	
		document.body.appendChild(docFragment); 

	}(); // closes function cardTemplateMaker() {
	  
	// Whats global: nothing from cardTemplateMaker function, but the DOM element it appended to document body.
	
	let deck = function deckMaker () {
		
		let cardJson = {},
			theTemplate = "",
		  	anchor = {},
		  	sym = "";
		
		// Hardcoded JSON
		cardJson = 
		  {
		  	"syms": [ "♠", "♥", "♣", "♦" ],
		  	"chars": [ "A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K" ]
		  };

		// The template object based on the element with id of card-template
		theTemplate = document.getElementById("card-template"); 
		console.log(theTemplate);
		// Create an anchor span on which all cards will be appended at the bottom of the loop.
		// After the loop terminates, then append this anchor to the actual DOM.                                                    
		anchor = document.createElement("span");	
		
		// Loop through the first array in cardJson and ...
		for (let sym of cardJson.syms) {
	        
	      	let char = "";

			// ...for each item in first array, loop through the second array	
		  	for (let char of cardJson.chars) {

		  		let cardObj = {}, 
		  		    suitsArr = [],
				    ranksArr = [],	
				    centerArr = [],		
				    suitDiv = {},
				    rankDiv = {},
				    centerDiv = {};

		  		// Create deep clone of the template with true
				cardObj = theTemplate.cloneNode(true);
				cardObj.setAttribute("id", sym + char );
	           
	      		// Create a unique reference for all cards/get their SUIT class divs
				suitsArr = cardObj.querySelectorAll("#" + sym + char + " .suit");

				// Add sym json values to suit class divs
				for (let suitDiv of suitsArr) {
					suitDiv.appendChild(document.createTextNode(sym) );
				}
				
				// Create a unique reference for all cards/get their RANK class divs
				ranksArr = cardObj.querySelectorAll("#" + sym + char + " .rank");
				
				// Add char json values to rank class divs
				for (let rankDiv of ranksArr) {
					rankDiv.appendChild(document.createTextNode(char) ); 
				}
			   
				// Create a unique reference for all cards/get their THE-CENTER class divs
				centerArr = cardObj.querySelectorAll("#" + sym + char + " .the-center");
				
				// Loop through the centers of all cards, copy existing div and append to center
				for (let centerDiv of centerArr) {

					if (typeof char === "string") {
						centerDiv.classList.add("facecard");
						 
						// Access one existing suit from card, clone, append to center div
						var rankCopy = ranksArr[0].cloneNode(true);
						centerDiv.appendChild(rankCopy);					
						
					} else {
						centerDiv.classList.add("numcard");

						// Access one existing suit from card, clone on each iteration. 
						// Number of iterations will match value of char. Append to center div
						var times = char;

						for (var i=0; i<times; i++) {
							var suitCopy = suitsArr[0].cloneNode(true);
							centerDiv.appendChild(suitCopy);
						}
					}

				} // closes for (let centerDiv of centerArr) {
				
				// If the card is a heart or diamond suit
				if (sym === "♥" || sym === "♦") {
		       		// Get card, add class red
		       		cardObj.classList.add("red");
		   		} 
					
				// Add all cardObjs to anchor span, to be rendered when loop has terminated
				anchor.appendChild(cardObj);
			}
					  
		}	

		// Finally, append anchor span on to DOM after the loop has terminated 
		document.getElementById("card-obj-list").appendChild(anchor); 
	
	
	}();//(); // closes let deck = function deckMaker () {
	
	// Finally, append docFragment loaded w 52 cardObjs onto DOM. docFragment vanishes, appending only its sub tree.	
	// document.body.appendChild(docFragment);
	
}();


