const fs = require("fs");
const realInput = fs.readFileSync("./day4input")
  .toString();


const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`


class Board {
  constructor (s) {
    this.numbers = []; // intentionally a sparse array
    const rows = s.split("\n").filter(Boolean);
    this.cols = new Array(rows.length).fill(0);
    this.rows = new Array(rows[0].split(/ +/).filter(Boolean).length).fill(0);
    for (let y = 0; y < rows.length; y++) {
      const col = rows[y].split(/ +/).filter(Boolean);
      for (let x = 0; x < col.length; x++) {
        const n = parseInt(col[x]);
        this.numbers[n] = [x, y];
      }
    }
  }

  call (n) {
    if (this.numbers[n] == null) return;
    const [x, y] = this.numbers[n];

    delete this.numbers[n];

    this.rows[y]++;
    this.cols[x]++;
    if (this.rows[y] === this.cols.length || this.cols[x] === this.rows.length) {      
      this.won = true;
      return this.unmarked() * n;
    }
  }

  // The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 188 * 24 = 4512.
  unmarked () {
    return this.numbers.reduce((sum, n, i) => sum + (n ? i : 0), 0);
  } 
}

function part1 (input) {
  const numbers = input.split("\n")[0].split(",").map((n) => parseInt(n, 10))
    .filter((n) => typeof n === "number");
  const boardStrings = input.split("\n").slice(2);
  const boards = [];
  let curr = "";
  while (boardStrings.length) {
    const row = boardStrings.shift();
    if (row) curr+= row + "\n";
    else console.log(row);
    if (!row.trim() || !boardStrings.length) {
      boards.push(new Board(curr));
      curr = "";
    }
  }

  for (const number of numbers) {
    for (const board of boards) {
      const result = board.call(number);
      if (result) {
        const losingBoards = boards.filter((b) => !b.won);
        if (!losingBoards.length) {
          throw new Error(result);
        }
      }
    }
  }


}

part1(realInput);

