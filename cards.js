// Vanilla JavaScript. No templating framework is used. 
// Two main functions. One IIFE makes card template. Other IIFE makes the whole deck.
window.onload = function cardMaker(){

  "use strict";

  // Create empty DocumentFragment object on which a subtree of nodes will get appended 
  // without accessing DOM. Reduces reflow to one DOM trip.
  let docFragment = document.createDocumentFragment("ul");

	let template = function cardTemplateMaker(){
	 	// Make a card object that references card template div; to be cloned in separate,
	 	// encapsulated deckMaker function
		let cardObjTemplate = {};

		cardObjTemplate = document.createElement("div");
		cardObjTemplate.id = "card-template";
		docFragment.appendChild(cardObjTemplate);
		
		// Make card wrapper div
		let cardWrapDiv = {};
		
		cardWrapDiv = document.createElement("div");
		cardWrapDiv.className = "card flex-container";
		cardObjTemplate.appendChild(cardWrapDiv);
		
		// Make 3 child divs from an array of div class names
		let childDivs = [],
			childDiv = {};
		
		childDivs = ["top-left", "the-center flex-container", "bottom-right upsidedown"];

		childDivs.forEach( ( entry ) =>{
			childDiv = document.createElement("div");
			childDiv.className = entry;
			// Append each childDiv to the cardObjTemplate's cardWrapDiv
			cardObjTemplate.childNodes[0].appendChild(childDiv);
		}); 

		// Make 2 inner-most divs, suit and rank. Opting not to loop for just 2 divs. 
		let rankDiv = {},
			suitDiv = {};

		rankDiv = document.createElement("div");
		suitDiv = document.createElement("div");
		rankDiv.className = "rank";
		suitDiv.className = "suit";

		// Get top-left div and append suit and rank divs to it
		let getTopLeft = {};

		let ftl = function fillTopLeft(){
			getTopLeft = docFragment.querySelector(".top-left");
			getTopLeft.appendChild(rankDiv);
			getTopLeft.appendChild(suitDiv);
			return getTopLeft;
		}();

		// Get bottom-right div, clone suit and rank divs, append copies to bottom-right div
		let getBottomRight = {},
			rankDup = {},
			suitDup = {};

		let fbr = function fillBottomRight(){
			getBottomRight = docFragment.querySelector(".bottom-right");
			rankDup = rankDiv.cloneNode();
			suitDup = suitDiv.cloneNode();
			getBottomRight.appendChild(rankDup);
			getBottomRight.appendChild(suitDup);
			return getBottomRight;
		}();

	}(); // closes cardTemplateMaker function
	  
	
	let deck = function deckMaker(){
		
		let cardJson = {},
			theTemplate = {},
			anchor = {},
			sym = "";
		
		// Hardcoded JSON
		cardJson = 
		  {
		  	"syms": [ "♠", "♥", "♣", "♦" ],
		  	"chars": [ "A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K" ]
		  };

		theTemplate = docFragment.querySelector("#card-template");
		// Create an anchor span on which all cards will be appended at bottom of loop                                       
		anchor = document.createElement("span");
		// Append anchor as parent on document fragment 
		docFragment.insertBefore(anchor, theTemplate);	
		
		// Loop through the first array in cardJson and ...
		for (let sym of cardJson.syms){

			let char = ""; // or number

			// ...for each item in first array, loop through the second array	
		  	for (let char of cardJson.chars){

		  		let cardObj = {}, 
		  		    suitsArr = [],
				    ranksArr = [],	
				    centerArr = [],		
				    suitDiv = {},
				    rankDiv = {},
				    centerDiv = {};

		  		// Create deep clone of the template with true
				cardObj = theTemplate.cloneNode(true);
				// Create a unique reference for all cards
				cardObj.setAttribute("id", sym + char );
	      		
				// Get all cards' SUIT class divs
				suitsArr = cardObj.querySelectorAll("#" + sym + char + " .suit");
				// Add sym json values to suit class divs
				for (suitDiv of suitsArr){
					suitDiv.appendChild(document.createTextNode(sym) );
				}
				
				// Get all cards' RANK class divs
				ranksArr = cardObj.querySelectorAll("#" + sym + char + " .rank");
				// Add char json values to rank class divs
				for (rankDiv of ranksArr){
					rankDiv.appendChild(document.createTextNode(char) ); 
				}
			   
				// Get all cards' THE-CENTER class divs
				centerArr = cardObj.querySelectorAll("#" + sym + char + " .the-center");
				// Loop through the centers of all cards, check json value type to determine center 
				// div's class assignment, which existing div to clone and number of copies needed
				for (centerDiv of centerArr){

					if (typeof char === "string"){
						centerDiv.classList.add("facecard");
						 
						// Access one existing rank from card, clone, append to center div
						let rankCopy = ranksArr[0].cloneNode(true);
						centerDiv.appendChild(rankCopy);					
						
					} else {
						centerDiv.classList.add("numcard");

						// Access one existing suit from card, clone on each iteration. 
						// Number of iterations will match value of char. Append to center div
						let times = char,
							suitCopy = {};

						for (let i=0; i<times; i++){
							suitCopy = suitsArr[0].cloneNode(true);
							centerDiv.appendChild(suitCopy);
						}
					}

				} // closes centerDivs for...of loop
				
				// Color the heart and diamond cards red
				if (sym === "♥" || sym === "♦") {
		       		// Get card, add class red
		       		cardObj.classList.add("red");
		       	} 
					
				// Append all cardObjs to anchor span, to be rendered when loop has terminated
				anchor.appendChild(cardObj);
			}
					  
		} // closes deckMaker loop 	

		
		// Append anchor onto document fragment 
		docFragment.appendChild(anchor); 
	
	}(); // closes deckMaker function
	
	// Append document fragment onto DOM, which "vanishes," appending only its subtree nodes	
	document.body.appendChild(docFragment);
	
}();


