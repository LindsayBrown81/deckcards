// Vanilla JavaScript. No templating framework is used.
window.onload= function cardMaker () {

	"use strict";

	var cardJson = {},
		sym = "";
		
	// Hardcoded JSON
	cardJson = 
	  {
	  	"syms": [ "♠", "♥", "♣", "♦" ],
	  	"chars": [ "A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K" ]
	  };

	// No longer allowed to use a template
	// theTemplate = document.getElementById("the-template"); 	
  
  	// I'm forming a plan to dynamically generate/declare and initialize 
  	// 1) a card list which will be the only element appended onto the document
  	//    root (only one is allowed, correct?). So, cardObjList would be the parent. 
  	// 2) a card object which I'll name cardObj, and 
  	// 3) card parts such as suit div and rank div. I think I will need to create text 
  	//    nodes first, then use appendChild(sym or char 
  	//    items from json), which will be similar to original approach starting on line 38
  	
  	var cardObjList = document.createElement("ul");
	// cardObjList = contentDocument.documentElement;
 	// document.appendChild(cardObjList);
 	document.body.appendChild(cardObjList);
 	
 	// Create an anchor span on which all cards will be appended at the bottom of the loop.
	// After the loop terminates, then append this anchor to the actual DOM. 
	var anchor = document.createElement("span");

	// var cardObj = document.createElement("div");

	// Make card divs but don't add text yet
	function makeDiv(){
		var div = document.createElement("div");
		// div.appendChild(document.createTextNode(text));
		return div;
	}
	
	var divs = [
		makeDiv("cardObj"), // ERROR: cardObj is not defined STOP POINT
		makeDiv("topLeft"),
	 	makeDiv("bottomRight"),
	 	makeDiv("suit"),
	 	makeDiv("rank"),
	 	makeDiv("theCenter")
 	];

 	var docFragment = document.createDocumentFragment();
 	
 	for(var i=0; i<divs.length; i++) {
 		console.log(divs[i]);
 		docFragment.appendChild(divs[i]); // not yet appended to document root on DOM
	}
	// Append all divs to anchor for card
	// anchor.appendChild(docFragment);
	cardObjList.appendChild(docFragment);
  	
  	// Assign classes to divs for layout and painting	
	anchor.className = "flex-container";
	cardObj.className = "card flex-container";
	topLeft.className = "top-left";
	bottomRight.className = "bottom-right upsidedown";
	suit.className = "suit";
	rank.className = "rank";
	theCenter.className = "the-center flex-container";

	// Add text nodes to divs  
	// Loop through the first array in cardJson and ...
	for (let sym of cardJson.syms) { 
        
      let char = "";

		// ...for each item in first array, loop through the second array	
	  	for (let char of cardJson.chars) {
        // cardObj = {},
	  		let suitsArr = [],
			    ranksArr = [],	
			    centerArr = [],		
			    suitDiv = {},
			    rankDiv = {},
			    centerDiv = {};

		  	// No longer allowed to use template: Create deep clone of the template with true
			// cardObj = theTemplate.cloneNode(true);

			// Is my cardObj a DOM el yet if it has not yet been appended to the DOM?
			// If not, I cannot use setAttribute 
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

	   		anchor.appendChild(cardObj);

	   		// cardObjList.push(cardObj);
				
			// Add all cardObjs to anchor span, to be rendered when loop has terminated
			cardObjList.appendChild(anchor);
		}
				  
	}	

	// Finally, append anchor span on to DOM after the loop has terminated 
	// document.getElementById("card-obj-list").appendChild(anchor); 
  // document.appendChild(cardObjList);

  // cardObjList.appendChild("anchor");
  // document.appendChild(cardObjList);
	
}();

