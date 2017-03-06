// Vanilla JavaScript. No templating framework is used.
window.onload= function cardMaker () {

	"use strict";
 	
 	// DocumentFragment must be the overarching parent element of appended children and the only el allowed to be
 	// appended to the document root/body. Anchor likely no longer needed. I'll call appendChild method on
 	// document.body after the main loop terminates. 
 	// docFragment is a UL which will have children cardObjs appended to it immediately before I attach docFragment to document.body.
 	var docFragment = document.createDocumentFragment("ul");

 	// Make a card object. serves as card template div that can be cloned.
	var cardObj1 = {};
	var cardObj1 = document.createElement("div");
	cardObj1.id = "card-obj-1";
	docFragment.appendChild(cardObj1);
	console.log(cardObj1);

	// cardObj1 = docFragment.querySelector(".card");
	// // cardObj1 = docFragment.querySelectorAll(" .card")[0];
	// cardObj1 = docFragment.firstElementChild(" .card");
	// cardObj1 = docFragment.querySelector(" .card");
	// cardObj1.createElement("div");
	// console.log("cardObj1", cardObj1);
 	
	// Fill in template divs with a loop that creates child divs but don't add text yet. Note I removed "card flex-container" 
	var divs = ["top-left", "bottom-right upsidedown", "suit", "rank", "the-center flex-container"];

 	for (var i=0; i<divs.length; i++) {
 		// console.log(divs[i]);
 		
  		var div = document.createElement("div");
  		// Assign classes to divs for referencing and for CSS layout
  		div.className = (divs[i]);
  		// console.log("div", div);

  		//the line below chucks all divs haphazardly into docFragment with no order
  		docFragment.appendChild(div);
  		
  		var children = [];
		children = docFragment.childNodes;
	}
	console.log("children", children);
	
	

	docFragment.appendChild(cardObj1);
	console.log("ln 32 cardObj1: ", cardObj1); 
	
	// APPEND CHILD DIVS TO CARD OBJ IN PROPER HIERARCHY. //  
	for (var child of children) {
		var firstChild = {} // HTML Div element;
		if (child.className === "top-left" || child.className === "bottom-right upsidedown" || child.className === "the-center flex-container" ) { //this line's output is missing bottom-right upsidedown no matter the order
			// console.log("all 3 class div", child); // success for all 3
			firstChild=child;
			// console.log(firstChild); // <div class="top-left"></div>  <div class="bottom-right upsidedown"></div>  <div class="the-center flex-container"></div>
			cardObj1.appendChild(firstChild); // 
		}
		else if (child.className === "rank" || child.className === "suit") {
			var grandchild = child;
			console.log(grandchild);
			// firstChild.appendChild(grandchild); // firstChild.appendChild is not a function
		} else {
			console.log("leftover child: ", child);
			// cardObj1.appendChild(child);
			// docFragment.appendChild(child);
		}
		
	}
	console.log("ln 56 cardObj1", cardObj1);
	// docFragment.appendChild(cardObj1);
	// document.body.appendChild(docFragment);
	// console.log("children", children);
	// console.log(typeof children);

	// var grandchildren = docFragment.querySelectorAll(" .suit .rank");
	// // children.appendChild(grandchildren);
	// console.log("grandchildren", grandchildren);
	// 	// cardObj = docFragment.querySelector(" .card").appendChild(" .top-left", " .bottom-right .upsidedown", " .the-center .flex-container")
	// 	// loop through that and for each, 
	// 	//.appendChild(" .suit"); 
	// 	//.appendChild(" .rank");
	
	// docFragment.appendChild(cardObj1);
	// console.log("cardObj1", cardObj1);


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
			var cardObj = cardObj1.cloneNode(true);

			cardObj.setAttribute("id", sym + char );
			// console.log("cardObj w id ", cardObj);
           
      		// Create a unique reference for all cards/get their SUIT class divs
			suitsArr = cardObj.querySelectorAll("#" + sym + char + " .suit");

			// Add sym json values to suit class divs
			for (let suitDiv of suitsArr) {
				// suitDiv.appendChild(document.createTextNode(sym) );
				suitDiv.appendChild(docFragment.createTextNode(sym) );

			}
			
			// Create a unique reference for all cards/get their RANK class divs
			ranksArr = cardObj.querySelectorAll("#" + sym + char + " .rank");
			
			// Add char json values to rank class divs
			for (let rankDiv of ranksArr) {
				// rankDiv.appendChild(document.createTextNode(char) ); 
				rankDiv.appendChild(docFragment.createTextNode(char) ); 

			}
		   
			// Create a unique reference for all cards/get their THE-CENTER class divs
			centerArr = cardObj.querySelectorAll("#" + sym + char + " .the-center");
			
			// Loop through the centers of all cards, copy existing div and append to center
			// for (let centerDiv of centerArr) {

			// 	if (typeof char === "string") {
			// 		centerDiv.classList.add("facecard");
					 
			// 		// Access one existing suit from card, clone, append to center div
			// 		var rankCopy = ranksArr[0].cloneNode(true);
			// 		centerDiv.appendChild(rankCopy);					
					
			// 	} else {
			// 		centerDiv.classList.add("numcard");

			// 		// Access one existing suit from card, clone on each iteration. 
			// 		// Number of iterations will match value of char. Append to center div.
			// 		var times = char;

			// 		for (var i=0; i<times; i++) {
			// 			var suitCopy = suitsArr[0].cloneNode(true);
			// 			centerDiv.appendChild(suitCopy);
			// 		}
			// 	}

			// }

			// If the card is a heart or diamond suit
			if (sym === "♥" || sym === "♦") {
	       		// Get card, add class red
	       		cardObj.classList.add("red");
	   		} 
		
		// SKIP Append all cardObjs to anchor (not docFragment UL) 
		// anchor.appendChild(cardObj);

		// Append each cardObj to docFragment as the loop terminates. 
		docFragment.appendChild(cardObj);

		}
				  
	}	

	// Finally, append docFragment loaded w 52 cardObjs onto DOM. docFragment vanishes, appending only its sub tree.	
	document.body.appendChild(docFragment);
	
}();
