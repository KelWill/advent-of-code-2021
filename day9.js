
const realInput = require('fs').readFileSync('./day9input').toString();
const _ = require('lodash');
const testInput =`2199943210
3987894921
9856789892
8767896789
9899965678`;

class Map {

  constructor (input) {
    const rows = input.split("\n");
    this.y = [];
    for (let y = 0; y < rows.length; y++) {
      this.y[y] = [];
      const row = rows[y].split("").map(n => parseInt(n, 10));
      for (let x = 0; x < row.length; x++) {
        this.y[y][x] = row[x];
      }
    }
  }

  forEach (fn) {
    for (let y = 0; y < this.y.length; y++) {
      for (let x = 0; x < this.y[0].length; x++) {
        fn(y, x);
      }
    }
  }

  findLowPoints () {
    this.lowPoints = [];
    this.forEach((y, x) => {
      if (this.isLow(y, x)) this.lowPoints.push([y, x]);
    });
  }

  findBasins () {
    this.findLowPoints();
    const basinSizes = this.lowPoints.map(([y, x]) => {
      return this.findBasin(y, x);
    });

    return _.orderBy(basinSizes)
    .slice(-3)
    .reduce((acc, n) => acc * n, 1);
  }

  findBasin (y, x) {
    const curr = [[y, x]];
    const basin = {
      [`${y}-${x}`]: true
    };
    while (curr.length) {
      const [y, x] = curr.pop();
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, 1], [0, -1]]) {
        const y1 = y + dy;
        const x1 = x + dx;
        if (y1 >= this.y.length || y1 < 0) continue;
        if (x1 >= this.y[0].length || x1 < 0) continue;
        if (this.y[y1][x1] === 9) continue;
        if (basin[`${y1}-${x1}`]) continue;
        basin[`${y1}-${x1}`] = true;
        curr.push([y1, x1]);
      }
    }
    return Object.keys(basin).length;
  }

  isLow (y, x) {
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, 1], [0, -1]]) {
      const y1 = y + dy;
      const x1 = x + dx;
      if (y1 >= this.y.length || y1 < 0) continue;
      if (x1 >= this.y[0].length || x1 < 0) continue;

      const v = this.y[y1][x1];
      if (v <= this.y[y][x]) return false;
    }

    return true;
  }
}



function part1 (input) {
  let sum = 0;
  const map = new Map(input);
  map.forEach((y, x) => {
    if (map.isLow(y, x)) {
      sum += map.y[y][x] + 1;
    }
  });
  
  console.log("part1", sum);
  console.log("part2", map.findBasins());
}

part1(realInput);