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
	// console.log(cardObj1); // empty object at this point

	// an array of first level child divs to add to cardObj1
	var childDivs = ["top-left", "the-center flex-container", "bottom-right upsidedown"];

	// Make card divs but don't add text yet
	// function makeChildDivs(childDivs.forEach(childDiv, function(){
	childDivs.forEach( function( entry ) {
		var childDiv = document.createElement("div");
		childDiv.className = entry;
		// console.log(childDiv); // Good! "top-left" "bottom-right upsidedown" "the-center flex-container"
		
		var gotCard = docFragment.querySelector("#card-obj-1");
		gotCard.appendChild(childDiv);
		console.log("gotCard", gotCard); // Good! 

		// docFragment.appendChild(childDiv);

		// return childDiv;

	}); // closing for childDivs.forEach...

	
	
	// Finally, append docFragment loaded w 52 cardObjs onto DOM. docFragment vanishes, appending only its sub tree.	
	document.body.appendChild(docFragment);
	
}();

// function deckMaker () {
// 
// }();
// 
