


const testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

const realInput = `3322874652
5636588857
7755117548
5854121833
2856682477
3124873812
1541372254
8634383236
2424323348
2265635842`

const vectors = [];
for (let dx = -1; dx <= 1; dx++) {
  for (let dy = -1; dy <= 1; dy++) {
    if (!dx && !dy) continue;
    vectors.push([dx, dy]);
  }
}

class Octopods {

  constructor (input) {
    this.os = [];
    this.flashes = 0;
    let maxY = 0;
    let maxX = 0;
    for (const row of input.split("\n")) {
      maxX = 0;
      maxY++;
      for (const octopus of row.split("")) {
        this.os.push(parseInt(octopus, 10));
        maxX++;
      }
    }
    this.maxX = maxX;
    this.maxY = maxY;
  }

  get (x, y) {
    const i = this.getIndex(x, y);
    return this.os[i];
  }

  set (x, y, v) {
    const i = this.getIndex(x, y);
    this.os[i] = v;
  }

  forEach(fn) {
    for (let i = 0; i < this.os.length; i++) {
      const x = i % this.maxX;
      const y = Math.floor(i / this.maxX);
      fn(x, y);
    }
  }

  increment (x, y) {
    this.set(x, y, this.get(x, y) + 1);
  }

  forNeighbors (x, y, fn) {
    for (let i = 0; i < vectors.length; i++) {
      const [dx, dy] = vectors[i];
      const x1 = x + dx;
      const y1 = y + dy;

      if (x1 < 0 || x1 >= this.maxX) continue;
      if (y1 < 0 || y1 >= this.maxY) continue;
      fn(x1, y1);
    }
  }

  getIndex (x, y) {
    return x + y * this.maxX;
  }

  tick () {
    const flashed = new Array(100).fill(0);
    // First, the energy level of each octopus increases by 1.
    this.forEach((x, y) => {
      this.set(x, y, this.get(x, y) + 1);
    });

    // Then, any octopus with an energy level greater than 9 flashes.
    // This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent
    // If this causes an octopus to have an energy level greater than 9, it also flashes.
    // This process continues as long as new octopuses keep having their energy level increased beyond 9.
    // (An octopus can only flash at most once per step.)
    let toFlash = [];
    this.forEach((x, y) => {
      if (this.get(x, y) > 9) toFlash.push([x, y]);
    });

    while (true) {
      const next = [];

      // first flash & increment neighbors
      for (const [x, y] of toFlash) {
        this.set(x, y, 0);
        flashed[this.getIndex(x, y)] = 1;
        this.forNeighbors(x, y, (x, y) => this.increment(x, y));
      }

      // then find flashable neighbors
      for (const [x, y] of toFlash) {
        this.forNeighbors(x, y, (x, y) => {
          if (flashed[this.getIndex(x, y)]) return;
          if (this.get(x, y) <= 9) return;
          flashed[this.getIndex(x, y)] = 1;            
          next.push([x, y]);
        });
      }

      this.flashes += toFlash.length;
      toFlash = next;
      if (!toFlash.length) break;
    }

    // Finally, any octopus that flashed during this step has its energy level set to 0
    // as it used all of its energy to flash.
    for (let i = 0; i < flashed.length; i++) {
      if (!flashed[i]) continue;
      const x = i % this.maxX;
      const y = Math.floor(i / this.maxX);
      this.set(x, y, 0);
    }

    return flashed.every((n) => !!n);

  }

  toString() {
    let row = "";
    for (let y = 0; y < this.maxX; y++) {
      row += this.os.slice(y * this.maxX, y * this.maxX + this.maxX).join("");
      row += "\n"
    }
    return row;
  }
}




function p1 (input) {
  const octopods = new Octopods(input);
  for (let i = 0; i < 10000; i++) {
    if (octopods.tick()) {
      console.log(i + 1);
      break;
    }

  }
}
p1(realInput);