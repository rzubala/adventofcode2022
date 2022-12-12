import { FileReader } from "../common";

class Point {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  tryAdd = (points: Point[], x: number, y: number, min: number, maxX: number, maxY: number) => {
    if (x >= min && x <= maxX && y >= min && y <= maxY) {
      points.push(new Point(x,y))
    }
  }

  neighbours = (min: number, maxX: number, maxY: number): Point[] => {
    const result: Point[] = []
    this.tryAdd(result, this.x-1, this.y, min, maxX, maxY)
    this.tryAdd(result, this.x+1, this.y, min, maxX, maxY)
    this.tryAdd(result, this.x, this.y-1, min, maxX, maxY)
    this.tryAdd(result, this.x, this.y+1, min, maxX, maxY)
    return result;
  }
}

const eValue = (input: string) => input.charCodeAt(0) - "a".charCodeAt(0)

class Solve12 extends FileReader {
  constructor() {
    super();
    this.readData("src/12/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  map: Array<Array<number>> = new Array()
  pathLength: Array<Array<number>> = new Array()
  maxXIndex = 0
  maxYIndex = 0
  minIndex = 0

  print = (matrix: Array<Array<number>>) => {
    for (const row of matrix) {
      console.log(row)
    }
  }

  process = (data: string[]) => {
    let start: Point | undefined = undefined
    let stop: Point | undefined = undefined

    this.map = new Array()
    this.pathLength = new Array()
    this.maxYIndex = data.length - 1
    this.minIndex = 0

    for (const rowIndex in data) {
      this.map.push(new Array(this.maxYIndex + 1))
      this.pathLength.push(new Array(this.maxXIndex + 1).fill(-1))
      const row = data[rowIndex]
      const values = row.split('')
      for (const valueIndex in values) {
        this.maxXIndex = values.length - 1
        const valueStr = values[valueIndex]
        let value = eValue(valueStr)
        if (valueStr === 'S') {
          value = eValue("a")
          start = new Point(+valueIndex, +rowIndex)
        } else if (valueStr === 'E') {
          value = eValue("z")
          stop = new Point(+valueIndex, +rowIndex)
        }
        this.map[rowIndex][valueIndex] = value
      }  
    }

    //console.log(start, stop)
    this.findPath(start!, stop!)

    // console.log(this.map)
    // console.log(this.pathLength)
    console.log(this.pathLength[stop!.y][stop!.x])
    //this.print(this.pathLength)
  };

  findPath = (start: Point, stop: Point) => {
    let nextPoints: Point[] = []
    nextPoints.push(start)
    this.pathLength[start.y][start.x] = 0
    while (nextPoints.length > 0) {
      let nextPoint = nextPoints.shift()
      if (nextPoint === undefined) {
        console.log('Something went wrong')
        break
      }
      if (nextPoint.x === stop.x && nextPoint.y === stop.y) {
        continue
      }
      const n = nextPoint.neighbours(this.minIndex, this.maxXIndex, this.maxYIndex)
      let height = this.map[nextPoint.y][nextPoint.x]
      let length = this.pathLength[nextPoint.y][nextPoint.x]
      if (length < 0) {
        length = 0
      }
      //console.log(nextPoint.y, nextPoint.x, length, height)
      for (const np of n) {
        const nextHeight = this.map[np.y][np.x]
        const nextLength = this.pathLength[np.y][np.x]
        //console.log('\t', np.y, np.x, nextLength, nextHeight)
        if (nextHeight > height + 1) {
          continue;
        }
        if (nextLength >=0) {
          continue
        }
        //console.log('\t\t', 'added')
        nextPoints.push(np)
        this.pathLength[np.y][np.x] = length + 1
      }
    }
  }
}

new Solve12();