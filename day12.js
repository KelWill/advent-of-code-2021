

function p1 (input) {
  const nodes = input.split("\n").reduce((acc, row) => {
    const [start, end] = row.split("-")
    acc[start] = acc[start] || {children: [], k: start};
    acc[end] = acc[end] || {children: [], k: end};
    acc[start].children.push(end);
    acc[end].children.push(start);
    return acc;
  }, {});

  let paths = [["start"]];
  let completedCount = 0;

  while (paths.length) {
    paths = paths.flatMap((path) => {
      const currentKey = path[path.length - 1];
      const currentNode = nodes[currentKey];
  
      return currentNode.children.map((k) => {
        if (k === "start") return;
        if (k === "end") {
          completedCount++;
          return;
        }

        if (k === k.toLowerCase() && path.includes(k)) {
          if (path.lowerVisit) return;
          const updatedPath = path.concat(k);
          updatedPath.lowerVisit = k;
          return updatedPath;
        } 

        const updatedPath = path.concat(k);
        updatedPath.lowerVisit = path.lowerVisit;

        return updatedPath;
      }).filter(Boolean);      
    });
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