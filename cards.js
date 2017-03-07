// Vanilla JavaScript. No templating framework is used.
window.onload = function cardMaker() {

  "use strict";

  var docFragment = document.createDocumentFragment("span");

	var template = function cardTemplateMaker() {
	 	// Make a card object to serve as card template div that can be cloned.
		let cardObjTemplate = {};
	    cardObjTemplate = document.createElement("div");
		cardObjTemplate.id = "card-template";
		docFragment.appendChild(cardObjTemplate);

		// Create a reference for the card template in its growing phase as it acquires more child divs
		let growingCard = docFragment.querySelector("#card-template");
		// console.log(growingCard);

		// Make card wrapper div
		let cardWrapDiv = document.createElement("div");
		cardWrapDiv.className = "card flex-container"; 
		// Append card wrapper div to the growing card template 
	    growingCard.appendChild(cardWrapDiv);
		
		// Make 3 second-level child divs from an array of div class names
		let childDivs = ["top-left", "the-center flex-container", "bottom-right upsidedown"];
		
		childDivs.forEach( function( entry ) {
			let childDiv = document.createElement("div");
			childDiv.className = entry;
			// Append the 3 first child divs within the cardWrapDiv
			growingCard.childNodes[0].appendChild(childDiv);
		}); 

		// Make 2 inner most divs 
		var suitDiv = document.createElement("div");
		var rankDiv = document.createElement("div");
		
		suitDiv.className = "suit";
		rankDiv.className = "rank";

		// Get top-left div and append suit div and rank div to it
		var ftl = function fillTopLeft(){
			var getTopLeft = docFragment.querySelector(" .top-left");
			getTopLeft.appendChild(suitDiv);
			getTopLeft.appendChild(rankDiv);
			return getTopLeft;
		}();

		// Get bottom-right div, clone suit div and rank div, and append them to bottom-right div
		var fbr = function fillBottomRight(){
			var getBottomRight = docFragment.querySelector(" .bottom-right");
			var suitDup = suitDiv.cloneNode();
			var rankDup = rankDiv.cloneNode(); 
			getBottomRight.appendChild(suitDup);
			getBottomRight.appendChild(rankDup);
			return getBottomRight;
		}();

		// Now that the card is done growing, rename it back to cardObjTemplate. 
		growingCard = cardObjTemplate;
		// return cardObjTemplate; // didn't work
		docFragment.appendChild(cardObjTemplate);

	}(); // closes var template = function cardTemplateMaker(cardObjTemplate) {
	  
	
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

		theTemplate = docFragment.querySelector("#card-template");
		// console.log(theTemplate);
		// Create an anchor span on which all cards will be appended at the bottom of the loop.
		// After the loop terminates, then append this anchor to the actual DOM.                                                    
		// anchor = docFragment.createElement("span");	
		
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
				console.log(cardObj);
	           
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
				// anchor.appendChild(cardObj);
				docFragment.appendChild(cardObj);
			}
					  
		}	

		// Append all cards on span onto document fragment after the loop has terminated 
		// docFragment.appendChild(anchor); 
	
	}(); // closes let deck = function deckMaker () {
	
	// Finally, append all cards onto DOM. docFragment vanishes, appending only its sub tree.	
	document.body.appendChild(docFragment);
	
}();


