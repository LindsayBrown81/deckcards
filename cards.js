// Vanilla JavaScript. No templating framework is used.
window.onload= function cardMaker () {

	"use strict";

	// No longer allowed to use a template
	// theTemplate = document.getElementById("the-template"); 	
  
  	// I'm forming a plan to dynamically generate/declare and initialize 
  	// 1) a card list which will be the only element appended onto the document
  	//    root (only one is allowed, correct?). So, cardObjList would be the parent. 
  	// 2) a card object which I'll name cardObj, and 
  	// 3) card parts such as suit div and rank div. I think I will need to create text 
  	//    nodes first, then use appendChild(sym or char 
  	//    items from json), which will be similar to original approach starting on line 38
 	
 	// DocumentFragment must be the overarching parent element of appended children
 	// and the only el allowed to be appended to the document root. Anchor likely no longer needed.
 	// I'm going to use the image tag as the element to append my docFragment UL to
 	// because I like where it is positioned on the page. 
 	// I'll call appendChild method on element after the make template loop terminates.
 		// WRONG: docFragment is a UL which will have 52 child cardObj LIs appended to it before the outer loop terminates.
 	// docFragment is a UL which will have one child cardObj LI appended to it immediately before I append docFragment to 
 	// the pre-existing element.
 	var element  = document.getElementsByTagName("img")[0];
	// The fragment vanishes upon getting appended, leaving only its children (child LI?) appended to element.
 	var docFragment = document.createDocumentFragment("ul");
 	
	// Make template with a loop that creates child divs for one cardObj but don't add text yet
	var divs = ["card flex-container", "top-left", "bottom-right upsidedown", "suit", "rank", "the-center flex-container"];

 	for (var i=0; i<divs.length; i++) {
 		console.log(divs[i]);
 		
  		var div = document.createElement("div");
  		// Assign classes to divs for referencing and for CSS layout
  		div.className = (divs[i]);
		// for (let card of cardArr) {
				// card.appendChild(document.createElement("div") );
		// 	}
 		// cardObj.appendChild(div); // not yet appended to document root on DOM
 		docFragment.appendChild(div);
	}

	element.appendChild(docFragment);
	
	// Make a card object and append child divs to it. This will serve as a card template div that can be cloned.
	var cardObj = {};
	cardObj = element.querySelector(" .card");
	console.log("cardObj: ", cardObj);

	
	var cardJson = {},
		sym = "";
		
	// Hardcoded JSON for storing card data
	cardJson = 
	  {
	  	"syms": [ "♠", "♥", "♣", "♦" ],
	  	"chars": [ "A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K" ]
	  };
 	
	// Add text nodes to divs  
	// Loop through the first array in cardJson and ...
	for (let sym of cardJson.syms) { 
        
      let char = "";

		// ...for each item in first array, loop through the second array	
	  	for (let char of cardJson.chars) {
        // 
	  		let suitsArr = [],
			    ranksArr = [],	
			    centerArr = [],		
			    suitDiv = {},
			    rankDiv = {},
			    centerDiv = {};

		  	// No longer allowed to use template: Create deep clone of the template with true
			// cardObj = theTemplate.cloneNode(true);
			

			cardObj.setAttribute("id", sym + char );
			console.log("cardObj w id ", cardObj);
           
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
	
		// Append all cardObjs to docFragment UL (which takes place of 1st version's anchor span tag) 
		// document.body.appendChild(docFragment);		
		}
				  
	}	

	// Finally, append each card onto pre-existing DOM element after the loop has terminated 
	element.appendChild(docFragment);
	
}();

// SCRAPS

// Create an anchor span on which all cards will be appended at the bottom of the loop.
	// After the loop terminates, then append this anchor to the actual DOM. 
	// var anchor = document.createElement("span");
	

//// DocumentFragment must be the overarching parent element of appendChilds
	// var cardObjList = [];
	// var i = 0;
	// var docFragment = document.createDocumentFragment(); // ("ul");
 	
 // 	while (i < 52) {
 // 	while (i < 156) {
 // 		cardObjList = document.createElement("ul");
 // 		cardObjList.innerText = "List item #: " + i;
 // 		fragment.appendChild(cardObjList);
 // 	i++; }
