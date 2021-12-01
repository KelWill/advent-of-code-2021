const fs = require("fs");
const _ = require("lodash");
let input = fs.readFileSync("./day1input")
  .toString()
  .split("\n")
  .map((s) => parseInt(s, 10));

const windows = [];
for (let i = 0; i < input.length - 2; i++) {
  windows.push(_.sum([input[i], input[i+1], input[i+2]]))
}

let prev = windows[0];
let count = 0;
for (let i = 0; i < windows.length; i++) {
  if (windows[i] > prev) count++
  prev = windows[i];
}

console.log(count);

