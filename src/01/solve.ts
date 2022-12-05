import { FileReader } from "../common";

class Solve01 extends FileReader {
  constructor() {
    super();
    this.readData("src/01/input.data")
      .then((data) => {
        this.process(data.split("\n"), 1);
        this.process(data.split("\n"), 3);
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[], size: number) => {
    let maxValues = Array<number>(size).fill(0)
    let acc = 0
    data.forEach((row: string, index: number) => {
      const num = parseInt(row, 10)
      if (!Number.isNaN(num)) {
        acc += num
      }
      if (index === data.length-1 || Number.isNaN(num)) {
        for (const maxIndex in maxValues) {          
          const maxV = maxValues[maxIndex]
          if (acc > maxV) {
            maxValues[maxIndex] = acc
            maxValues.sort((a,b) => a - b)
            break;
          }
        }
        acc = 0
      }
    })
    console.log(maxValues.reduce((sum, cur) => {
      sum += cur;
      return sum
    }))
  };
}

new Solve01();
