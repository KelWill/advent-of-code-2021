const fs = require("fs");
const _ = require("lodash");
const inputString = fs.readFileSync("./day2input")
  .toString();

function toInput (s) {
  return s.split("\n")
  .map((s) => {
    let [direction, n] = s.split(" ");
    n = parseInt(n, 10);
    return direction === "forward" ? [n, 0] : direction === "down" ? [0, n] : [0, -n];    
  });

}
  
let input = toInput(`forward 5
down 5
forward 8
up 3
down 8
forward 2`);



function part1() {
  input = toInput(inputString);
  const start = [0, 0];
  for (const [dx, dz] of input) {
    start[0] += dx;
    start[1] += dz;
  }

  console.log(start, start[0] * start[1]);
}

input = toInput(inputString);
const start = [0, 0, 0];
for (const [dx, dz] of input) {
  start[0] += dx;
  start[2] += dz;

  if (dx) {
    start[1] += dx * start[2];
  }
}
console.log(start)
console.log(start[0] * start[1]);


