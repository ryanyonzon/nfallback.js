/**
 * Test JavaScript Array native and/or fallback methods:
 *    - indexOf
 *    - lastIndexOf
 *    - every
 *    - filter
 *    - forEach
 *    - map
 *    - some
 *
 * Unit tests written by Ryan Yonzon <ryanyonzon@gmail.com>
 *
 * Some codes are from Mozilla Developer Network (MDN):
 * https://developer.mozilla.org/en-US/docs/JavaScript/New_in_JavaScript/1.6?redirectlocale=en-US&redirectslug=New_in_JavaScript_1.6
 */

(function() {

  // indexOf
  test( "indexOf", function() {
    var array = [2, 5, 9, 11, 23];

    equal( array.indexOf(2), 0, "Index of 2 is 0" );
    equal( array.indexOf(9), 2, "Index of 9 is 2" );
    equal( array.indexOf(7), -1, "Index of 7 is -1 (non-existing value)" );
  });

  // lastIndexOf
  test( "lastIndexOf", function() {
    var array = [2, 5, 9, 1, 2];

    equal( array.lastIndexOf(2), 4, "Last index of 2 is 4 (last occurrence)" );
    equal( array.lastIndexOf(2, 3), 0, "Last index of 2 is 0 (first occurrence)" );
    equal( array.lastIndexOf(7), -1, "Last index of 7 is -1 (non-existing value)" );
  });

  // every
  test( "every", function() {
    function isBigEnough(element, index, array) {
      return (element >= 10);
    }

    equal( [12, 54, 18, 130, 44].every(isBigEnough), true, "All elements are greater than or equal to 10" );
    equal( [12, 5, 8, 130, 44].every(isBigEnough), false, "Some element(s) are not greater than or equal to 10" );
    equal( [1, 2, 3, 10, 11, 12, 13].every(isBigEnough), false, "Some element(s) are not greater than or equal to 10" );
  });

  // filter
  test( "filter", function() {
    function isBigEnough(element, index, array) {
      return (element >= 10);
    }

    deepEqual( [12, 54, 18, 130, 44].filter(isBigEnough), [12, 54, 18, 130, 44], "All element(s) greater than or equal to 10 are copied" );
    deepEqual( [12, 5, 8, 130, 44].filter(isBigEnough), [12, 130, 44], "All element(s) greater than or equal to 10 are copied" );
    deepEqual( [1, 2, 3, 10, 11, 12, 13].filter(isBigEnough), [10, 11, 12, 13], "All element(s) greater than or equal to 10 are copied" );
  });

  // forEach
  test( "forEach", function() {
    var result = new Array();

    function copyArrayElements(element, index, array) {
      result[index] = element;
    }

    [2, 5, 9].forEach(copyArrayElements);
    deepEqual( result , [2, 5, 9], "Expecting '[2, 5, 9]' array");
    [1, 2, 3].forEach(copyArrayElements);
    deepEqual( result , [1, 2, 3], "Expecting '[1, 2, 3]' array");
    [4, 5, 6].forEach(copyArrayElements);
    deepEqual( result , [4, 5, 6], "Expecting '[4, 5, 6]' array");
  });

  // map
  test( "map", function() {
    var words = ["foot", "goose", "moose", "kangaroo"];

    function fuzzyPlural(single) {
      var result = single.replace(/o/g, 'e');  
      if( single === 'kangaroo'){
        result += 'se';
      }
      return result; 
    }

    deepEqual( words.map(fuzzyPlural) , ["feet", "geese", "meese", "kangareese"], "Expecting '[feet, geese, meese, kangareese]' array");
  });

  // some
  test( "some", function() {
    function isBigEnough(element, index, array) {
      return (element >= 10);
    }

    equal( [12, 5, 8, 1, 4].some(isBigEnough), true, "One or more element(s) are not greater than or equal to 10" );
    equal( [2, 5, 8, 1, 4].some(isBigEnough), false, "None of the elements are greater than or equal to 10" );
    equal( [1, 2, 3, 4, 10].some(isBigEnough), true, "One or more element(s) are not greater than or equal to 10" );
  });

})();