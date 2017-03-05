// Vanilla JavaScript. No templating framework is used.

window.onload= function cardMaker () {

	"use strict";

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

	// The template object based on the hidden HTML element 
	theTemplate = document.getElementById("the-template"); 
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

			}
			
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
	
}();

