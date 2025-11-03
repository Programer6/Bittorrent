const process = require("process");
const util = require("util");


//The function bencoded string takes a string as input for example 
// - decodeBencode("5:hello") -> "hello"   ---- the 5 represents the lenght of the string!
function decodeBencode(bencodedValue) {
  if (!isNaN(bencodedValue[0])) {  // Checks if first character of string is a number?
    const firstColonIndex = bencodedValue.indexOf(":"); // find index of first colon ":" in string!
    if (firstColonIndex === -1) { // -1 represents not found!
      throw new Error("Invalid encoded value"); // throw stop currect fuction + erorr object
    }
    return bencodedValue.substr(firstColonIndex + 1);
  } 
  else if (bencodedValue[0] === "i"){ // checking
    const eIndex = bencodedValue.indexOf("e")
    return parseInt(bencodedValue.substr(1, eIndex - 1), 10)
  }
  else {
    throw new Error("Only strings are supported at the moment");
  }
}

function main() {
  const command = process.argv[2];

  // You can use print statements as follows for debugging, they'll be visible when running tests.
  console.error("Logs from your program will appear here!");

  if (command === "decode") {
     const bencodedValue = process.argv[3];

  //   // In JavaScript, there's no need to manually convert bytes to string for printing
  //   // because JS doesn't distinguish between bytes and strings in the same way Python does.
     console.log(JSON.stringify(decodeBencode(bencodedValue)));
   } else {
     throw new Error(`Unknown command ${command}`);
   }
}

main();
