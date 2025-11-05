const process = require("process");
const util = require("util");


//The function bencoded string takes a string as input for example 
// - decodeBencode("5:hello") -> "hello"   ---- the 5 represents the lenght of the string!
function decodeBencode(bencodedValue, start = 0) {
  const char = bencodedValue[start];

  if (!isNaN(char)) {  // Checks if first character of string is a number?
    const colonIndex = bencodedValue.indexOf(":", start); // find index of first colon ":" in string!
    if (colonIndex === -1) { // -1 represents not found!
      throw new Error("Invalid encoded value"); // throw stop currect fuction + erorr object
    }
    const length = parseInt(bencodedValue.slice(start, colonIndex), 10);
    return [bencodedValue.substr(colonIndex + 1, length), colonIndex + 1 + length];
  } 
  else if (char === "i"){ // checking
    const eIndex = bencodedValue.indexOf("e", start);
    return [parseInt(bencodedValue.substr(start + 1, eIndex - start - 1), 10), eIndex + 1]; // need to give as int
  }
  else if (char === "l") {  
    let result = [];
    let i = start + 1; // skip the 'l'
    
    while (bencodedValue[i] !== "e") {
      if (!isNaN(bencodedValue[i])) {
        const colonIndex = bencodedValue.indexOf(":", i);
        const length = parseInt(bencodedValue.slice(i, colonIndex), 10);
        const value = bencodedValue.substr(colonIndex + 1, length);
        result.push(value);
        i = colonIndex + 1 + length;
      } 
      else if (bencodedValue[i] === "i") {
        const eIndex = bencodedValue.indexOf("e", i);
        const value = parseInt(bencodedValue.substring(i + 1, eIndex), 10);
        result.push(value);
        i = eIndex + 1;
      } 
      else if (bencodedValue[i] === "l") {
        const [nested, nextIndex] = decodeBencode(bencodedValue, i);
        result.push(nested);
        i = nextIndex;
      } 
      else if (char === ""){

      }
      else {
        throw new Error("Unsupported element in list");
      }
    }
    return [result, i + 1]; // skip the 'e' at the end
  }
  else {
    throw new Error(`Unsupported element at position ${start}`);
  }
}


function main() {
  const command = process.argv[2];

  // You can use print statements as follows for debugging, they'll be visible when running tests.
  console.error("Logs from your program will appear here!");

  if (command === "decode") {
     const bencodedValue = process.argv[3];

     // In JavaScript, there's no need to manually convert bytes to string for printing
     // because JS doesn't distinguish between bytes and strings in the same way Python does.
     const [decoded, _] = decodeBencode(bencodedValue);
     console.log(JSON.stringify(decoded));
   } else {
     throw new Error(`Unknown command ${command}`);
   }
}

main();
