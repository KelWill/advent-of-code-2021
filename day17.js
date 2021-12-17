const _ = require("lodash");

const testInput = `target area: x=20..30, y=-10..-5`;
const realInput = `target area: x=248..285, y=-85..-56`

function p (input) {
  const [x1, x2, y1, y2] = input.replace(/[^-0-9]/g, " ").trim().split(/\s+/).filter(Boolean).map((n) => parseInt(n));

  let validCount = 0;
  function inRange (x, y) {
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
  }


  let maxY = -Infinity;
  function test([dx, dy]) {
    let x = 0;
    let y = 0;

    let currMaxY;

    while (y >= y1 && x <= x2) {
      x += dx;
      y += dy;
      if (y > currMaxY || currMaxY == null) currMaxY = y;
      dy -= 1;
      dx += dx === 0 ? 0 : dx < 0 ? 1 : -1;

      if (inRange(x, y)) {
        validCount++;
        maxY = Math.max(currMaxY, maxY);
        return true;
      }
    }

    return false;
  }

  const validXs = _.range(1, x2 + 1).reverse();
  for (const dx of validXs) {
    for (let dy = y1; dy < 1000; dy++) {      
      test([dx, dy]);
    }

  }

  return validCount;
}


console.log(

  p(testInput),
  );
 console.log(
  p(realInput),
  )