
function p1 (input) {
  const nodes = input.split("\n").reduce((acc, row) => {
    const [start, end] = row.split("-")
    acc[start] = acc[start] || []
    acc[end] = acc[end] || [];
    acc[start].push(end);
    acc[end].push(start);
    return acc;
  }, {});

  let paths = [["start", {}, false]];
  let completedCount = 0;

  let curr;
  while (curr = paths.pop()) {

    const [ currentKey, visitedLowers, hasDoubledVisitedLower ] = curr;
    const currentNode = nodes[currentKey];
    for (const k of currentNode) {
      if (k === "start") continue;
      if (k === "end") {
        completedCount++;
        continue;
      }

      if (k === k.toLowerCase()) {
        if (!visitedLowers[k]) {
          paths.push([
            k,
            { ...visitedLowers, [k]: true },
            hasDoubledVisitedLower,
          ]);
          continue;
        }

        if (hasDoubledVisitedLower) continue;
        paths.push([
          k, visitedLowers, k
        ])
        continue;
      }

      paths.push([
        k,
        visitedLowers,
        hasDoubledVisitedLower,
      ]);
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