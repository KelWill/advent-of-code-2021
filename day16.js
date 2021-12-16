const realInput = require("fs").readFileSync("day16input").toString();
const _ = require("lodash");
function toBits (s) {
  return s.split("").map((c) => {
    let b = parseInt(c, 16).toString(2);

    return Array(4 - b.length).fill("0").concat(b).join("");
  }).join("");
}



class Packet {
  constructor (bits) {
    let i = 0;
    this.version = parseInt(bits.slice(0, i + 3), 2);
    i += 3;
    this.packetId = parseInt(bits.slice(i, i + 3), 2);
    i += 3;
    if (this.packetId === 4) {
      let shouldContinue = true;
      let result = "";
      while (shouldContinue) {
        shouldContinue = bits[i] === "1";
        result += bits.slice(i + 1, i + 5);
        i += 5;
      }
      this.literal = result;
      this.value = parseInt(result, 2);
      this.consumedLength = i;
      return this;
    }

    this.subPackets = [];

    if (bits[i++] === "0") {
      const subPacketBitLength = parseInt(bits.slice(i, i + 15), 2);
      i += 15;
      let consumed = 0;
      while (consumed < subPacketBitLength) {
        const p = new Packet(bits.slice(i));
        this.subPackets.push(p);
        i += p.consumedLength;
        consumed += p.consumedLength;
      }
    } else {
      const subPacketLength = parseInt(bits.slice(i, i + 11), 2);
      i += 11;

      if (isNaN(subPacketLength)) {
        throw new Error(`bad subpacket length: ${bits.slice(i)}`);
      }
      
      while (this.subPackets.length < subPacketLength) {
        const p = new Packet(bits.slice(i));
        this.subPackets.push(p);
        i += p.consumedLength;
      }
    }

    switch (this.packetId) {
      case 0:
        this.value = this.subPackets.reduce((sum, p) => sum + p.value, 0);
        break;
      case 1:
        this.value = this.subPackets.reduce((product, p) => product * p.value, 1);
        break;
      case 2:
        this.value = _.min(this.subPackets.map((p) => p.value));
        break;
      case 3:
        this.value = _.max(this.subPackets.map((p) => p.value));
        break;
      case 5:
        this.value = this.subPackets[0].value > this.subPackets[1].value ? 1 : 0;
        break;
      case 6:
        this.value = this.subPackets[0].value < this.subPackets[1].value ? 1 : 0;
        break;
      case 7:
        this.value = this.subPackets[0].value === this.subPackets[1].value ? 1 : 0;
        break;
    }

    this.version = this.version + this.subPackets.reduce((acc, p) => acc + p.version, 0);
    this.consumedLength = i;
  }


}


// console.log(new Packet(toBits("D2FE28")));
// console.log(new Packet(toBits("38006F45291200")));


// console.log(new Packet(toBits("8A004A801A8002F478")));
// console.log(new Packet(toBits("A0016C880162017C3686B18A3D4780")));
// console.log(new Packet(toBits(realInput)));
// console.log(new Packet(toBits(realInput)).version);


console.log(
  new Packet(toBits("C200B40A82")).value,
  new Packet(toBits("04005AC33890")).value,
  new Packet(toBits("880086C3E88112")).value,
  new Packet(toBits("CE00C43D881120")).value,
  new Packet(toBits("D8005AC2A8F0")).value,
  new Packet(toBits("F600BC2D8F")).value,
  new Packet(toBits("9C005AC2F8F0")).value,
  new Packet(toBits("9C0141080250320F1802104A08")).value,
)

console.log(new Packet(toBits(realInput)).value);

