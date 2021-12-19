const assert = require("assert");
const _ = require("lodash");
const realInput = require("fs").readFileSync("./day18input").toString();
const testInput = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;


function explode (array, i) {
  const [l, d] = array[i];
  const [r, d2] = array[i + 1];
  assert.equal(d, d2);

  if (array[i - 1] != null) array[i - 1][0] += l;
  if (array[i + 2] != null) array[i + 2][0] += r;
  array.splice(i, 2, [0, d - 1]);

  return array;

}

function split (array, i) {
  const [v, d] = array[i];
  array.splice(i, 1, [ Math.floor(v / 2), d + 1], [Math.ceil(v / 2), d + 1]);
}

function add (a, b) {
  const updated = a.concat(b);
  updated.forEach((entry) => entry[1]++);
  return updated;
}

function reduce (array) {
  for (let i = 0; i < array.length - 1; i++) {
    const d = array[i][1];
    const d2 = array[i + 1][1];
    if (d > 4 && d === d2) {
      explode(array, i);
      return reduce(array);
    }
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i][0] >= 10) {
      split(array, i);
      return reduce(array);
    }
  }

  return array;
}

function parse (s) {
  const nestedArrays = JSON.parse(s);
  return bfs(nestedArrays);
}


function bfs (pairs) {
  let a = [];
  let l = [{ c: pairs, d: 0 }];
  let curr;
  while (curr = l.pop()) {
    const { c, d } = curr;
    if (!Array.isArray(c)) {
      a.push([c, d]);
    } else {
      l.push({ c: c[1], d: d + 1 });
      l.push({ c: c[0], d: d + 1 });
    }
  }

  return a;
}

function calculateMagnitude (array) {
  if (array.length === 1) return array[0][0];

  let updated = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i][1] === array[i + 1][1]) {
      const d = array[i][1] - 1;
      updated.push([array[i][0] * 3 + array[i + 1][0] * 2 , d]);
      i++;
    } else {
      updated.push(array[i]);
    }
  }

  return calculateMagnitude(updated);
}

{
  // part 1
  const input = realInput;
  const rows = input.split("\n")
    .map(parse);

  let curr = rows.shift();
  curr = reduce(curr);
  for (let row of rows) {
    curr = reduce(add(reduce(curr), reduce(row)));
  }
  console.log(calculateMagnitude(curr));
}

{
  // part 2
  const input = realInput;
  const rows = input.split("\n");

  const c = (a, b) => calculateMagnitude(reduce(add(a, b)));
  let maxMagnitude = -Infinity;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows.length; j++) {
      if (i === j) continue;
      const a = parse(rows[i]);
      const b = parse(rows[j]);
      maxMagnitude = Math.max(c(a, b), c(b, a), maxMagnitude);
    }
  }
  console.log(maxMagnitude);
}


