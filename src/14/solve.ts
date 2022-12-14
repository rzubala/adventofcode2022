import { FileReader } from "../common";

class Point {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

class Solve14 extends FileReader {
  constructor() {
    super();
    this.readData("src/14/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  rocks: Map<string, boolean> = new Map()
  blocksByX: Map<number, number[]> = new Map()

  addToMap = (map: Map<number, number[]>, index: number, value: number) => {
    const arr = map.get(index) || []
    if (!arr.includes(value)) {
      arr.push(value)
    }
    arr.sort((a: number, b: number) => a - b)
    map.set(index, arr)
  }
  
  key = (x: number, y: number) => `${x}_${y}`

  addPoints = (x1: number, y1: number, x2: number, y2: number) => {
    if (x1 === x2) {
      const diff = Math.abs(y2 - y1) + 1
      const it = Math.sign(y2 - y1)
      let i = y1
      let cnt = 0
      while(cnt < diff) {
        this.rocks.set(this.key(x1, i), true)
        this.addToMap(this.blocksByX, x1, i)
        i += it
        cnt += 1
      }
    } else if (y1 === y2) {
      const diff = Math.abs(x2 - x1) + 1
      const it = Math.sign(x2 - x1)
      let i = x1
      let cnt = 0
      while(cnt < diff) {
        this.rocks.set(this.key(i, y1), true)
        this.addToMap(this.blocksByX, i, y1)
        i += it
        cnt += 1
      }
    } else {
      throw 'something went wrong'
    }
  }

  blockedNext = (point: Point, left: boolean) => this.blocksByX.get(point.x + (left ? -1 : 1))?.includes(point.y + 1)

  print = () => {
    // for (let y=0;y<=9;y++) {
    for (let y=150;y<=170;y++) {
      let line = ""
      // for (let x=494;x<=503;x++) {
      for (let x=500;x<=550;x++) {
        const r = this.rocks.get(this.key(x,y))
        if (r !== undefined) {
          line += "#"
          continue
        }
        const s = this.blocksByX.get(x)?.includes(y)
        if (s) {
          line += "o"
          continue
        }
        line += "."
      }
      console.log(line)
    }
  }

  process = (data: string[]) => {
    data.forEach(row => {
      const segments = row.split(' -> ')
      let last = segments[0].split(',')
      segments.slice(1).forEach(pair => {
        const point = pair.split(',')
        this.addPoints(+last[0], +last[1], +point[0], +point[1])
        last = point
      })
    })
    let it = 0
    let done = false
    while (true) {
      let sand = new Point(500, 0)      

      while (true) {
        const newYarr = this.blocksByX.get(sand.x)?.filter(y => y >= sand.y)
        if (newYarr === undefined || newYarr.length === 0) {
          done = true
          break
        }
        newYarr.sort((a: number, b: number) => a - b)
        const newY = newYarr[0]
        sand = new Point(sand.x, newY - 1)

        if (!this.blockedNext(sand, true)) {
          sand = new Point(sand.x - 1, sand.y + 1)
        } else if (!this.blockedNext(sand, false)) {
          sand = new Point(sand.x + 1, sand.y + 1)
        } else {
          this.addToMap(this.blocksByX, sand.x, sand.y)
          break
        }
      }
      if (done) {
        console.log(it)
        break;
      }
      it += 1
    }
  };
}

new Solve14();