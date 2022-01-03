function part1() {
  let die = 1;
  let rollCount = 0;
  function roll() {
    rollCount++;
    let result = die++;
    while (result > 100) result -= 100;
    return result;
  }

  function next([pos, score]) {
    pos = pos + roll() + roll() + roll();
    while (pos > 10) pos -= 10;
    score += pos;
    return [pos, score];
  }

  const scores = [
    [4, 0],
    [8, 0],
  ];

  while (scores.every(([_, s]) => s < 1000)) {
    scores.push(next(scores.shift()));
  }

  console.log(scores, rollCount);
}

const dieResults = {};
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    for (let k = 1; k <= 3; k++) {
      dieResults[i + j + k] = dieResults[i + j + k] || 0;
      dieResults[i + j + k]++;
    }
  }
}

// for a given [score, pos], what does the distribution of turns to completion look like?
function turnsToCompletion (start) {
  const scoreCounts = {};
  const scores = [start];
  while (scores.length) {
    const [pos, score, c, turn] = scores.pop();

    for (const [die, count] of Object.entries(dieResults)) {
      let nextPos = pos + parseInt(die);
      while (nextPos > 10) nextPos -= 10;
      const nextScore = nextPos + score;
      if (nextScore >= 21) {
        scoreCounts[turn + 1] = scoreCounts[turn + 1] || 0;
        scoreCounts[turn + 1] += c * count;
      } else {
        scores.push([nextPos, nextScore, c * count, turn + 1])
      }
    }
  }

  return scoreCounts;
}


function part2() {
  const p1 = turnsToCompletion([6, 0, 1, 0]);
  const p2 = turnsToCompletion([10, 0, 1, 0]);
  let p1wins = 0;
  let worlds = 1;
  for (let i = 1; i <= 10; i++) {
    p1wins += worlds * (p1[i] || 0);
    worlds *= 27; // worlds increase every round
    worlds -= (p2[i] || 0); // worlds decrease by the number that p2 won
  }


  worlds = 1;
  let p2wins = 0;
  for (let i = 1; i <= 10; i++) {
    worlds *= 27;
    worlds -= (p1[i] || 0);
    p2wins += (p2[i] || 0) * worlds;
  }
  
  console.log(p1, p2, p1wins, p2wins);

}

console.log(

  part2()

)
