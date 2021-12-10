const realInput = require("fs").readFileSync("day10input").toString();
const _ = require("lodash");


const m = {
  "[": "]",
  "{": "}",
  "(": ")",
  "<": ">",
}
const scores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
}
const completionScores = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
}

function handleLine (l) {
  const nextStack = [];
  for (let i = 0; i < l.length; i++) {
    const k = l[i];
    const isOpening = Object.keys(m).includes(k);
    if (isOpening) {
      nextStack.push(m[k]);
    } else {
      const nextChar = nextStack.pop();
      if (nextChar !== k) {
        return 0;
      }
    }
  }

  return nextStack.reverse().reduce((sum, k, i) => {
    return sum * 5 + completionScores[k];
  }, 0)

}

function p2 (input) {
  // const illegalCharacters = input.split("\n").map(handleLine);
  // return illegalCharacters
  //   .filter(Boolean)
  //   .reduce((sum, k) => sum + (scores[k] || 0), 0);

  const scores = input.split("\n").map(handleLine).filter(Boolean);
  return _.orderBy(scores)[Math.floor(scores.length / 2)];
}

const testInput = `[({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`

console.log(
  p2(realInput),
)
