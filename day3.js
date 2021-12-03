const fs = require("fs");
const _ = require("lodash");
const realInput = fs.readFileSync("./day3input")
  .toString();

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

function part1 () {
  const rows = realInput.split("\n")
  const countOfOnes = _.range(0, rows[0].length)
    .map((i) => _.filter(rows, r => r[i] === "1").length)
  const gamma = parseInt(countOfOnes.map((c) => c > rows.length - c ? 1 : 0).join(""), 2);
  const epsilon = parseInt(countOfOnes.map((c) => c <= rows.length - c ? 1 : 0).join(""), 2);
  console.log(gamma, epsilon, gamma * epsilon);
}

part1();

function filterRows (rows, chooseChar, i = 0) {
  if (rows.length === 1) return rows[0];
  const oneCount = rows.filter((r) => r[i] === "1").length;
  const mostCommon = oneCount >= rows.length - oneCount ? "1" : "0";
  return filterRows(
    rows.filter(r => r[i] === chooseChar(mostCommon)),
    chooseChar,
    i + 1,
  )
}

const rows = realInput.split("\n");
const c = filterRows(rows, (c) => c === "1" ? "1" : "0");
const o = filterRows(rows, (c) => c === "1" ? "0" : "1");
console.log(
  parseInt(c, 2) * parseInt(o,2 )
);
  


