const _ = require("lodash");
const assert = require("assert");
const fs = require("fs");
const realInput = fs.readFileSync("./day8input").toString();
const testInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

function part1 (input) {
  let count = 0;
  for (const row of input.split("\n")) {
    for (const solution of row.split(" | ")[1].split(" ")) {
      if ([2, 7, 3, 4].includes(solution.length)) count++;
    }
  }  
  console.log(count);
}

// part1(realInput);



function translate (rows) {
  const map = new Array(10)
  // translate 1, 4, 7, 8
  for (const row of rows) {
    if (row.length === 2) map[1] = row;
    else if (row.length === 3) map[7] = row;
    else if (row.length === 4) map[4] = row;
    else if (row.length === 7) map[8] = row;
  }

  const byLengths = _.groupBy(rows, "length");

  // 2, 3, 5
  for (const row of (byLengths[5] || [])) {
    assert(map[1] != null);
    assert(map[4] != null);
    if (_.intersection(row, map[1]).length === 2) {
      map[3] = row;
    } else if (_.intersection(row, map[4]).length === 3) {
      map[5] = row;
    } else {
      map[2] = row;
    }
  }

  // 6, 9, 0
  for (const row of byLengths[6] || []) {
    assert(map[1] != null);
    assert(map[4] != null);
    if (_.intersection(row, map[1]).length !== 2) {
      map[6] = row;
    } else if (_.intersection(row, map[4]).length === 4) {
      map[9] = row;
    } else {
      map[0] = row;
    }
  }

  return map.reduce((acc, value, index) => {
    acc[value.join("")] = index;
    return acc;
  }, {});
}

function part2 (input) {

  // valid for a given row
  const translations = input.split("\n")
    .map((s) => s.replace(" | ", " ").split(" "))
    .map((row) => row.map((c) => c.split("").sort()))
    .map(translate);

  let sum = 0;
  const rows = input.split("\n");
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const t = translations[i];
    const output = row.split(" | ")[1]
      .split(" ")
      .map((c) => c.split("").sort().join(""));
    for (let i = 0; i < output.length; i++) {
      const v = t[output[i]];
      sum += v * Math.pow(10, (3 - i));
    }
  }

  return sum;
}

console.log(part2(realInput));