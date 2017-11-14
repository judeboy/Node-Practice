'use strict';

//export a collection of functions

function hello(name){
  console.log("Hello ",name, " you have made it to the hello function in greetings");
}

function bye(name){
  console.log("Goodbye ",name, "you have made it to the bye function in greetings");
}

function noComment(name){
  console.log("I have nothing to say.");
}

//exporting the functions above as an object full of functions
module.exports = {
  hello,
  bye,
  noComment
};


//
// console.log("This logged when you required the greetings module.");
