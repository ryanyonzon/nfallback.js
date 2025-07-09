/**
 * Check the following JavaScript methods if supported natively:
 *    - indexOf
 *    - lastIndexOf
 *    - every
 *    - filter
 *    - forEach
 *    - map
 *    - some
 *
 * Copyright (c) 2012 Ryan Yonzon <ryanyonzon@gmail.com>
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

(function() {

	var ul = document.getElementById("list");
	var li = document.createElement("li");

	// indexOf
	if (!Array.prototype.indexOf) {
		li.appendChild(document.createTextNode("indexOf: NOT supported natively"));
	} else {
		li.appendChild(document.createTextNode("indexOf: Supported natively"));
	}
	ul.appendChild(li);

	// lastIndexOf
	li = document.createElement("li");
	if (!Array.prototype.lastIndexOf) {
		li.appendChild(document.createTextNode("lastIndexOf: NOT supported natively"));
	} else {
		li.appendChild(document.createTextNode("lastIndexOf: Supported natively"));
	}
	ul.appendChild(li);

	// every
	li = document.createElement("li");
	if (!Array.prototype.every) {
		li.appendChild(document.createTextNode("every: NOT supported natively"));
	} else {
		li.appendChild(document.createTextNode("every: Supported natively"));
	}
	ul.appendChild(li);

	// filter
	li = document.createElement("li");
	if (!Array.prototype.filter) {
		li.appendChild(document.createTextNode("filter: NOT supported natively"));
	} else {
		li.appendChild(document.createTextNode("filter: Supported natively"));
	}
	ul.appendChild(li);

	// forEach
	li = document.createElement("li");
	if ( !Array.prototype.forEach ) {
		li.appendChild(document.createTextNode("forEach: NOT supported natively"));
	} else {
		li.appendChild(document.createTextNode("forEach: Supported natively"));
	}
	ul.appendChild(li);

	// map
	li = document.createElement("li");
	if (!Array.prototype.map) {
		li.appendChild(document.createTextNode("map: NOT supported natively"));
	} else {
		li.appendChild(document.createTextNode("map: Supported natively"));
	}
	ul.appendChild(li);

	// some
	li = document.createElement("li");	
	if (!Array.prototype.some) {
		li.appendChild(document.createTextNode("some: NOT supported natively"));
	} else {
		li.appendChild(document.createTextNode("some: Supported natively"));
	}
	ul.appendChild(li);

})();