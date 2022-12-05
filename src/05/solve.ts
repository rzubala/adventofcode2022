import { isLetter } from "../utils";
import { FileReader } from "../common";

class Solve05 extends FileReader {
    constructor() {
      super();
      this.readData("src/05/test.data")
        .then((data) => {
          this.process1(data.split("\n"));
        })
        .catch((err) => console.log(err));
    }

    addToStack = (stacks: Map<number, string[]>, index: number, value: string) => {
      if (!isLetter(value)) {
        return
      }
      let stack = stacks.get(index)
      if (stack === undefined) {
        stack = []
      }
      stack.unshift(value)
      stacks.set(index, stack);
    }

    process1 = (data: string[]) => {
      let stacksFinished = false
      const stacks = new Map<number, string[]>()

      for (const row of data) {        
        const data = row.split('')
        if(data.length === 0) {
          continue
        }
        if (Number.isInteger(parseInt(data[1], 10))) {
          stacksFinished = true
          continue;
        }
        if (!stacksFinished) {
          let it = 1;
          let stack = 1;
          while (it < data.length) {
            this.addToStack(stacks, stack++, data[it])
            it += 4
          }
          continue;
        }
      }
      console.log(stacks)
    };    
}
    
new Solve05();
    