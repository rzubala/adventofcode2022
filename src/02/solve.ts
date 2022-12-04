import { FileReader } from "../common";

class Solve02 extends FileReader {
  constructor() {
    super();
    this.readData("src/02/input.data")
      .then((data) => {
        this.process(data.split("\n"), this.calculatePoints1);
        this.process(data.split("\n"), this.calculatePoints2);
      })
      .catch((err) => console.log(err));
  }

  scoreMap = new Map<String, number>([
    ["AX", 3],
    ["AY", 6],
    ["AZ", 0],
    ["BX", 0],
    ["BY", 3],
    ["BZ", 6],
    ["CX", 6],
    ["CY", 0],
    ["CZ", 3],
  ])

  pointsMap = new Map<String, number>([
    ["X", 1],
    ["Y", 2],
    ["Z", 3]
  ])

   myMoveMap = new Map<string, string>([
    ["AX", "Z"],
    ["AY", "X"],
    ["AZ", "Y"],
    ["BX", "X"],
    ["BY", "Y"],
    ["BZ", "Z"],
    ["CX", "Y"],
    ["CY", "Z"],
    ["CZ", "X"],
  ])

  getPoints = (v1: string, v2: string) => {
    return (this.scoreMap.get(`${v1}${v2}`) || 0) + (this.pointsMap.get(`${v2}`) || 0);
  }

  calculatePoints1 = (v1: string, v2: string) => this.getPoints(v1, v2)

  calculatePoints2 = (v1: string, r: string) => {
    const v2: string = this.myMoveMap.get(`${v1}${r}`) || ""
    return this.getPoints(v1, v2)
  }

  process = (data: string[], calc: (v1: string, v2: string) => number) => {
    let sum = 0
    data.forEach(row => {
      const data: string[] = row.split(' ')
      const v1: string = data[0]
      const v2: string = data[1]
      sum += calc(v1, v2)
    })
    console.log(sum)
  };
}

new Solve02();
