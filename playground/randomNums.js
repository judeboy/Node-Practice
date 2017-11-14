'use strict';

//export a collection of functions in an iife

module.exports = (function(){
  function oneDigit(){
    return 1;
  };
  function twoDigit(){
    return 10;
  };
  function threeDigit(){
    return 100;
  };
  function fourDigit(){
    return 1000;
  };

  return{
    oneDigit,
    twoDigit,
    threeDigit,
    fourDigit
  }
})()

// console.log("This logged when you required the random numbers module.");
