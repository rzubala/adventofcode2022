import { FileReader } from "../common";

class Solve02 extends FileReader {
  constructor() {
    super();
    this.readData("src/02/input.data")
      .then((data) => {
        this.process(data.split("\n"));
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

  process = (data: string[]) => {
    let sum = 0
    data.forEach(row => {
      const data: string[] = row.split(' ')
      const v1: string = data[0]
      const v2: string = data[1]
      const points = (this.scoreMap.get(`${v1}${v2}`) || 0) + (this.pointsMap.get(`${v2}`) || 0)
      sum += points
      console.log(v1, v2, points)
    })
    console.log(sum)
  };
}

new Solve02();
