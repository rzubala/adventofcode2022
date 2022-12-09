import { FileReader } from "../common";

type Dir = "R" | "L" | "U" | "D"

class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Head extends Point {
    move = (dir: Dir, steps: number) => {
        switch(dir) {
            case "R":
                this.x += steps
                break
            case "U":
                this.y -= steps
                break
            case "L":
                this.x -= steps
                break
            case "D":
                this.y += steps
                break
            default:
                throw "something went wrong"
        }
    }

    print = () => {
        console.log("H:", this.x, this.y)
    }
}
class Tail extends Point {
    history: string[] = []
    head: Head
    constructor(x: number, y: number, head: Head) {
        super(x, y)
        this.head = head
        this.addToHistory(this.x, this.y)
    }

    addToHistory = (x: number, y: number) => {
        const key = x + "_" + y
        if (this.history.includes(key)) {
            return
        }
        this.history.push(key)
    }

    addToHistoryRange = (a1: number, a2: number, b: number, xrange: boolean) => {
        const diff = a2 - a1
        const step = Math.sign(diff)
        let i = a1
        const len = Math.abs(a2 - a1)
        let it = 0
        while(it<=len) {
            if (xrange) {
                this.addToHistory(i, b)
            } else {
                this.addToHistory(b, i)
            }
            i += step;
            it++
        }
    }

    moveToHead = () => {
        let x = this.x
        let y = this.y

        while (true) {
            const diffY = this.head.y - y
            const diffX = this.head.x - x

            if (Math.abs(diffX) === 1 && diffY === 0 
                || Math.abs(diffY) === 1 && diffX === 0
                || diffX === 0 && diffY === 0
                || Math.abs(diffX) === 1 && Math.abs(diffY) === 1) {
                break
            }
            if (diffY === 0) {
                const tmp = x
                x += diffX - Math.sign(diffX)
                this.addToHistoryRange(tmp, x, y, true)
            } else if (diffX === 0) {
                const tmp = y
                y += diffY - Math.sign(diffY)
                this.addToHistoryRange(tmp, y, x, false)
            } else {
                x += Math.sign(diffX)
                y += Math.sign(diffY)
                this.addToHistory(x, y)
            }
        }
        this.x = x
        this.y = y
    }

    print = () => {
        console.log("T:", this.x, this.y)
    }
}

class Solve09 extends FileReader {
  constructor() {
    super();
    this.readData("src/09/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[]) => {
    const head = new Head(0, 0)
    const tail = new Tail(0, 0, head)
    data.forEach(row => {
        const data = row.split(' ');
        head.move(data[0] as Dir, parseInt(data[1], 10))
        tail.moveToHead()
    })
    console.log(tail.history.length)
  };
}

new Solve09();