const _ = require('lodash');
const realInput = require("fs").readFileSync("./day15input").toString();
const testInput = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`






function p1 (input) {  
  const startingRows = input.split("\n")
    .map((s) => s.split("").map((c) => parseInt(c)));

  let rows = new Array(5 * startingRows.length).fill(0).map(() => []);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let y = 0; y < startingRows.length; y++) {
        for (let x = 0; x < startingRows.length; x++) {
          let v = startingRows[y][x];
          v = v + i + j;
          while (v > 9) v -= 9;
          if (v === 0) v = 1;
          rows[y + i * startingRows.length][x + j * startingRows[0].length] = v;
        }
      }
    }
  }

  const maxX = rows[0].length - 1;
  const maxY = rows.length - 1;
  const costs = {
    [[maxX, maxY]]: 0,
  };

  const inBounds = ([x, y]) => {
    return x >= 0 && x <= maxX && y >= 0 && y <= maxY;
  };



  let points = [[maxY, maxX]];
  const visited = {};
  function enqueue (point) {
    if (visited[point]) return;
    points.push(point);
  }

  function get (x, y) {
    return rows[y][x];
  }

  function tick (point) {
    if (visited[point]) return;
    const [x, y] = point;
    const nextPoints = [[x - 1, y], [x + 1, y], [x, y - 1]]
      .filter(inBounds);
    
    const score = get(x, y);

    for (const next of nextPoints) {
      const maybeLowerScore = score + costs[point];
      if (!costs[next] || maybeLowerScore < costs[next]) {
        costs[next] = maybeLowerScore;
      }
      enqueue(next);
    }

    visited[point] = true;
  }

  while (points.length) {
    points = _.orderBy(points, (point) => costs[point] ? costs[point] : Infinity, "desc");
    const [x, y] = points.pop();
    tick([x, y]);
  }


  return costs["0,0"];

}


console.log(p1(testInput));
console.log(
  p1(realInput),
)
