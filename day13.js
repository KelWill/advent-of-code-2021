const realInput = require('fs').readFileSync('./day13input').toString();

function int (n) {
  return parseInt(n, 10);
}


const testInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

function p1 (input) {
  let curr = {};
  const [dots, instructions] = input.split("\n\n");

  let maxX = 0;
  let maxY = 0;
  for (const row of dots.split("\n")) {
    const [x, y] = row.split(",").map(int);
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);

    curr[row] = 1;
  }

  maxX++;
  maxY++;

  // 6 - 8
  // 5 - 9
  // 0 - 14

  for (const row of instructions.split("\n")) {
    let updated = {};

    let foldY;
    let foldX;
    const n = parseInt(row.split("=")[1]);
    if (row.includes("y")) {
      foldY = n;
    } else {
      foldX = n;
    }

    if (foldY) {
      for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < foldY; y++) {
          const key = `${x},${y}`;
          const foldKey = `${x},${2 * foldY - y}`;

          if (curr[key]) updated[key] = 1;
          if (curr[foldKey] && (2 * foldY - y) >= 0) updated[key] = 1;
        }
      }
      maxY = foldY;
    }

    if (foldX) {
      for (let x = 0; x < foldX; x++) {
        for (let y = 0; y < maxY; y++) {
          const key = `${x},${y}`;
          const foldKey = `${2 * foldX  - x},${y}`;
          if (curr[key]) updated[key] = 1;
          if (curr[foldKey] && (2 * foldX - x) >= 0) updated[key] = 1;
        }
      }

      maxX = foldX;
    }

    curr = updated;
  }
  console.log(toS(curr, maxX, maxY));
  console.log(Object.keys(curr).length);
}

function toS (shape, maxX, maxY) {

  let row = "";
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      row += shape[`${x},${y}`] ? "#" : ".";
    }
    row += "\n";
  }

  return row;

}

p1(realInput);