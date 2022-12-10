import { FileReader } from "../common";

class Solve10 extends FileReader {
  constructor() {
    super();
    this.readData("src/10/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[]) => {
    let pc = 0
    let cycles = 0;
    let X = 1
    let hold = false
    let param: number | undefined = undefined
    let result = 0

    while (hold || pc < data.length) {
        cycles+=1
        if ((cycles - 20) % 40 === 0) {
          result += cycles * X
        }
  
        if (hold) {
            if (param !== undefined) {
                X += param
            }
            hold = false
        } else {
            const row = data[pc++]
            const tmp = row.split(' ')
            const op = tmp[0]
            if ("addx" === op) {
                param = parseInt(tmp[1], 10)
                hold = true
            }
        }
    }
    console.log(result)  
  };
}

new Solve10();