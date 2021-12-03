const fs = require("fs");
const _ = require("lodash");
const inputString = fs.readFileSync("./day3input")
  .toString();

function toInput (s) {
  return s.split("\n")
  .map((s) => {
    return s.split("").map((n) => parseInt(n, 10))
  });

}
  
const input = toInput( inputString || `10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`);


function part1() {
  const valueCounts = getValueCounts();
  const gamma = parseInt(valueCounts.map((v) => {
    return (v["0"] > v["1"]) ? "0" : "1";
  }).join(""), 2);

  const epsilon = parseInt(valueCounts.map((v) => {
    return (v["1"] > v["0"]) ? "0" : "1";
  }).join(""), 2);
  console.log(gamma);
  console.log(epsilon);
  console.log(gamma * epsilon);
}


function getValueCounts (input) {
  const valueCounts = [];
  for (let i = 0; i < input[0].length; i++) {
    for (let j = 0; j < input.length; j++) {
      valueCounts[i] = valueCounts[i] || {0: 0, 1: 0};
      valueCounts[i][input[j][i]]++;
    }
  }
  return valueCounts;
}



function part2 () {
  let i = 0;
  let currInput = input;
  while (currInput.length > 1) {
    const valueCounts = getValueCounts(currInput);
    const mostCommonBit = valueCounts[i]["0"] > valueCounts[i]["1"] ? 0 : 1;
    
    currInput = currInput.filter((row) => {
      return row[i] === mostCommonBit;
    });
    i++;
  }


  const oxygen = parseInt(currInput[0].join(""), 2);


  // If 0 and 1 are equally common, keep values with a 0 in the position being considered
  i = 0;
  currInput = input;
  while (currInput.length > 1) {
    const valueCounts = getValueCounts(currInput);
    const mostCommonBit = valueCounts[i]["0"] <= valueCounts[i]["1"] ? 0 : 1;
    
    currInput = currInput.filter((row) => {
      return row[i] === mostCommonBit;
    });
    i++;
  }

  const c02 = parseInt(currInput[0].join(""), 2);
  
  console.log(oxygen, c02, oxygen * c02);
}

part2();