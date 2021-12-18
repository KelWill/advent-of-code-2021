
function explode (a, indexesByDepth, i) {
  const l = a[i];
  const r = a[i + 1];
  if (a[i - 1] != null) a[i - 1] += l;
  if (a[i + 2] != null) a[i + 2] += r;
  a.splice(i, 2, 0);

  for (let depth = 0; depth < indexesByDepth.length; depth++) {
    indexesByDepth[depth] = indexesByDepth[depth].map((ni) => {
      if (ni === i || ni === i + 1) return null;

      if (ni > i) return ni--;
      else return ni;
    }).filter((n) => n != null);
  }

  indexesByDepth[4].push(i);

  return {
    array: a,
    indexesByDepth,
  }
}


function bfs (pairs) {
  let a = [];
  const indexesByDepth = new Array(5).fill(0).map(() => []);
  let l = [{c: pairs, d: 0}];
  let curr;
  while (curr = l.pop()) {
    const { c, d } = curr;
    if (!Array.isArray(c)) {
      a.push(c);
      indexesByDepth[d] = indexesByDepth[d] || [];
      indexesByDepth[d].push(a.length - 1);
    } else {
      l.push({c: c[1], d: d + 1});
      l.push({c: c[0], d: d + 1});
    }
  }

  return {
    array: a,
    indexesByDepth,
  }
}
{
  const { indexesByDepth, array } = bfs([[[[[9,8],1],2],3],4])
  console.log(array, indexesByDepth);
  console.log(explode(array, indexesByDepth, 0));
}






// function add (node1, node2) {

//   const n = new Node([], -1);

//   n.children = [node1, node2];
//   n.children.forEach((c) => c.parent = n);
//   n.children[0].right = n.children[1];
//   n.children[1].left = n.children[0];

//   n.incrementDepths();
//   nodesByDepth.unshift(n);
//   return n;
// }



// class Node {
//   constructor (pairs, depth = 0) {

//     this.depth = depth;

//     nodesByDepth[depth] = nodesByDepth[depth] ?? [];
//     nodesByDepth[depth].push(this);

//     if (!Array.isArray(pairs)) {
//       this.value = pairs;
//       return this;
//     }

//     this.setUpChildren(pairs);
//   }

//   incrementDepths () {
//     this.depth++;
//     this.children.forEach((c) => c.incrementDepths());
//   }
  
//   setUpChildren (pairs) {
//     if (!pairs.length) return;

//     const depth = this.depth;
//     this.children = pairs.map((c) => new Node(c, depth + 1));
//     this.children[0].parent = this;
//     this.children[1].parent = this;
  
//     this.children[1].left = this.children[0];
//     this.children[0].right = this.children[1];
//   }

//   split () {
//     if (!this.value || this.value < 10) return;
//     const pair = [Math.floor(this.value / 2), Math.ceil(this.value / 2)];
//     delete this.value;
//     this.setUpChildren(pair);
//     return true;
//   }

//   explode () {
//     if (this.depth >= 4 && this.children) {
//       const l = this.children[0].value;
//       const r = this.children[1].value;
//       delete this.children;
//       this.value = 0;

//       let visited = new Set();
//       let curr = this;
//       while (true) {
//         if (visited.has(curr)) break;
//         visited.add(curr);
//         if (curr.value != null) {
//           curr.value += l;
//           return true;
//         }

//         if (curr.left && !visited.has(curr.left)) curr = curr.left;
//         else if (curr.children && !visited.has(curr.children[0])) curr = curr.children[0];
//         else if (curr.parent && !visited.has(curr.parent)) curr = curr.parent;
//       }

//       curr = this;
//       visited = new Set();
//       while (true) {
//         if (visited.has(curr)) break;
//         visited.add(curr);
//         if (curr.value != null) {
//           curr.value += l;
//           return true;
//         }

//         if (curr.right && !visited.has(curr.right)) curr = curr.right;
//         else if (curr.children && !visited.has(curr.children[0])) curr = curr.children[0];
//         else if (curr.parent && !visited.has(curr.parent)) curr = curr.parent;
//       }

//       return false;
//     }
//   }

//   reduce () {
//     let changed = false;
//     let bfsList = [this];
//     let curr;

//     console.log(this.toString());

//     while (curr = bfsList.pop()) {
//       if (curr.explode()) {
//         changed = true;
//         break;
//       }
//       if (curr.children) {
//         bfsList.push(curr.children[1]);
//         bfsList.push(curr.children[0]);
//       }
//     }

//     if (changed) {
//       return this.reduce();
//     }

//     bfsList = [this];
//     while (curr = bfsList.pop()) {
//       if (curr.split()) {
//         changed = true;
//         break;
//       }
//       if (curr.children) {
//         bfsList.push(curr.children[1]);
//         bfsList.push(curr.children[0]);
//       }
//     }

//     if (changed) {
//       return this.reduce();
//     }
//   }

//   toString () {
//     if (this.value != null) return this.value.toString();
//     else return `[${this.children[0].toString()}, ${this.children[1].toString()}]`
//   }

// }


// [
//   [7,[6,[5,[4,[3,2]]]]],
//   [[[[[9,8],1],2],3],4],
//   [[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]],
// ].forEach((ex) => {
//   const n = new Node(ex);
//   n.reduce();
//   console.log(n.toString());
// });



// function add (a, b) {
//   return [a, b];
// }


// function explode (pairs) {
//   const depths = calculateDepths(pairs);

//   if (depths.length < 4) return depths;
// }

// function split (pairs) {}