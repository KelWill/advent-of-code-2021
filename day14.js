const _ = require("lodash");
const realInput = require("fs").readFileSync("./day14input").toString();

const testInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`
 
function p (input, n) {
  const [start, rules] = input.split("\n\n")
  const m = {};
  for (const rule of rules.split("\n")) {
    const [from, to] = rule.split(" -> ");
    m[from] = to;
  }


  let pairs = Object.keys(m).reduce((acc, k) => {
    acc[k] = 0;
    return acc;
  }, {});
  for (let i = 0; i < start.length - 1; i++) {
    pairs[start[i] + start[i + 1]]++;
  }

  for (let i = 0; i < n; i++) {
    const updatedCounts = {};
    for (const pair of Object.keys(pairs)) {
      const [c1, c2] = pair.split("");
      const insertChar = m[pair];

      updatedCounts[c1 + insertChar] = (updatedCounts[c1 + insertChar] || 0) + pairs[pair];
      updatedCounts[insertChar + c2] = (updatedCounts[insertChar + c2] || 0) + pairs[pair];
    }
    pairs = updatedCounts;
  }

  const counts = {};
  for (const [pair, count] of Object.entries(pairs)) {
    const [c1] = pair.split("");
    counts[c1] = counts[c1] ?? 0;
    counts[c1] += count;
  }

  counts[start[start.length - 1]]++;

  const values = _.sortBy(Object.values(counts));

  return _.last(values) - _.first(values);
}

console.log(
  p(testInput, 10) === 1588,
  p(realInput, 10) === 2194,
  p(testInput, 40) === 2188189693529,
  p(realInput, 40),
)