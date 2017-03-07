// Vanilla JavaScript. No templating framework is used.
window.onload = function cardMaker() {

	"use strict";

	let docFragment = document.createDocumentFragment("ul");

	let template = function cardTemplateMaker() {
	 	// Make a card object. serves as card template div that can be cloned.
		let cardObjTemplate = {};
	    cardObjTemplate = document.createElement("div");
		cardObjTemplate.id = "card-template";
		docFragment.appendChild(cardObjTemplate);
		// console.log(cardObjTemplate); // empty object at this point


		// an array of first level child divs to add to cardObjTemplate
		let childDivs = ["top-left", "the-center flex-container", "bottom-right upsidedown"];
		
		// Create a reference for the card template when populated with its child divs
		const gotCard = docFragment.querySelector("#card-template");

		console.log(gotCard);

		// Make parent div but don't add text yet
		let parentDiv = document.createElement("div");
		parentDiv.className = "card flex-container";
		// console.log(parentDiv); // Good! "card flex-container"
        
        // gotCard.insertBefore(parentDiv, gotCard.childNodes[0]);
	    gotCard.appendChild(parentDiv, gotCard.childNodes[0]);
		
		
		// Make card divs but don't add text yet
		childDivs.forEach( function( entry ) {
			let childDiv = document.createElement("div");
			childDiv.className = entry;
			// console.log(childDiv); // Good! "top-left" "bottom-right upsidedown" "the-center flex-container"
			
			gotCard.appendChild(childDiv);
			// console.log("gotCard.nodeType", gotCard.nodeType); // Good! gotCard is the element node containing 3 divs.  
		}); 

		docFragment.appendChild(gotCard);

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


