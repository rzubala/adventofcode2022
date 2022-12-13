import { FileReader } from "../common";

class Packet {
  level: number
  data: (Packet | number)[] = []
  parent: Packet | undefined = undefined
  constructor(level: number) {
    this.level = level
  }
}
class Pair {
  part1: Packet | undefined = undefined
  part2: Packet | undefined = undefined
}
const parse = (input: string): Packet => {
  let level = 0
  let packet: Packet = new Packet(level)
  input.split(',').forEach(input => {
    const array = input.split('')
    const len = array.length
    let it = 0
    let numberStr = ""
    while (it < len) {
      const x = array[it]
      if (x === '[') {
        level += 1
        const newPacket = new Packet(level)
        newPacket.parent = packet
        packet.data.push(newPacket)
        packet = newPacket
      } else if (x === ']') {
        if (packet.parent === undefined) {
          throw "Something went worng"
        }
        const numberV = parseInt(numberStr)
        if (Number.isInteger(numberV)) {
          packet.data.push(numberV)
          numberStr = "empty"
        }
        packet = packet.parent
        level -= 1
      } else {
        numberStr += x
      }
      it += 1
    }
    const numberV = parseInt(numberStr)
    if (Number.isInteger(numberV)) {
      packet.data.push(numberV)
    }
  })
  return packet
}

const compare = (packet1: Packet | undefined, packet2: Packet | undefined, iterator1: number = 0, iterator2: number = 0, single: boolean = false): boolean | undefined => {
  const data1 = packet1?.data
  const data2 = packet2?.data
  if (data1 === undefined) {
    return true
  } if (data2 === undefined) {
    return false
  }
  const len1 = data1.length
  const len2 = single ? 1 : data2.length
  let it1 = iterator1
  let it2 = iterator2
  let result: boolean | undefined = undefined;
  while (true) {
    if (it1 === len1 && it2 === len2) {
      return result
    }
    if (it1 === len1 && it2 < len2) {
      return result === undefined ? true : false
    }
    if (it1 < len1 && it2 === len2) {
      return false
    }
    const tmp1 = data1[it1]
    const tmp2 = data2[it2]
    if (tmp1 instanceof Packet && tmp2 instanceof Packet) {
      result = compare(tmp1, tmp2)
    } else if (tmp1 instanceof Packet && !(tmp2 instanceof Packet)) {
      result = compare(tmp1, packet2, 0, it2, true)
    } else if (!(tmp1 instanceof Packet) && tmp2 instanceof Packet) {
      result = compare(packet1, tmp2, it1, 0, false)
    } else if (typeof tmp1 === 'number' && typeof tmp2 === 'number') {
      if (tmp1 < tmp2) {
        return true
      } else if (tmp1 > tmp2) {
        return false
      }
    }
    if (result !== undefined) {
      return result
    }
    it1 += 1
    it2 += 1
  }
}

class Solve13 extends FileReader {
  constructor() {
    super();
    this.readData("src/13/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[]) => {
    const pairs: Pair[] = []
    let pair: Pair | undefined = undefined
    for (const rowIndex in data) {
      if (+rowIndex % 3 === 0) {
        pair = new Pair()
        pairs.push(pair)
        pair.part1 = parse(data[rowIndex])
      } else if (+rowIndex % 3 === 1) {
        pair!.part2 = parse(data[rowIndex])
      }
    }

    let result = 0
    pairs.forEach((p: Pair, index: number) => {
      if (compare(p.part1, p.part2)) {
        result += index + 1
      }
    })
    console.log(result)
    this.process2(pairs)
  };

  process2 = (pairs: Pair[]) => {
    const list: Packet[] = []
    pairs.forEach(p => {
      list.push(p.part1!)
      list.push(p.part2!)
    })
    const packet2 = parse('[[2]]') 
    const packet6 = parse('[[6]]') 
    list.push(packet2)
    list.push(packet6)

    list.sort((a: Packet, b: Packet) => {
      const cmp = compare(a, b)
      return cmp ? -1 : 1
    })

    const pos2 = list.indexOf(packet2) + 1;
    const pos6 = list.indexOf(packet6) + 1;
  
    console.log(pos2 * pos6);
  }
}

new Solve13();