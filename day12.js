function p1 (input) {
  // mapping keys -> numbers so that we can use arrays to track relationships
  const map = {};

  let i = 0;
  const lowercaseIndexes = [];
  const nodes = input.split("\n").reduce((acc, row) => {
    const [a, b] = row.split("-");


    const aIndex = map[a] = map[a] != null ? map[a] : i++;
    const bIndex = map[b] = map[b] != null ? map[b] : i++;

  
    if (a === a.toLowerCase()) {
      lowercaseIndexes[aIndex] = 1;
    }
    if (b === b.toLowerCase()) {
      lowercaseIndexes[bIndex] = 1;
    }

    acc[aIndex] = acc[aIndex] || []
    acc[bIndex] = acc[bIndex] || [];

    acc[aIndex].push(bIndex);
    acc[bIndex].push(aIndex);

    return acc;
  }, []);

  let completedCount = 0;

  const startIndex = map.start;
  const endIndex = map.end;
  const paths = [[startIndex, [], false]];

  let curr;
  while (curr = paths.pop()) {
    const [ i, seen, doubleVisited ] = curr;
    for (const k of nodes[i]) {
      if (k === startIndex) continue;
      if (k === endIndex) {
        completedCount++;
        continue;
      }

      if (!lowercaseIndexes[k]) {
        paths.push([
          k,
          seen,
          doubleVisited,
        ]);
        continue;
      }

      if (!seen[k]) {
        const n = seen.slice();
        n[k] = true;

        paths.push([
          k,
          n,
          doubleVisited,
        ]);
        continue;
      }

      if (doubleVisited) continue;

      paths.push([
        k, seen, true
      ])
      continue;
    }

  }

  return completedCount;
  

}

const testInput = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`

const realInput = `OU-xt
hq-xt
br-HP
WD-xt
end-br
start-OU
hq-br
MH-hq
MH-start
xt-br
end-WD
hq-start
MH-br
qw-OU
hm-WD
br-WD
OU-hq
xt-MH
qw-MH
WD-qw
end-qw
qw-xt`

console.log(

  p1(realInput),
)
process.exit(0);