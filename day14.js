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


function increment (o, k, n=1) {
  o[k] = o[k] || 0;
  o[k] += n;
}
function pr (input, n) {
  const [start, rules] = input.split("\n\n")
  const m = {};
  for (const rule of rules.split("\n")) {
    const [from, to] = rule.split(" -> ");
    m[from] = to;
  }

  const pairs = {};
  for (let i = 0; i < start.length - 1; i++) {
    increment(pairs, start[i] + start[i+1]);
  }

  function getPairCounts (pairs, n) {
    if (n === 0) return pairs;
    
    const updated = {};
    for (const [pair, score] of Object.entries(pairs)) {
      const [c1, c2] = pair.split("");
      increment(updated, c1 + m[pair], score)
      increment(updated, m[pair] + c2, score);
    }

    return getPairCounts(updated, n - 1);

  }
  const counts = getPairCounts(pairs, n);
  const countsByCharacter = {};
  for (const [pair, score] of Object.entries(counts)) {
    const [k] = pair.split("");
    increment(countsByCharacter, k, score);
  }
  increment(countsByCharacter, start[start.length - 1], 1);

  const cs = _.sortBy(Object.values(countsByCharacter));
  console.log(cs);
  return _.last(cs) - _.first(cs);
}

console.log(
  p(testInput, 10) === 1588,
  p(realInput, 10) === 2194,
  p(testInput, 40) === 2188189693529,
  pr(realInput, 40) === p(realInput, 40),
  p(realInput, 40),
  pr(testInput, 10),

)