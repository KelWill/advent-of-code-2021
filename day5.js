const fs = require("fs");
const realInput = fs.readFileSync("./day5input").toString();


const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`


function p1 (input) {
  const map = {};
  let count = 0;
  for (const row of input.split("\n")) {
    let [x1, y1, x2, y2] = row.split(" -> ")
      .join(",")
      .split(",")
      .map(n => parseInt(n, 10));
    const dx = x2 === x1 ? 0 : x2 > x1 ? 1 : -1;
    const dy = y2 === y1 ? 0 : y2 > y1 ? 1 : -1;

    while (x1 !== x2 || y1 !== y2) {
      const key = `${x1}-${y1}`;
      map[key] = map[key] || 0;
      map[key]++;
      if (map[key] === 2) count++;
      x1 += dx;
      y1 += dy;
    }
    const key = `${x1}-${y1}`;
    map[key] = map[key] || 0;
    map[key]++;
    if (map[key] === 2) count++;
  }

  console.log(count);
}

p1( realInput);



