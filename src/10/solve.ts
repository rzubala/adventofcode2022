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
  screenW = 40
  screenH = 6
  screen: Array<Array<string>> = new Array(this.screenH)
  printScreen = () => {
    for (let i=0;i<this.screenH;i++) {
      console.log(this.screen[i].join(''))
    }
  }

  process = (data: string[]) => {
    let pc = 0
    let cycles = 0;
    let X = 1
    let hold = false
    let param: number | undefined = undefined
    let result = 0
    
    for (let i=0;i<this.screenH;i++) {
      this.screen[i] = new Array(this.screenW).fill('.')
    }
    
    while (hold || pc < data.length) {
      let crtPos = cycles % 40 + 1
      let crtRow = Math.floor(cycles / 40)
      cycles+=1
      if ((cycles - 20) % 40 === 0) {
        result += cycles * X
      }      
      if (crtPos >= X && crtPos < X + 3) {
        this.screen[crtRow][crtPos - 1] = "#"
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
        this.printScreen()
      };
}

new Solve10();