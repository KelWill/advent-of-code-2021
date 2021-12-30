
const realInput = require("fs").readFileSync("./day25input").toString();

const testInput = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

function getNexts ([x, y], direction, {maxX, maxY}) {

  const [ dx, dy ] = direction === "v" ? [ 0, 1 ] : [ 1, 0 ];

  let nextX = x + dx;
  if (nextX > maxX) nextX = 0;
  if (nextX < 0) nextX = maxX;

  let nextY = y + dy;
  if (nextY > maxY) nextY = 0;
  if (nextY < 0) nextY = maxY;

  return [ nextX, nextY ];

}

function tick (curr, direction, { maxX, maxY }) {
  
  const next = {};

  const canMoves = {};
  Object.entries(curr).forEach(([key, v]) => {
    if (v !== direction) return;

    const [x, y] = key.split(",").map((n) => parseInt(n));
    const nextPoint = getNexts([x, y], direction, { maxX, maxY });
    if (!curr[nextPoint]) canMoves[key] = true;
  });

  for (const [k, v] of Object.entries(curr)) {
    if (v !== direction || !canMoves[k]) {
      next[k] = v;
    } else {

      const [x, y] = k.split(",").map((n) => parseInt(n));
      const nextPoint = getNexts([x, y], direction, { maxX, maxY });
      next[nextPoint] = v;
    }
  }

  return [next, Object.keys(canMoves).length > 0];
}



function p (input) {

  let curr = {};
  const rows = input.split("\n");
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let y = 0; y < rows.length; y++) {
    maxY = Math.max(maxY, y);
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === ".") continue;

      curr[[x, y]] = row[x];
      maxX = Math.max(maxX, x);
    }
  }

  let moved;
  let movedThisTime;
  let i = 0;
  while (true) {
    moved = false;
    console.log(render(curr, {maxX, maxY}));
    for (const k of [">", "v"]) {
      [curr, movedThisTime] = tick(curr, k, { maxX, maxY });
      moved = moved || movedThisTime;
    }
    i++;


    if (!moved) break;
  }

  return i;
}

function render (curr, {maxX, maxY}) {
  let s = "";
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      s += curr[[x, y]] || " ";
    }

    s += "\n";
  }

  return s;
}

console.log(
  p(testInput),
  p(realInput),
);

