/**
 * nfallback.js - Add ECMA-262 (5th edition) Array methods if not supported natively.
 *
 * Codes are from Mozilla Developer Network (MDN):
 * https://developer.mozilla.org/en-US/docs/JavaScript/New_in_JavaScript/1.6?redirectlocale=en-US&redirectslug=New_in_JavaScript_1.6
 *
 * Copyrights, please read: https://developer.mozilla.org/en-US/docs/Project:Copyrights
 *
 * Compiled and unit tested by Ryan Yonzon <ryanyonzon@gmail.com>
 */

(function() {

  // indexOf
  // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
  if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
          "use strict";

          if (this == null) {
              throw new TypeError();
          }
          var t = Object(this);
          var len = t.length >>> 0;
          if (len === 0) {
              return -1;
          }
          var n = 0;
          if (arguments.length > 1) {
              n = Number(arguments[1]);
              if (n != n) { // shortcut for verifying if it's NaN
                  n = 0;
              } else if (n != 0 && n != Infinity && n != -Infinity) {
                  n = (n > 0 || -1) * Math.floor(Math.abs(n));
              }
          }
          if (n >= len) {
              return -1;
          }
          var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
          for (; k < len; k++) {
              if (k in t && t[k] === searchElement) {
                  return k;
              }
          }
          return -1;
      }
  }

  // lastIndexOf
  // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/lastIndexOf
  if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
      "use strict";

      if (this == null)
        throw new TypeError();
   
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0)
        return -1;
   
      var n = len;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n)
          n = 0;
        else if (n != 0 && n != (1 / 0) && n != -(1 / 0))
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
   
      var k = n >= 0
            ? Math.min(n, len - 1)
            : len - Math.abs(n);
   
      for (; k >= 0; k--) {
        if (k in t && t[k] === searchElement)
          return k;
      }
      return -1;
    };
  }

  // every
  // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every
  if (!Array.prototype.every) {
    Array.prototype.every = function(fun /*, thisp */) {
      "use strict";
   
      if (this == null)
        throw new TypeError();
   
      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun != "function")
        throw new TypeError();
   
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t && !fun.call(thisp, t[i], i, t))
          return false;
      }
   
      return true;
    };
  }

  // filter
  // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      "use strict";
   
      if (this == null)
        throw new TypeError();
   
      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun != "function")
        throw new TypeError();
   
      var res = [];
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, t))
            res.push(val);
        }
      }
   
      return res;
    };
  }

  // forEach
  // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
  // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // Reference: http://es5.github.com/#x15.4.4.18
  if ( !Array.prototype.forEach ) {
    Array.prototype.forEach = function( callback, thisArg ) {
   
      var T, k;
   
      if ( this == null ) {
        throw new TypeError( "this is null or not defined" );
      }
   
      // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
      var O = Object(this);
   
      // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0; // Hack to convert O.length to a UInt32
   
      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if ( {}.toString.call(callback) != "[object Function]" ) {
        throw new TypeError( callback + " is not a function" );
      }
   
      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if ( thisArg ) {
        T = thisArg;
      }
   
      // 6. Let k be 0
      k = 0;
   
      // 7. Repeat, while k < len
      while( k < len ) {
   
        var kValue;
   
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if ( k in O ) {
   
          // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
          kValue = O[ k ];
   
          // ii. Call the Call internal method of callback with T as the this value and
          // argument list containing kValue, k, and O.
          callback.call( T, kValue, k, O );
        }
        // d. Increase k by 1.
        k++;
      }
      // 8. return undefined
    };
  }

  // map
  // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map
  // Production steps of ECMA-262, Edition 5, 15.4.4.19
  // Reference: http://es5.github.com/#x15.4.4.19
  if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
   
      var T, A, k;
   
      if (this == null) {
        throw new TypeError(" this is null or not defined");
      }
   
      // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
      var O = Object(this);
   
      // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;
   
      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if ({}.toString.call(callback) != "[object Function]") {
        throw new TypeError(callback + " is not a function");
      }
   
      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (thisArg) {
        T = thisArg;
      }
   
      // 6. Let A be a new array created as if by the expression new Array(len) where Array is
      // the standard built-in constructor with that name and len is the value of len.
      A = new Array(len);
   
      // 7. Let k be 0
      k = 0;
   
      // 8. Repeat, while k < len
      while(k < len) {
   
        var kValue, mappedValue;
   
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {
   
          // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
          kValue = O[ k ];
   
          // ii. Let mappedValue be the result of calling the Call internal method of callback
          // with T as the this value and argument list containing kValue, k, and O.
          mappedValue = callback.call(T, kValue, k, O);
   
          // iii. Call the DefineOwnProperty internal method of A with arguments
          // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
          // and false.
   
          // In browsers that support Object.defineProperty, use the following:
          // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });
   
          // For best browser support, use the following:
          A[ k ] = mappedValue;
        }
        // d. Increase k by 1.
        k++;
      }
   
      // 9. return A
      return A;
    };      
  }

  // some
  // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some
  if (!Array.prototype.some) {
    Array.prototype.some = function(fun /*, thisp */) {
      "use strict";
      
      if (this == null)
        throw new TypeError();
   
      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun != "function")
        throw new TypeError();
   
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t && fun.call(thisp, t[i], i, t))
          return true;
      }
   
      return false;
    };
  }

})();