const fs = require("fs");
const testInput = fs.readFileSync("./day19input.test").toString();
const realInput = fs.readFileSync("./day19input").toString();
const _ = require("lodash");
const assert = require("assert");

function parse (s) {
  s = s.replace(/--- scanner \d+ ---/g, "");

  const beaconReadings = s.split("\n\n")
    .map((scanner) => {
      return scanner.split("\n").map((s) => {
        if (!s) return;
        return s.split(",").map((n) => parseInt(n));
      }).filter(Boolean)
    });


  return beaconReadings.map(getPossibleReadingsForBeacon);
}

function getPossibleReadingsForBeacon (startingReadings) {
  const orients = startingReadings.map((p) => getOrientations(p));

  const orientationReadings = [];
  for (let i = 0; i < 48; i++) {
    orientationReadings.push(orients.map((o) => o[i]).filter(Boolean));
  }

  return orientationReadings;
}

function getOrientations (point) {
  const orientations = [];
  
  const seen = {};
  const orders = [[0, 1, 2], [0, 2, 1], [1, 2, 0], [1, 0, 2], [2, 1, 0], [2, 0, 1]];
  const signs = [ [1, 1, 1], [-1, 1, 1], [1, 1, -1], [1, -1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1], [-1, -1, -1]];
  for (const order of orders) {
    for (const sign of signs) {
      const [ s1, s2, s3 ] = sign;
      const p = [ point[order[0]] * s1, point[order[1]] * s2, point[order[2]] * s3 ];
      if (!seen[p]) {
        orientations.push(p);
        seen[p] = true;
      }
    }
  }

  return orientations;
}

function hasPoint (set, [x, y, z]) {
  return !!_.find(set, (p) => p[0] === x && p[1] === y && p[2] === z);
}

function orientBeacons (beaconSets, orientedBeacons) {
  if (!orientedBeacons) {
    const a = beaconSets.pop()[0];
    orientedBeacons = [ { points: a, pos: [0, 0, 0] } ];
  }

  console.log(`found ${orientedBeacons.length}; ${beaconSets.length} remaining`);

  if (!beaconSets.length) {
    return orientedBeacons;
  }

  for (let i = 0; i < beaconSets.length; i++) {
    const beaconOrientationSet = beaconSets[i];
 
    for (const potentialOverlappingBeacon of orientedBeacons) {

      for (const orientation of beaconOrientationSet) {
        for (const point of orientation) {
          // assume the overlap is the same point
          for (const overlappingPoint of potentialOverlappingBeacon.points) {
            const [dx, dy, dz] = [ point[0] - overlappingPoint[0], point[1] - overlappingPoint[1], point[2] - overlappingPoint[2] ];

            const adjustedSet = orientation.map((p) => {
              return [p[0] - dx, p[1] - dy, p[2] - dz]
            });
            assert.equal(point[0] - dx, overlappingPoint[0]);

            const matches = adjustedSet.filter((point) => hasPoint(potentialOverlappingBeacon.points, point));

            if (matches.length >= 12) {
              beaconSets.splice(i, 1)
              const toAdd = {
                pos: [dx, dy, dz],
                points: adjustedSet,
              }
              return orientBeacons(beaconSets, orientedBeacons.concat(toAdd));
            }

          }
        }

      }
    }
  }

  throw new Error("shouldn't reach here: this means some beacons were unmatched");
}


function manh (a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.abs(a[i] - b[i]);
  }

  return sum;
}


{
  const orientedBeacons = orientBeacons(parse(realInput));
  const set = {};
  for (const point of orientedBeacons.flatMap((b) => b.points)) {
    set[point] = true;
  }

  console.log(Object.keys(set).length);

  let maxMan = -Infinity;
  for (let i = 0; i < orientedBeacons.length; i++) {
    for (let j = 0; j < orientedBeacons.length; j++) {
      if (i === j) continue;
      maxMan = Math.max(maxMan, manh(orientedBeacons[i].pos, orientedBeacons[j].pos));
    }
  }

  console.log("MaxMan", maxMan);

}